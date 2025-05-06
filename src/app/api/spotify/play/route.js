import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAY_ENDPOINT = 'https://api.spotify.com/v1/me/player/play';

const getAccessToken = async () => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
};

export async function POST(request) {
  try {
    const { device_id, track_uri } = await request.json();
    
    if (!device_id || !track_uri) {
      return NextResponse.json(
        { error: 'Missing required parameters' }, 
        { status: 400 }
      );
    }
    
    const { access_token } = await getAccessToken();
    
    const response = await fetch(`${PLAY_ENDPOINT}?device_id=${device_id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [track_uri],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify play error:', errorText);
      return NextResponse.json(
        { error: 'Failed to play track', details: errorText }, 
        { status: response.status }
      );
    }
    
    // Spotify returns 204 No Content on success
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error playing track:', error);
    return NextResponse.json(
      { error: 'Failed to play track' }, 
      { status: 500 }
    );
  }
} 