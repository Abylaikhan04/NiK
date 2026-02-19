import { Calendar, MapPin } from 'lucide-react';
import { HistoricalObject } from '../data/historical-objects';

interface ObjectGalleryProps {
  objects: HistoricalObject[];
  onSelectObject: (object: HistoricalObject) => void;
}

export function ObjectGallery({ objects, onSelectObject }: ObjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {objects.map((object) => (
        <div
          key={object.id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          onClick={() => onSelectObject(object)}
        >
          {/* Image */}
          {object.imageUrl && (
            <div className="h-48 overflow-hidden">
              <img
                src={object.imageUrl}
                alt={object.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <h3 className="text-gray-900 mb-2">{object.name}</h3>
            
            <div className="flex items-center gap-2 text-sm text-purple-600 mb-3">
              <MapPin className="w-4 h-4" />
              {object.period}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Calendar className="w-4 h-4" />
              {object.date}
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {object.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Маркер: {object.markerPattern.toUpperCase()}
              </span>
              <button className="text-sm text-purple-600 hover:text-purple-700">
                Подробнее →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
