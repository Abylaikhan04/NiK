import { useState } from 'react';
import { Camera, ArrowLeft, ExternalLink, Info, AlertCircle } from 'lucide-react';
import { historicalObjects } from '../data/historical-objects';
import { InfoPanel } from './InfoPanel';
import { HistoricalObject } from '../data/historical-objects';

interface ARSceneProps {
  onBack: () => void;
}

const HIRO_IDS  = ['colosseum', 'parthenon', 'machu-picchu'];
const KANJI_IDS = ['pyramid', 'stonehenge', 'great-wall'];

export function ARScene({ onBack }: ARSceneProps) {
  const [selectedObject, setSelectedObject] = useState<HistoricalObject | null>(null);

  const hiroObjects  = historicalObjects.filter(o => HIRO_IDS.includes(o.id));
  const kanjiObjects = historicalObjects.filter(o => KANJI_IDS.includes(o.id));

  const openAR = () => window.open(new URL('/ar.html', window.location.origin).toString(), '_blank', 'noopener,noreferrer');
  const openMarkers = () => window.open(new URL('/markers/', window.location.origin).toString(), '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Назад</span>
        </button>
        <h1 className="text-base font-semibold">Дополненная реальность</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 max-w-2xl mx-auto w-full">

        {/* Launch card */}
        <div className="relative rounded-3xl overflow-hidden mb-8 bg-white/10 backdrop-blur-md shadow-2xl">
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #fff 0%, transparent 60%)' }}
          />
          <div className="relative p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AR камера</h2>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Наведите камеру на маркер HIRO или KANJI — над ним появится
              3D-модель исторического объекта с подписями.
            </p>
            <button
              onClick={openAR}
              className="inline-flex items-center gap-2 bg-white text-purple-800 font-semibold px-8 py-3 rounded-2xl shadow-lg hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
            >
              <Camera className="w-5 h-5" />
              Открыть AR камеру
              <ExternalLink className="w-4 h-4 opacity-60" />
            </button>
            <p className="text-white/70 text-xs mt-4">Откроется в новой вкладке · требуется камера</p>

            <div className="mt-4">
              <button
                onClick={openMarkers}
                className="inline-flex items-center gap-2 text-white/85 hover:text-white underline underline-offset-4 text-sm"
              >
                Маркеры (PDF/печать)
                <ExternalLink className="w-4 h-4 opacity-60" />
              </button>
            </div>
          </div>
        </div>

        {/* Camera warning */}
        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8">
          <AlertCircle className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm leading-relaxed">
            Для работы AR нужен <strong>доступ к камере</strong>. Разрешите его при первом запросе браузера.
          </p>
        </div>

        {/* Markers guide */}
        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Маркеры и объекты</h3>

        {/* HIRO group */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-xs font-bold">H</div>
            <span className="text-sm font-semibold text-purple-300">HIRO маркер</span>
          </div>
          <div className="space-y-2 pl-11">
            {hiroObjects.map(obj => (
              <button
                key={obj.id}
                onClick={() => setSelectedObject(obj)}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors text-left"
              >
                <img
                  src={obj.imageUrl}
                  alt={obj.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/7c3aed/fff?text=?'; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{obj.name}</p>
                  <p className="text-xs text-white/50 truncate">{obj.period}</p>
                </div>
                <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* KANJI group */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-pink-700 flex items-center justify-center text-xs font-bold">K</div>
            <span className="text-sm font-semibold text-pink-300">KANJI маркер</span>
          </div>
          <div className="space-y-2 pl-11">
            {kanjiObjects.map(obj => (
              <button
                key={obj.id}
                onClick={() => setSelectedObject(obj)}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors text-left"
              >
                <img
                  src={obj.imageUrl}
                  alt={obj.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/be185d/fff?text=?'; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{obj.name}</p>
                  <p className="text-xs text-white/50 truncate">{obj.period}</p>
                </div>
                <Info className="w-4 h-4 text-pink-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h4 className="text-sm font-semibold mb-4 text-white/80">Как использовать</h4>
          <ol className="space-y-3">
            {[
              'Нажмите «Открыть AR камеру» выше',
              'Разрешите доступ к камере браузера',
              'Распечатайте или откройте маркер HIRO/KANJI на экране',
              'Наведите камеру — над маркером появится 3D-модель',
              'Нажмите на кнопку объекта для подробной информации',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-white/70 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

      </div>

      {/* Info Panel */}
      {selectedObject && (
        <InfoPanel object={selectedObject} onClose={() => setSelectedObject(null)} />
      )}
    </div>
  );
}
