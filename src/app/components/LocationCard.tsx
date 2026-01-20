'use client';

import React, { useEffect, useRef, useState } from 'react';

// Dynamically import Leaflet to avoid SSR issues
const LocationCard = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isDaytime, setIsDaytime] = useState(true);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const stlTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTime(stlTime);

      // Check if daytime (6 AM - 9 PM)
      // Parse hour from 12-hour format (e.g., "6:33:45 PM" or "6:33:45 AM")
      const timeParts = stlTime.split(' ');
      const isPM = timeParts[1] === 'PM';
      const hour24 = parseInt(timeParts[0].split(':')[0]);
      const hour = isPM && hour24 !== 12 ? hour24 + 12 : (!isPM && hour24 === 12 ? 0 : hour24);
      setIsDaytime(hour >= 6 && hour < 21);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    let destroyed = false;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      // Dynamically import Leaflet CSS
      // @ts-ignore - CSS import doesn't have type definitions
      await import('leaflet/dist/leaflet.css');

      if (destroyed || !mapContainer.current) return;

      // Saint Louis coordinates: Centered on downtown St. Louis
      // Coordinates adjusted to center the city with "SAINT LOUIS" label prominent
      // Adjusted to move view left (west) and up (north) to better center the city
      // Zoom level 13 focuses on St. Louis city center, reducing visibility of surrounding cities
      mapInstance.current = L.map(mapContainer.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        touchZoom: true,
      }).setView([38.6250, -90.1903], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '',
        keepBuffer: 4,
        updateWhenIdle: false,
        updateWhenZooming: false,
      }).addTo(mapInstance.current);

      // Log coordinates when map is moved (for easy adjustment)
      mapInstance.current.on('moveend', () => {
        const center = mapInstance.current.getCenter();
        const zoom = mapInstance.current.getZoom();
        console.log(`Map center: [${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}, ${zoom}]`);
      });

      setLeafletLoaded(true);
    };

    initMap();

    return () => {
      destroyed = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  const recenterMap = () => {
    if (mapInstance.current) {
      mapInstance.current.setView([38.6250, -90.1903], 14);
    }
  };

  return (
    <div className="location-card-wrapper">
      <button
        onClick={recenterMap}
        className="location-card-header"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="location-pin-icon"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Currently Based In 📍
      </button>
      
      <div className="location-map-wrapper">
        <div ref={mapContainer} className="location-map-container" />
        {!leafletLoaded && (
          <div className="location-map-loading">
            <span>Loading map...</span>
          </div>
        )}
      </div>
      
      <div className="location-card-footer">
        <button
          onClick={recenterMap}
          className="location-name-btn"
        >
          Saint Louis, MO
        </button>
        {currentTime && (
          <div className="location-time-display">
            {isDaytime ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="time-icon time-icon-sun"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="time-icon time-icon-moon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="location-time-value">{currentTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
