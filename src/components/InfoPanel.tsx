import { X, Calendar, MapPin, BookOpen } from 'lucide-react';
import { HistoricalObject } from '../data/historical-objects';

interface InfoPanelProps {
  object: HistoricalObject;
  onClose: () => void;
}

export function InfoPanel({ object, onClose }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl md:rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2">{object.name}</h2>
              <p className="text-white/90">{object.period}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="mb-1">Период создания</h3>
              <p className="text-gray-600">{object.date}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="mb-2">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{object.description}</p>
            </div>
          </div>

          {/* Historical Facts */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-pink-600" />
              Исторические факты
            </h3>
            <div className="space-y-3">
              {object.facts.map((fact, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          {object.imageUrl && (
            <div className="rounded-xl overflow-hidden">
              <img
                src={object.imageUrl}
                alt={object.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
