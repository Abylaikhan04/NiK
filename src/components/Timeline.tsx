import { Calendar, MapPin } from 'lucide-react';
import { historicalObjects } from '../data/historical-objects';

export function Timeline() {
  // Sort objects by approximate date
  const sortedObjects = [...historicalObjects].sort((a, b) => {
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/(\d+)/);
      if (!match) return 0;
      const year = parseInt(match[1]);
      return dateStr.includes('до н.э') ? -year : year;
    };
    return getYear(a.date) - getYear(b.date);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">Временная шкала истории</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Исторические объекты в хронологическом порядке
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-purple-200"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {sortedObjects.map((object, index) => (
              <div
                key={object.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {object.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={object.imageUrl}
                          alt={object.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{object.date}</span>
                      </div>
                      
                      <h3 className="text-gray-900 mb-2">{object.name}</h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        {object.period}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {object.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-gray-900 mb-6">Периоды истории</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full mt-1.5"></div>
              <div>
                <h4 className="text-gray-900 mb-1">Древний мир</h4>
                <p className="text-sm text-gray-600">
                  3000 г. до н.э. - 476 г. н.э.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-pink-600 rounded-full mt-1.5"></div>
              <div>
                <h4 className="text-gray-900 mb-1">Средневековье</h4>
                <p className="text-sm text-gray-600">
                  476 г. - 1492 г.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-indigo-600 rounded-full mt-1.5"></div>
              <div>
                <h4 className="text-gray-900 mb-1">Новое время</h4>
                <p className="text-sm text-gray-600">
                  1492 г. - наши дни
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
