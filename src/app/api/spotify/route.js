import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const getAccessToken = async () => {
  console.log('Getting access token with CLIENT_ID:', CLIENT_ID?.substring(0, 5) + '...');
  console.log('REFRESH_TOKEN available:', !!REFRESH_TOKEN);
  
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
    console.log('Successfully obtained access token');
    return data;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};

const getNowPlaying = async (accessToken) => {
  console.log('Fetching currently playing track...');
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export async function GET() {
  try {
    console.log('Spotify API route called');
    const { access_token } = await getAccessToken();
    const response = await getNowPlaying(access_token);

    console.log('Spotify API response status:', response.status);
    
    if (response.status === 204) {
      console.log('No content returned - user is not playing anything');
      return NextResponse.json({ isPlaying: false });
    }
    
    if (response.status >= 400) {
      console.error('Error response from Spotify API:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return NextResponse.json({ isPlaying: false, error: `API error: ${response.status}` });
    }

    const song = await response.json();
    console.log('Song data received:', song.is_playing ? `${song.item?.name} by ${song.item?.artists[0]?.name}` : 'Not playing');
    
    if (!song.is_playing) {
      return NextResponse.json({ isPlaying: false });
    }

    const albumImageUrl = song.item.album.images[0]?.url;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;

    return NextResponse.json({
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false, error: 'Failed to fetch Spotify data: ' + error.message });
  }
} 