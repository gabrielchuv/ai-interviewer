# Firebase Service Account Setup

This document provides instructions for setting up Firebase Admin SDK for server-side authentication and Firestore operations in your application.

## Local Development Setup

For local development, you'll need to create a service account key file:

1. Go to your Firebase project console: https://console.firebase.google.com/
2. Click on the gear icon (⚙️) and select "Project settings"
3. Go to the "Service accounts" tab
4. Click "Generate new private key" button
5. Save the downloaded JSON file as `service-account.json` in the root of your project
6. Make sure to add `service-account.json` to your `.gitignore` file to avoid committing sensitive credentials

Example `service-account.json` structure:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxx%40your-project-id.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

## Production Setup

For production deployment (e.g., Vercel), you should use environment variables instead:

1. From the same service account you generated above, extract these three values:
   - `project_id`
   - `client_email`
   - `private_key`

2. Add them to your environment variables in your hosting platform:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

3. Make sure to include the quotes around the private key and preserve the `\n` characters

## Security Considerations

- Never commit the service account JSON file to version control
- Restrict the service account permissions to only what's needed
- Regularly rotate the service account keys for enhanced security 