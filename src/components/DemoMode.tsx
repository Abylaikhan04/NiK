import { useState, useEffect } from 'react';
import { Info, Play, Pause, RotateCcw } from 'lucide-react';
import { HistoricalObject, historicalObjects } from '../data/historical-objects';
import { InfoPanel } from './InfoPanel';

export function DemoMode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const [selectedObject, setSelectedObject] = useState<HistoricalObject | null>(null);

  const currentObject = historicalObjects[currentObjectIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentObjectIndex((prev) => (prev + 1) % historicalObjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentObjectIndex(0);
  };

  const handleSelectObject = (index: number) => {
    setIsPlaying(false);
    setCurrentObjectIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Demo AR View */}
      <div className="relative h-screen">
        {/* Simulated Camera Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Grid overlay to simulate AR view */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Simulated marker detection area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Marker frame */}
              <div className="w-80 h-80 border-4 border-purple-500 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="w-full h-full flex flex-col items-center justify-center p-8">
                  {/* 3D Model Placeholder */}
                  <div className="w-48 h-48 mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg animate-pulse opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={currentObject.imageUrl}
                        alt={currentObject.name}
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Object Label */}
                  <div className="bg-white/95 backdrop-blur-md rounded-xl px-6 py-3 shadow-xl">
                    <p className="text-purple-600 text-sm mb-1">{currentObject.period}</p>
                    <h3 className="text-gray-900">{currentObject.name}</h3>
                  </div>
                </div>
              </div>

              {/* Corner indicators */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
            </div>
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
          <div className="flex items-center justify-between">
            <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full">
              ДЕМО-РЕЖИМ
            </div>
            
            <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Маркер обнаружен
            </div>
          </div>
        </div>

        {/* Bottom Info Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{currentObject.name}</h3>
                <p className="text-purple-600">{currentObject.period}</p>
              </div>
              <button
                onClick={() => setSelectedObject(currentObject)}
                className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors ml-4"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {currentObject.description}
            </p>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Пауза
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Авто-показ
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Сброс
              </button>

              <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm ml-auto">
                {currentObjectIndex + 1} / {historicalObjects.length}
              </span>
            </div>
          </div>
        </div>

        {/* Object Selector */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl space-y-2">
            {historicalObjects.map((obj, index) => (
              <button
                key={obj.id}
                onClick={() => handleSelectObject(index)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentObjectIndex
                    ? 'border-purple-600 scale-110'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
              >
                <img
                  src={obj.imageUrl}
                  alt={obj.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="absolute left-4 bottom-32 z-10 max-w-md">
          <div className="bg-blue-500/90 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-xl">
            <p className="text-sm">
              ℹ️ Демо-режим: симуляция AR без камеры. Для полного опыта используйте AR-режим с реальными маркерами.
            </p>
          </div>
        </div>
      </div>

      {/* Info Panel Modal */}
      {selectedObject && (
        <InfoPanel
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
}
