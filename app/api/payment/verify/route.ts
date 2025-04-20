import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminAuth } from '../../../lib/firebase-admin';
import { adminDb } from '../../../lib/firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    // Get the authorization token
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required - No valid authorization token'
      }, { status: 401 });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token and get the user
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userRecord = await adminAuth.getUser(decodedToken.uid);
    
    if (!userRecord) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { paymentIntentId, interviewCount } = body;

    if (!paymentIntentId || !interviewCount) {
      return NextResponse.json({
        success: false,
        message: 'Missing required parameters'
      }, { status: 400 });
    }

    // Retrieve the payment intent from Stripe to verify it's real and completed
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Verify payment was successful
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({
        success: false,
        message: 'Payment has not been completed'
      }, { status: 400 });
    }

    // Verify this payment was actually for this user
    if (paymentIntent.metadata.userId !== userRecord.uid) {
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed - User mismatch'
      }, { status: 403 });
    }

    // Add interview credits to the user's account using Admin Firestore
    try {
      // Get user document from Firestore
      const userQuerySnapshot = await adminDb
        .collection('userEmails')
        .where('uid', '==', userRecord.uid)
        .get();
      
      if (userQuerySnapshot.empty) {
        return NextResponse.json({
          success: false,
          message: 'User document not found in database'
        }, { status: 404 });
      }
      
      // Update the user's interview credits
      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();
      const currentCredits = userData.interviewsRemaining || 0;
      
      await adminDb
        .collection('userEmails')
        .doc(userDoc.id)
        .update({
          interviewsRemaining: currentCredits + interviewCount
        });
      
      // Log successful payment for audit purposes
      console.log(`Payment successful - Added ${interviewCount} interviews for user: ${userRecord.uid}`);

      return NextResponse.json({
        success: true,
        message: 'Payment verified and credits added'
      });
    } catch (error) {
      console.error('Error updating user interview credits:', error);
      return NextResponse.json({
        success: false,
        message: 'Failed to add interview credits'
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error verifying payment'
    }, { status: 500 });
  }
} 