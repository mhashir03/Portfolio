import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';

// This is a diagnostic API route to test Spotify connectivity
export async function GET() {
  try {
    // Check if we have all required environment variables
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json({
        error: 'Missing environment variables',
        details: {
          CLIENT_ID: !!CLIENT_ID,
          CLIENT_SECRET: !!CLIENT_SECRET,
          REFRESH_TOKEN: !!REFRESH_TOKEN,
          REFRESH_TOKEN_LENGTH: REFRESH_TOKEN ? REFRESH_TOKEN.length : 0
        }
      }, { status: 500 });
    }
    
    // Try to get an access token
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
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
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      return NextResponse.json({
        error: 'Failed to get access token',
        details: tokenData,
        status: tokenResponse.status
      }, { status: 400 });
    }
    
    // If we got an access token, try to get the user profile
    const profileResponse = await fetch(USER_PROFILE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    
    const profileData = await profileResponse.json();
    
    if (!profileResponse.ok) {
      return NextResponse.json({
        error: 'Failed to get user profile',
        details: profileData,
        status: profileResponse.status,
        access_token_works: false
      }, { status: 400 });
    }
    
    // Success!
    return NextResponse.json({
      success: true,
      access_token_works: true,
      user_profile: {
        id: profileData.id,
        display_name: profileData.display_name,
        product: profileData.product, // Check if the user has Spotify Premium
        scopes: tokenData.scope ? tokenData.scope.split(' ') : []
      }
    });
    
  } catch (error) {
    console.error('Error in Spotify test route:', error);
    return NextResponse.json({
      error: 'Exception occurred',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
} 