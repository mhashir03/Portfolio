import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

const getAccessToken = async () => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  try {
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
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting access token:', response.status, errorText);
      throw new Error(`Failed to get access token: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};

const getTopTracks = async (accessToken) => {
  return fetch(`${TOP_TRACKS_ENDPOINT}?limit=3&time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export async function GET() {
  try {
    console.log('Spotify top-tracks API route called');
    const { access_token } = await getAccessToken();
    const response = await getTopTracks(access_token);

    if (!response.ok) {
      console.error('Error response from Spotify API:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return NextResponse.json({ 
        success: false, 
        error: `API error: ${response.status}` 
      });
    }

    const data = await response.json();
    
    // Format the response to include only the necessary data
    const topTracks = data.items.map(item => ({
      title: item.name,
      artist: item.artists.map(artist => artist.name).join(', '),
      albumImageUrl: item.album.images[0]?.url,
      songUrl: item.external_urls.spotify,
    }));

    return NextResponse.json({
      success: true,
      topTracks
    });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch top tracks: ' + error.message 
    });
  }
}

