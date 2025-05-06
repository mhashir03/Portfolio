import { NextResponse } from 'next/server';

// This route handles the OAuth callback from Spotify
// In a production app, you would store the refresh token securely
// For this demo, we'll just display the token for manual configuration

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spotify Authentication Success</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #0d1117;
            color: #e6edf3;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            line-height: 1.6;
          }
          .container {
            background-color: #161b22;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 20px;
            margin-top: 20px;
          }
          h1 {
            color: #58a6ff;
          }
          code {
            background-color: #0d1117;
            color: #e6edf3;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
          }
          .auth-code {
            background-color: #0d1117;
            color: #e6edf3;
            padding: 10px;
            border-radius: 6px;
            font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
            overflow-wrap: break-word;
            margin: 10px 0;
          }
          .success {
            color: #3fb950;
          }
          ol {
            margin-top: 20px;
          }
          li {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Spotify Authentication Successful!</h1>
        <div class="container">
          <p><span class="success">✓</span> Authorization code received successfully.</p>
          
          <p>Your authorization code is:</p>
          <div class="auth-code">${code}</div>
          
          <p>Follow these steps to get your refresh token:</p>
          <ol>
            <li>
              Use this code with the curl command:
              <pre><code>curl -H "Authorization: Basic BASE64_ENCODED_CLIENT_ID_AND_SECRET" -d grant_type=authorization_code -d code=${code} -d redirect_uri=http://127.0.0.1:3000/api/spotify/callback https://accounts.spotify.com/api/token</code></pre>
              <p>To encode CLIENT_ID:CLIENT_SECRET in Base64:</p>
              <pre><code>echo -n "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" | base64</code></pre>
              <p>Or use an <a href="https://www.base64encode.org/" target="_blank" style="color: #58a6ff;">online Base64 encoder</a></p>
            </li>
            <li>The response will contain your refresh token.</li>
            <li>Add this refresh token to your <code>.env.local</code> file.</li>
          </ol>
          
          <p>Note: This authorization code is only valid for a short time, so use it right away.</p>
        </div>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 