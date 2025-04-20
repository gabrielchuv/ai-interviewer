import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminAuth } from '../../../lib/firebase-admin';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    // Get the authorization token
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'Authentication required - No valid authorization token' 
      }, { status: 401 });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token and get the user
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userRecord = await adminAuth.getUser(decodedToken.uid);
    
    if (!userRecord) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { interviewCount, price } = body;
    
    // Validate the input
    if (!interviewCount || !price) {
      return NextResponse.json({ 
        error: 'Missing required parameters: interviewCount and price' 
      }, { status: 400 });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Convert to cents
      currency: 'gbp',
      metadata: {
        userId: userRecord.uid,
        interviewCount: interviewCount.toString(),
        userEmail: userRecord.email || ''
      },
      // Store the customer email for future reference
      receipt_email: userRecord.email || undefined,
    });

    // Return the client secret to the client
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ 
      error: error.message || 'Error creating payment intent' 
    }, { status: 500 });
  }
} 