# Spotify Integration for Portfolio Website

This guide explains how to set up the Spotify integration to display your currently playing track on your portfolio website and allow visitors to play the tracks directly on your site.

## Setting Up Spotify API

1. **Create a Spotify Developer App:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
   - Log in with your Spotify account
   - Click "Create An App"
   - Fill in the app name (e.g., "Portfolio Website") and description
   - When asked about APIs, select **both** "Web API" and "Web Playback SDK"
   - Set the redirect URIs:
     - For local development: `http://127.0.0.1:3000/api/spotify/callback` (Spotify no longer accepts "localhost")
     - For production: `https://your-domain.com/api/spotify/callback` (replace with your actual domain)
   - Click "Save"

2. **Get Your Client ID and Client Secret:**
   - After creating the app, you'll be able to see your Client ID
   - Click "Show Client Secret" to reveal your Client Secret
   - Save both of these values for later

3. **Get Your Refresh Token:**
   - To get a refresh token, you'll need to authorize your app with the following permissions:
     - `user-read-currently-playing`
     - `user-read-playback-state`
     - `streaming` (required for Web Playback SDK)
     - `user-modify-playback-state` (required to play tracks)
   
   You can obtain a refresh token through these steps:

   a. Create an authorization URL (use the HTTPS version for production):
   ```
   # For local development
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:3000/api/spotify/callback&scope=user-read-currently-playing%20user-read-playback-state%20streaming%20user-modify-playback-state
   
   # For production
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://your-domain.com/api/spotify/callback&scope=user-read-currently-playing%20user-read-playback-state%20streaming%20user-modify-playback-state
   ```
   
   b. Navigate to this URL in your browser, approve the app, and you'll be redirected to your callback URI with a code parameter
   
   c. Use this code to get your refresh token:
   ```bash
   # Create a Base64 encoded string of your client_id:client_secret
   echo -n "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" | base64
   
   # Then use it in this curl command (replace with your values and the code from step b)
   curl -H "Authorization: Basic BASE64_ENCODED_STRING" -d grant_type=authorization_code -d code=CODE_FROM_PREVIOUS_STEP -d redirect_uri=http://127.0.0.1:3000/api/spotify/callback https://accounts.spotify.com/api/token
   ```
   
   d. The response will include a refresh token

4. **Update Environment Variables:**
   - Open your `.env.local` file
   - Replace the placeholder values with your actual credentials:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   ```

5. **Restart Your Development Server:**
   - After updating your environment variables, restart your Next.js development server

## Spotify's URI Requirements

Spotify has specific requirements for redirect URIs:

- For local development: Use `http://127.0.0.1:PORT` instead of "localhost" (Spotify specifically prohibits "localhost")
- For production: Always use HTTPS for non-loopback URLs
- Make sure the URI in your authorization requests exactly matches what you registered in the Spotify Dashboard

## How It Works

The integration uses both the Spotify Web API and Web Playback SDK:

### Web API
1. Your app uses the refresh token to get a new access token (these expire quickly)
2. The access token is used to fetch your currently playing track
3. The data is displayed in the About Me section of your portfolio
4. The component refreshes the data every minute

### Web Playback SDK
1. When a visitor clicks "Play here", the Spotify Web Playback SDK loads
2. It creates a new Spotify player device in your browser
3. The current track is played directly on your website
4. Users can play/pause without leaving your site

## Requirements for Web Playback SDK

For the embedded player to work:
- The user must have a Spotify Premium account (Spotify requirement for the Web Playback SDK)
- The user must be logged in to Spotify 
- The website must be served over HTTPS (except for loopback addresses like 127.0.0.1)
- The website owner (you) must have granted the additional scopes (`streaming` and `user-modify-playback-state`)

## Troubleshooting

- If you're not seeing your currently playing track, make sure:
  - You're actually playing music on Spotify
  - Your credentials are correct
  - Your environment variables are properly loaded
  - Your browser has JavaScript enabled

- If you see "Not currently listening to anything" but you are playing music, try:
  - Making sure your Spotify account is active (playing music)
  - Refreshing the page
  - Checking the browser console for errors
  
- If the "Play here" button doesn't appear or doesn't work:
  - Make sure you have a Spotify Premium account
  - Check if you've granted all required permissions
  - Verify that you've selected both Web API and Web Playback SDK in the Spotify Dashboard
  - Check the browser console for errors

- If you get "Invalid redirect URI" errors:
  - Make sure you're using `127.0.0.1` instead of `localhost`
  - Verify that the URI in your authorization request exactly matches what's in your Spotify Dashboard
  - For production, ensure you're using HTTPS 