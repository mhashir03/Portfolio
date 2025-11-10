import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback';

// Include all the necessary scopes, especially user-read-recently-played
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-top-read'
];

export async function GET() {
  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scopes.join(' '),
    show_dialog: true
  });

  const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spotify Authorization</title>
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
          ul {
            margin-top: 20px;
            padding-left: 20px;
          }
          li {
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <h1>Spotify Authorization</h1>
        <div class="container">
          <p>This page will help you authorize your application with the following Spotify permissions:</p>
          <ul>
            <li>Read your currently playing track</li>
            <li>Read your playback state</li>
            <li>Control your playback</li>
            <li>Read your recently played tracks</li>
            <li>Read your top tracks</li>
          </ul>
          <p>Click the button below to authorize with Spotify:</p>
          <a href="${authUrl}" class="button">Authorize with Spotify</a>
        </div>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 