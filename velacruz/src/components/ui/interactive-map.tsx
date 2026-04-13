"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  Polyline,
  useMap,
  useMapEvents
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color = 'blue', size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: [20, 32] as [number, number],
    medium: [25, 41] as [number, number],
    large: [30, 50] as [number, number]
  };
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: sizes[size] || sizes.medium,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Map event handler component
const MapEvents = ({ onMapClick, onLocationFound }: any) => {
  const map = useMapEvents({
    click: (e) => {
      onMapClick && onMapClick(e.latlng);
    },
    locationfound: (e) => {
      onLocationFound && onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

// Custom control component
const CustomControls = ({ onLocate, onToggleLayer }: any) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: 'topright' });
    
    control.onAdd = () => {
      const div = L.DomUtil.create('div', 'custom-controls opacity-90');
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 4px;">
          <button id="locate-btn" style="padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; background: #fff; font-size: 14px; font-weight: 500;">📍 Encontrarme</button>
          <button id="satellite-btn" style="padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; background: #fff; font-size: 14px; font-weight: 500;">🛰️ Satélite</button>
        </div>
      `;
      
      L.DomEvent.disableClickPropagation(div);
      
      const locateBtn = div.querySelector('#locate-btn');
      const satelliteBtn = div.querySelector('#satellite-btn');
      
      if(locateBtn) locateBtn.addEventListener('click', onLocate);
      if(satelliteBtn) satelliteBtn.addEventListener('click', () => onToggleLayer('satellite'));
      
      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onLocate, onToggleLayer]);

  return null;
};

// Search component
const SearchControl = ({ onSearch }: any) => {
  const [query, setQuery] = useState('');
  const map = useMap();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const results = await response.json();
      
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latLng = [parseFloat(lat), parseFloat(lon)];
        map.flyTo(latLng as any, 13);
        onSearch && onSearch({ latLng, name: display_name });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    const control = new L.Control({ position: 'topleft' });
    
    control.onAdd = () => {
      const div = L.DomUtil.create('div', 'search-control');
      div.innerHTML = `
        <div style="background: white; padding: 6px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; gap: 5px;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Buscar lugares..." 
            style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; width: 220px; outline: none; border-color: #22c55e;"
          />
          <button 
            id="search-btn" 
            style="padding: 8px 12px; border: none; border-radius: 6px; cursor: pointer; background: #22c55e; color: white;"
          >
            🔍
          </button>
        </div>
      `;
      
      L.DomEvent.disableClickPropagation(div);
      
      const input = div.querySelector('#search-input') as HTMLInputElement;
      const button = div.querySelector('#search-btn');
      
      if(input) {
        input.addEventListener('input', (e: any) => setQuery(e.target.value));
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') handleSearch();
        });
      }
      if(button) {
        button.addEventListener('click', handleSearch);
      }
      
      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]); // intentionally simple dep array

  return null;
};

// Main AdvancedMap component
export const AdvancedMap = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [] as any[],
  polygons = [] as any[],
  circles = [] as any[],
  polylines = [] as any[],
  onMarkerClick,
  onMapClick,
  enableClustering = true,
  enableSearch = true,
  enableControls = true,
  mapLayers = {
    openstreetmap: true,
    satellite: false,
    traffic: false
  },
  className = '',
  style = { height: '500px', width: '100%', zIndex: 10 }
}: any) => {
  const [currentLayers, setCurrentLayers] = useState(mapLayers);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<any>(null);

  const handleToggleLayer = useCallback((layerType: string) => {
    setCurrentLayers((prev: any) => ({
      ...prev,
      [layerType]: !prev[layerType]
    }));
  }, []);

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleMapClick = useCallback((latlng: any) => {
    setClickedLocation(latlng);
    onMapClick && onMapClick(latlng);
  }, [onMapClick]);

  const handleSearch = useCallback((result: any) => {
    setSearchResult(result);
  }, []);

  useEffect(() => {
    // Leaflet re-render hack to ensure it grabs the correct container size
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 400);
  }, []);

  return (
    <div className={`advanced-map relative rounded-2xl overflow-hidden border border-zinc-700/50 ${className}`} style={{ ...style, position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
      >
        {currentLayers.openstreetmap && (
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        
        {currentLayers.satellite && (
          <TileLayer
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <MapEvents
          onMapClick={handleMapClick}
          onLocationFound={setUserLocation}
        />

        {enableSearch && <SearchControl onSearch={handleSearch} />}

        {enableControls && (
          <CustomControls
            onLocate={handleLocate}
            onToggleLayer={handleToggleLayer}
            layers={currentLayers}
          />
        )}

        {enableClustering ? (
          <MarkerClusterGroup>
            {markers.map((marker: any, index: number) => (
              <Marker
                key={marker.id || index}
                position={marker.position}
                icon={marker.icon || createCustomIcon(marker.color, marker.size)}
                eventHandlers={{
                  click: () => onMarkerClick && onMarkerClick(marker)
                }}
              >
                {marker.popup && (
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-sm mb-1">{marker.popup.title}</h3>
                      <p className="text-xs text-gray-600 m-0">{marker.popup.content}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          markers.map((marker: any, index: number) => (
            <Marker
              key={marker.id || index}
              position={marker.position}
              icon={marker.icon || createCustomIcon(marker.color, marker.size)}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(marker)
              }}
            >
              {marker.popup && (
                <Popup>
                  <div>
                    <h3>{marker.popup.title}</h3>
                    <p>{marker.popup.content}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))
        )}

        {userLocation && (
          <Marker 
            position={userLocation}
            icon={createCustomIcon('red', 'medium')}
          >
            <Popup>Tu ubicación actual</Popup>
          </Marker>
        )}

        {searchResult && (
          <Marker 
            position={searchResult.latLng}
            icon={createCustomIcon('green', 'large')}
          >
            <Popup>{searchResult.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
