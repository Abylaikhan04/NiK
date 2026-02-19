import { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { historicalObjects } from '../data/historical-objects';
import { objectLocations } from '../data/locations';
import { InfoPanel } from './InfoPanel';

// Fix default Leaflet marker icons broken in Vite builds
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createCustomIcon = (selected: boolean) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;
      background:linear-gradient(135deg,${selected ? '#7c3aed' : '#a855f7'},${selected ? '#db2777' : '#ec4899'});
      border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
  });

export function WorldMap() {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const selectedObject = historicalObjects.find(o => o.id === selectedObjectId) || null;

  const regions = [
    { name: 'Р•РІСЂРѕРїР°', color: 'from-blue-500 to-indigo-500', objects: ['colosseum', 'parthenon', 'stonehenge'] },
    { name: 'РђС„СЂРёРєР°', color: 'from-orange-500 to-red-500', objects: ['pyramid'] },
    { name: 'РђР·РёСЏ', color: 'from-green-500 to-emerald-500', objects: ['great-wall'] },
    { name: 'Р®Р¶РЅР°СЏ РђРјРµСЂРёРєР°', color: 'from-purple-500 to-pink-500', objects: ['machu-picchu'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">РљР°СЂС‚Р° РёСЃС‚РѕСЂРёС‡РµСЃРєРёС… РѕР±СЉРµРєС‚РѕРІ</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            РќР°Р¶РјРёС‚Рµ РЅР° РјР°СЂРєРµСЂ РЅР° РєР°СЂС‚Рµ РёР»Рё РІ СЃРїРёСЃРєРµ, С‡С‚РѕР±С‹ СѓР·РЅР°С‚СЊ Р±РѕР»СЊС€Рµ Рѕ РїР°РјСЏС‚РЅРёРєРµ
          </p>
        </div>

        {/* Real Leaflet Map */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8" style={{ height: '500px' }}>
          <MapContainer
            center={[30, 20]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {historicalObjects.map((obj) => {
              const loc = objectLocations[obj.id];
              if (!loc) return null;
              return (
                <Marker
                  key={obj.id}
                  position={[loc.lat, loc.lng]}
                  icon={createCustomIcon(selectedObjectId === obj.id)}
                  eventHandlers={{ click: () => setSelectedObjectId(obj.id) }}
                >
                  <Popup>
                    <div style={{ minWidth: '160px', textAlign: 'center' }}>
                      {obj.imageUrl && (
                        <img
                          src={obj.imageUrl}
                          alt={obj.name}
                          style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                        />
                      )}
                      <strong style={{ fontSize: '13px' }}>{obj.name}</strong><br />
                      <span style={{ color: '#7c3aed', fontSize: '11px' }}>{obj.period}</span><br />
                      <span style={{ color: '#888', fontSize: '11px' }}>{loc.name}</span><br />
                      <button
                        onClick={() => { setSelectedObjectId(obj.id); setShowInfoPanel(true); }}
                        style={{
                          marginTop: '8px',
                          background: 'linear-gradient(135deg,#7c3aed,#db2777)',
                          color: 'white', border: 'none', borderRadius: '6px',
                          padding: '5px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                        }}
                      >
                        РџРѕРґСЂРѕР±РЅРµРµ
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {regions.map((region) => (
            <div key={region.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-br ${region.color} text-white p-4 text-center`}>
                <h3 className="font-semibold">{region.name}</h3>
              </div>
              <div className="p-4 space-y-2">
                {region.objects.map((objId) => {
                  const obj = historicalObjects.find(o => o.id === objId);
                  if (!obj) return null;
                  const loc = objectLocations[objId];
                  return (
                    <button
                      key={objId}
                      onClick={() => { setSelectedObjectId(objId); setShowInfoPanel(true); }}
                      className={`w-full text-left p-3 rounded-lg transition-all hover:bg-purple-50 ${
                        selectedObjectId === objId ? 'bg-purple-50 ring-2 ring-purple-300' : 'bg-gray-50'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">{obj.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {loc?.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Object Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historicalObjects.map((obj) => {
            const loc = objectLocations[obj.id];
            return (
              <button
                key={obj.id}
                onClick={() => { setSelectedObjectId(obj.id); setShowInfoPanel(true); }}
                className={`bg-white rounded-xl p-4 shadow-lg text-left transition-all hover:shadow-xl ${
                  selectedObjectId === obj.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex gap-3 items-start">
                  {obj.imageUrl && (
                    <img src={obj.imageUrl} alt={obj.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-gray-900 text-sm font-semibold mb-1">{obj.name}</h3>
                    <p className="text-purple-600 text-xs mb-1">{obj.period}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" /> {loc?.name}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{obj.date}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showInfoPanel && selectedObject && (
        <InfoPanel object={selectedObject} onClose={() => setShowInfoPanel(false)} />
      )}
    </div>
  );
}

