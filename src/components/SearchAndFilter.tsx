import { useState } from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { HistoricalObject, historicalObjects } from '../data/historical-objects';
import { ObjectGallery } from './ObjectGallery';

interface SearchAndFilterProps {
  onSelectObject: (object: HistoricalObject) => void;
}

export function SearchAndFilter({ onSelectObject }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedMarker, setSelectedMarker] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique periods
  const periods = Array.from(new Set(historicalObjects.map(obj => obj.period)));

  // Filter objects
  const filteredObjects = historicalObjects.filter(obj => {
    const matchesSearch = 
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.period.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPeriod = selectedPeriod === 'all' || obj.period === selectedPeriod;
    const matchesMarker = selectedMarker === 'all' || obj.markerPattern === selectedMarker;

    return matchesSearch && matchesPeriod && matchesMarker;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
    setSelectedMarker('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedPeriod !== 'all' || selectedMarker !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">Поиск объектов</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Найдите интересующие вас исторические памятники
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию, описанию или периоду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Фильтры
              {hasActiveFilters && !showFilters && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Period Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Исторический период
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="all">Все периоды</option>
                    {periods.map(period => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </select>
                </div>

                {/* Marker Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип AR-маркера
                  </label>
                  <select
                    value={selectedMarker}
                    onChange={(e) => setSelectedMarker(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="all">Все маркеры</option>
                    <option value="hiro">HIRO</option>
                    <option value="kanji">KANJI</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Сбросить все фильтры
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredObjects.length === 0 && 'Ничего не найдено'}
            {filteredObjects.length === 1 && 'Найден 1 объект'}
            {filteredObjects.length > 1 && filteredObjects.length < 5 && `Найдено ${filteredObjects.length} объекта`}
            {filteredObjects.length >= 5 && `Найдено ${filteredObjects.length} объектов`}
          </p>
        </div>

        {/* Results */}
        {filteredObjects.length > 0 ? (
          <ObjectGallery
            objects={filteredObjects}
            onSelectObject={onSelectObject}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить критерии поиска или фильтры
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Search Tips */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="text-gray-900 mb-3">💡 Советы по поиску:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Используйте ключевые слова из названия или описания объекта</li>
            <li>• Попробуйте искать по историческому периоду (например, "Древний Рим")</li>
            <li>• Комбинируйте поиск с фильтрами для более точных результатов</li>
            <li>• Используйте фильтр по маркерам, если знаете какой маркер у вас есть</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
