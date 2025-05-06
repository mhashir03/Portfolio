'use client';

import React, { useEffect, useState, useRef } from 'react';

const SpotifyNowPlaying = () => {
  const [data, setData] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);
  const deviceIdRef = useRef(null);
  const progressInterval = useRef(null);
  const lastPositionRef = useRef(0);
  const lastPositionUpdateTimeRef = useRef(0);

  // Define fetchRecentTracks function to be used in multiple places
  const fetchRecentTracks = async () => {
    try {
      const response = await fetch('/api/spotify/recently-played');
      const result = await response.json();
      if (result.success && result.recentTracks) {
        setRecentTracks(result.recentTracks);
      }
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
    }
  };

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
          
          // Update duration
          setDuration(state.duration);
          
          // Update progress and track state for our manual tracking
          const currentPosition = state.position;
          setProgress(currentPosition);
          lastPositionRef.current = currentPosition;
          lastPositionUpdateTimeRef.current = Date.now();
          
          // Start/stop progress tracking when playing state changes
          if (!state.paused) {
            startProgressTracking();
          } else {
            stopProgressTracking();
          }
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
        stopProgressTracking();
        spotifyPlayer.disconnect();
      };
    };
  }, []);

  // Improved track progress tracking
  const startProgressTracking = () => {
    stopProgressTracking(); // Clear any existing interval
    
    progressInterval.current = setInterval(() => {
      // Calculate time elapsed since the last known position update
      const now = Date.now();
      const timeElapsed = now - lastPositionUpdateTimeRef.current;
      
      // Only update if we're not paused
      if (!isPaused) {
        // Calculate the new position based on elapsed time
        const estimatedPosition = Math.min(
          lastPositionRef.current + timeElapsed,
          duration
        );
        
        setProgress(estimatedPosition);
        
        // Update our reference time for the next calculation
        // but keep the position the same (it will be updated by the player state)
        lastPositionUpdateTimeRef.current = now;
        lastPositionRef.current = estimatedPosition;
        
        // Stop if we reach the end
        if (estimatedPosition >= duration) {
          stopProgressTracking();
        }
      }
    }, 50); // Update more frequently for smoother progress
  };
  
  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  // Get current player state to sync UI
  const getCurrentState = async () => {
    if (!player) return;
    
    try {
      const state = await player.getCurrentState();
      if (state) {
        // Update our tracking state with the latest from Spotify
        const currentPosition = state.position;
        setProgress(currentPosition);
        setDuration(state.duration);
        lastPositionRef.current = currentPosition;
        lastPositionUpdateTimeRef.current = Date.now();
      }
    } catch (error) {
      console.error('Error getting current state:', error);
    }
  };

  // Fetch currently playing track
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        const result = await response.json();
        
        // If the song changed, fetch recently played tracks
        if (data?.songUrl !== result?.songUrl) {
          fetchRecentTracks();
        }
        
        setData(result);
        
        // If we have a player, get the current state to ensure sync
        if (player && result.isPlaying) {
          getCurrentState();
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every second
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [player]);

  // Fetch recently played tracks
  useEffect(() => {
    fetchRecentTracks();
    // Refresh data every half second
    const interval = setInterval(fetchRecentTracks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play the current track
  const playTrack = async (trackUri) => {
    if (!isPlayerReady) return;
    
    setShowPlayer(true);
    
    // Extract the Spotify track ID if a full URI is not provided
    const uri = trackUri || (data?.songUrl ? `spotify:track:${data.songUrl.split('/').pop()}` : null);
    
    if (!uri) return;
    
    try {
      await fetch('/api/spotify/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: deviceIdRef.current,
          track_uri: uri
        })
      });
      
      // After sending play command, wait a bit then get current state
      setTimeout(() => {
        getCurrentState();
        startProgressTracking();
        // Also update recently played tracks after playing a track
        fetchRecentTracks();
      }, 500);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!player) return;
    
    player.togglePlay().then(() => {
      setIsPaused(!isPaused);
      
      // After toggling, update our tracking state
      setTimeout(() => {
        getCurrentState();
        if (!isPaused) { // This is the state before toggling
          stopProgressTracking();
        } else {
          startProgressTracking();
        }
      }, 300);
    });
  };

  // Handle seeking in the progress bar
  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current || !duration || !player) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentComplete = offsetX / rect.width;
    const newPosition = Math.floor(duration * percentComplete);
    
    // Update local state immediately for smoothness
    setProgress(newPosition);
    lastPositionRef.current = newPosition;
    lastPositionUpdateTimeRef.current = Date.now();
    
    // Send the seek command to Spotify
    player.seek(newPosition).then(() => {
      // After seeking, get current state to ensure sync
      setTimeout(getCurrentState, 200);
    });
  };

  // Format milliseconds to mm:ss
  const formatTime = (ms) => {
    if (!ms) return '0:00';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="mt-3 text-[#8b949e]">
        <div className="flex justify-between items-center">
          <div>
            <span className="terminal-prompt">$</span>
            <span className="terminal-command"> spotify --status</span>
          </div>
          <a 
            href="https://open.spotify.com/user/mooshie77627" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 flex items-center justify-center bg-[#1f2937] border border-[#30363d] rounded-full hover:bg-[#242f3d] hover:border-[#1DB954] hover:scale-110 hover:shadow-md transition-all cursor-pointer"
            title="My Spotify Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DB954" className="h-5 w-5">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
        </div>
        <div className="terminal-output">
          <div className="flex items-center mt-1">
            <div className="animate-pulse mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
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
        <div className="flex justify-between items-center">
          <div>
            <span className="terminal-prompt">$</span>
            <span className="terminal-command"> spotify --status</span>
          </div>
          <a 
            href="https://open.spotify.com/user/mooshie77627" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 flex items-center justify-center bg-[#1f2937] border border-[#30363d] rounded-full hover:bg-[#242f3d] hover:border-[#1DB954] hover:scale-110 hover:shadow-md transition-all cursor-pointer"
            title="My Spotify Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DB954" className="h-5 w-5">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
        </div>
        <div className="terminal-output">
          <div className="flex items-center mt-1">
            <div className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <p>Not currently listening to anything</p>
          </div>
          
          {/* Recently Played Tracks */}
          {recentTracks.length > 0 && (
            <div className="mt-3">
              <p className="text-[#e6edf3] font-bold mb-2">Recently Played:</p>
              <div className="space-y-2">
                {recentTracks.map((track, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-2 bg-[#161b22] rounded border border-[#30363d] hover:border-[#58a6ff] transition-all"
                  >
                    {track.albumImageUrl && (
                      <img 
                        src={track.albumImageUrl} 
                        alt={`${track.title} album art`}
                        className="w-10 h-10 rounded mr-2"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <a 
                        href={track.songUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#58a6ff] hover:underline text-sm truncate block"
                      >
                        {track.title}
                      </a>
                      <p className="text-xs text-[#8b949e] truncate">{track.artist}</p>
                    </div>
                    {isPlayerReady && (
                      <button 
                        onClick={() => playTrack(`spotify:track:${track.songUrl.split('/').pop()}`)}
                        className="ml-2 w-8 h-8 flex items-center justify-center bg-[#1DB954] rounded-full hover:bg-opacity-80 hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 text-[#8b949e]">
      <div className="flex justify-between items-center">
        <div>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> spotify --now-playing</span>
        </div>
        <a 
          href="https://open.spotify.com/user/mooshie77627" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-8 h-8 flex items-center justify-center bg-[#1f2937] border border-[#30363d] rounded-full hover:bg-[#242f3d] hover:border-[#1DB954] hover:scale-110 hover:shadow-md transition-all cursor-pointer"
          title="My Spotify Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DB954" className="h-5 w-5">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
      </div>
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
                className="w-10 h-10 flex items-center justify-center bg-[#1DB954] rounded-full hover:bg-opacity-80 hover:scale-110 hover:shadow-md transition-all cursor-pointer"
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
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div 
                ref={progressBarRef}
                className="h-2 bg-[#30363d] rounded-full cursor-pointer overflow-hidden"
                onClick={handleProgressBarClick}
              >
                <div 
                  className="h-full bg-[#1DB954] transition-all" 
                  style={{ width: `${progress && duration ? (progress / duration) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
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
              
              <div className="flex space-x-2 mt-2">
                {isPlayerReady && (
                  <button 
                    onClick={() => playTrack()}
                    className="px-3 py-1 text-xs bg-[#1DB954] text-black rounded-full hover:bg-opacity-80 hover:scale-105 hover:shadow-sm transition-all flex items-center cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play here
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Recently Played Tracks */}
        {recentTracks.length > 0 && (
          <div className="mt-3">
            <p className="text-[#e6edf3] font-bold mb-2">Recently Played:</p>
            <div className="space-y-2">
              {recentTracks.map((track, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-2 bg-[#161b22] rounded border border-[#30363d] hover:border-[#58a6ff] transition-all"
                >
                  {track.albumImageUrl && (
                    <img 
                      src={track.albumImageUrl} 
                      alt={`${track.title} album art`}
                      className="w-10 h-10 rounded mr-2"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <a 
                      href={track.songUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#58a6ff] hover:underline text-sm truncate block"
                    >
                      {track.title}
                    </a>
                    <p className="text-xs text-[#8b949e] truncate">{track.artist}</p>
                  </div>
                  {isPlayerReady && (
                    <button 
                      onClick={() => playTrack(`spotify:track:${track.songUrl.split('/').pop()}`)}
                      className="ml-2 w-8 h-8 flex items-center justify-center bg-[#1DB954] rounded-full hover:bg-opacity-80 hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyNowPlaying; 