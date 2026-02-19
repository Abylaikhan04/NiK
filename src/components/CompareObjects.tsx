import { useState } from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { HistoricalObject, historicalObjects } from '../data/historical-objects';

export function CompareObjects() {
  const [selectedObjects, setSelectedObjects] = useState<HistoricalObject[]>([]);
  const [showSelector, setShowSelector] = useState(true);

  const handleSelectObject = (object: HistoricalObject) => {
    if (selectedObjects.find(obj => obj.id === object.id)) {
      setSelectedObjects(selectedObjects.filter(obj => obj.id !== object.id));
    } else if (selectedObjects.length < 3) {
      setSelectedObjects([...selectedObjects, object]);
    }
  };

  const handleRemoveObject = (objectId: string) => {
    setSelectedObjects(selectedObjects.filter(obj => obj.id !== objectId));
  };

  const clearSelection = () => {
    setSelectedObjects([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">Сравнение объектов</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите до 3 объектов для сравнения характеристик
          </p>
        </div>

        {/* Selection Status */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-1">
                Выбрано объектов: {selectedObjects.length} / 3
              </h3>
              <p className="text-sm text-gray-600">
                {selectedObjects.length === 0 && 'Выберите объекты для сравнения'}
                {selectedObjects.length === 1 && 'Выберите еще минимум один объект'}
                {selectedObjects.length >= 2 && 'Можно начать сравнение'}
              </p>
            </div>
            {selectedObjects.length > 0 && (
              <button
                onClick={clearSelection}
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Очистить выбор
              </button>
            )}
          </div>

          {/* Selected Objects Pills */}
          {selectedObjects.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              {selectedObjects.map((obj) => (
                <div
                  key={obj.id}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                >
                  <span className="text-sm font-medium">{obj.name}</span>
                  <button
                    onClick={() => handleRemoveObject(obj.id)}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Object Selector */}
        {showSelector && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Выберите объекты</h3>
              <button
                onClick={() => setShowSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {historicalObjects.map((obj) => {
                const isSelected = selectedObjects.find(o => o.id === obj.id);
                const canSelect = selectedObjects.length < 3 || isSelected;

                return (
                  <button
                    key={obj.id}
                    onClick={() => handleSelectObject(obj)}
                    disabled={!canSelect}
                    className={`relative rounded-xl overflow-hidden transition-all ${
                      isSelected
                        ? 'ring-4 ring-purple-500'
                        : canSelect
                        ? 'hover:scale-105'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <img
                      src={obj.imageUrl}
                      alt={obj.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                      <p className="text-white text-sm font-medium">{obj.name}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!showSelector && (
          <button
            onClick={() => setShowSelector(true)}
            className="mb-6 text-purple-600 hover:text-purple-700 flex items-center gap-2 transition-colors"
          >
            Изменить выбор
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Comparison Table */}
        {selectedObjects.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <th className="px-6 py-4 text-left font-medium">Характеристика</th>
                    {selectedObjects.map((obj) => (
                      <th key={obj.id} className="px-6 py-4 text-left font-medium min-w-[200px]">
                        {obj.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Images */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Изображение</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4">
                        <img
                          src={obj.imageUrl}
                          alt={obj.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Period */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Период</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4 text-gray-700">
                        {obj.period}
                      </td>
                    ))}
                  </tr>

                  {/* Date */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Дата</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4 text-gray-700">
                        {obj.date}
                      </td>
                    ))}
                  </tr>

                  {/* Marker */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">AR-маркер</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          obj.markerPattern === 'hiro'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {obj.markerPattern.toUpperCase()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Описание</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4 text-sm text-gray-600">
                        {obj.description}
                      </td>
                    ))}
                  </tr>

                  {/* Facts Count */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Количество фактов</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4 text-gray-700">
                        {obj.facts.length} фактов
                      </td>
                    ))}
                  </tr>

                  {/* Key Facts */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Ключевые факты</td>
                    {selectedObjects.map((obj) => (
                      <td key={obj.id} className="px-6 py-4">
                        <ul className="space-y-2 text-sm text-gray-600">
                          {obj.facts.slice(0, 2).map((fact, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-purple-600 mt-0.5">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedObjects.length < 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Выберите объекты для сравнения</h3>
            <p className="text-gray-600">
              Выберите минимум 2 объекта чтобы увидеть сравнение
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
