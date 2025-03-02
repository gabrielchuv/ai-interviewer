import EphemeralSessionExample from '../components/EphemeralSessionExample';

export default function EphemeralSessionPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Ephemeral OpenAI API Key Demo</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        This page demonstrates how to use ephemeral OpenAI API keys. 
        The server creates a temporary API key that can be used client-side 
        and automatically refreshes before expiration.
      </p>
      
      <EphemeralSessionExample />
      
      <div className="mt-8 max-w-2xl mx-auto p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">How it works:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>The server makes a request to OpenAI's <code className="bg-gray-200 px-1 rounded">/v1/realtime/sessions</code> endpoint using your server-side API key</li>
          <li>OpenAI returns a temporary API key that expires after a set time (usually 1 hour)</li>
          <li>The client-side code can use this temporary key to make direct API calls to OpenAI</li>
          <li>The React hook automatically refreshes the key before it expires</li>
        </ol>
        
        <h2 className="text-xl font-bold mt-6 mb-2">Benefits:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Improved performance by making direct API calls from the client</li>
          <li>Reduced server load by offloading API calls to the client</li>
          <li>Better user experience with faster response times</li>
          <li>Secure - your main API key remains protected on the server</li>
        </ul>
      </div>
    </div>
  );
} 