import { NextResponse } from 'next/server';

// This route handles the OAuth callback from Spotify
// It automatically exchanges the authorization code for a refresh token

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authentication Error</title>
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
            h1 { color: #f85149; }
            .error { color: #f85149; }
            a { color: #58a6ff; }
          </style>
        </head>
        <body>
          <h1>Authentication Error</h1>
          <div class="container">
            <p class="error">Error: ${error}</p>
            <p><a href="/api/spotify/auth">Try again</a></p>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Automatically exchange the code for a refresh token if CLIENT_ID and CLIENT_SECRET are available
  if (CLIENT_ID && CLIENT_SECRET) {
    try {
      const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
      
      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange code for token');
      }

      // Success! Display the refresh token
      const refreshToken = tokenData.refresh_token;

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
              .refresh-token {
                background-color: #0d1117;
                color: #e6edf3;
                padding: 15px;
                border-radius: 6px;
                font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
                overflow-wrap: break-word;
                margin: 15px 0;
                border: 1px solid #30363d;
                word-break: break-all;
              }
              .success {
                color: #3fb950;
              }
              .warning {
                color: #d29922;
                background-color: #1c2128;
                padding: 10px;
                border-radius: 6px;
                margin: 15px 0;
              }
              .button {
                display: inline-block;
                background-color: #1DB954;
                color: white;
                padding: 10px 20px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 20px;
              }
              .button:hover {
                background-color: #1ed760;
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
              <p><span class="success">✓</span> Successfully obtained refresh token!</p>
              
              <p>Your refresh token is:</p>
              <div class="refresh-token">${refreshToken}</div>
              
              <div class="warning">
                <strong>⚠️ Important:</strong> Copy this refresh token and add it to your <code>.env.local</code> file:
                <pre style="margin-top: 10px;"><code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code></pre>
              </div>
              
              <p>Steps to complete setup:</p>
              <ol>
                <li>Open your <code>.env.local</code> file in the project root</li>
                <li>Add or update this line:</li>
                <li><code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code></li>
                <li>Make sure you also have <code>SPOTIFY_CLIENT_ID</code> and <code>SPOTIFY_CLIENT_SECRET</code> set</li>
                <li>Restart your development server</li>
              </ol>
              
              <p><a href="/api/spotify/test" class="button">Test Connection</a></p>
            </div>
          </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    } catch (error) {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Spotify Authentication Error</title>
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
              h1 { color: #f85149; }
              .error { color: #f85149; }
              code {
                background-color: #0d1117;
                color: #e6edf3;
                padding: 2px 5px;
                border-radius: 3px;
                font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
              }
              a { color: #58a6ff; }
            </style>
          </head>
          <body>
            <h1>Error Exchanging Code</h1>
            <div class="container">
              <p class="error">Error: ${error.message}</p>
              <p>Make sure <code>SPOTIFY_CLIENT_ID</code> and <code>SPOTIFY_CLIENT_SECRET</code> are set in your <code>.env.local</code> file.</p>
              <p><a href="/api/spotify/auth">Try again</a></p>
            </div>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }
  }

  // Fallback: if env vars aren't set, show manual instructions
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
              <pre><code>curl -H "Authorization: Basic BASE64_ENCODED_CLIENT_ID_AND_SECRET" -d grant_type=authorization_code -d code=${code} -d redirect_uri=${REDIRECT_URI} https://accounts.spotify.com/api/token</code></pre>
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