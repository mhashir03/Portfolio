'use client';

import React, { useEffect, useState, useRef } from 'react';

const SpotifyNowPlaying = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const deviceIdRef = useRef(null);

  // Initialize the Spotify Web Playback SDK
  useEffect(() => {
    // Load the Spotify Web Playback SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    // Callback when the script is loaded
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Portfolio Web Player',
        getOAuthToken: cb => {
          // Get a new access token from your API endpoint
          fetch('/api/spotify/token')
            .then(res => res.json())
            .then(data => {
              cb(data.access_token);
            });
        },
        volume: 0.5
      });

      // Set up event listeners
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Spotify player ready with device ID:', device_id);
        deviceIdRef.current = device_id;
        setIsPlayerReady(true);
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setIsPlayerReady(false);
      });

      spotifyPlayer.addListener('player_state_changed', state => {
        if (state) {
          setPlayerState(state);
          setIsPaused(state.paused);
        }
      });

      // Connect to the player
      spotifyPlayer.connect().then(success => {
        if (success) {
          console.log('Spotify Web Playback SDK connected successfully');
          setPlayer(spotifyPlayer);
        }
      });

      // Cleanup
      return () => {
        spotifyPlayer.disconnect();
      };
    };
  }, []);

  // Fetch currently playing track
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every minute
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Play the current track
  const playTrack = async () => {
    if (!isPlayerReady || !data?.songUrl) return;
    
    setShowPlayer(true);
    
    // Extract the Spotify track ID from the URL
    const trackId = data.songUrl.split('/').pop();
    
    try {
      await fetch('/api/spotify/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: deviceIdRef.current,
          track_uri: `spotify:track:${trackId}`
        })
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!player) return;
    
    player.togglePlay().then(() => {
      setIsPaused(!isPaused);
    });
  };

  if (loading) {
    return (
      <div className="mt-3 text-[#8b949e]">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command"> spotify --status</span>
        <div className="terminal-output">
          <div className="flex items-center mt-1">
            <div className="animate-pulse mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="mt-3 text-[#8b949e]">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command"> spotify --status</span>
        <div className="terminal-output">
          <div className="flex items-center mt-1">
            <div className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <p>Not currently listening to anything</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 text-[#8b949e]">
      <span className="terminal-prompt">$</span>
      <span className="terminal-command"> spotify --now-playing</span>
      <div className="terminal-output">
        {showPlayer ? (
          <div className="bg-[#161b22] p-4 rounded border border-[#30363d] transition-all my-2">
            <div className="flex items-center mb-3">
              {data.albumImageUrl && (
                <img
                  src={data.albumImageUrl}
                  alt={`${data.title} album art`}
                  className="w-12 h-12 rounded mr-3"
                />
              )}
              <div className="flex-1">
                <div className="text-[#e6edf3] font-bold">{data.title}</div>
                <p className="text-xs text-[#8b949e]">by {data.artist}</p>
              </div>
              <button 
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center bg-[#1DB954] rounded-full hover:bg-opacity-80 transition-all"
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-xs text-right text-[#8b949e]">
              <button 
                onClick={() => setShowPlayer(false)}
                className="hover:text-[#e6edf3]"
              >
                Hide Player
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center mt-2 bg-[#161b22] p-2 rounded border border-[#30363d] transition-all hover:border-[#58a6ff]">
            {data.albumImageUrl && (
              <img
                src={data.albumImageUrl}
                alt={`${data.title} album art`}
                className="w-12 h-12 rounded mr-3"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center">
                <div className="mr-2 text-[#1DB954]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
                <div className="text-[#e6edf3] font-bold">Now Playing</div>
              </div>
              <a 
                href={data.songUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#58a6ff] hover:underline"
              >
                {data.title}
              </a>
              <p className="text-xs text-[#8b949e]">by {data.artist}</p>
              
              {isPlayerReady && (
                <button 
                  onClick={playTrack}
                  className="mt-2 px-3 py-1 text-xs bg-[#1DB954] text-black rounded-full hover:bg-opacity-80 transition-all flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play here
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyNowPlaying; 