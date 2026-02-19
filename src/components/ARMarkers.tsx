import { Download, Printer, QrCode, Info } from 'lucide-react';

export function ARMarkers() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (markerType: string) => {
    // В реальном проекте здесь был бы скачивание PDF с маркером
    alert(`Скачивание ${markerType} маркера... (в демо-версии недоступно)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">AR-маркеры для распознавания</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Распечатайте или откройте на другом устройстве AR-маркеры для работы с системой
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 mb-2">Как использовать маркеры:</h3>
              <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                <li>Распечатайте маркер на белой бумаге формата A4 или откройте на другом устройстве</li>
                <li>Убедитесь, что маркер хорошо освещен и находится на ровной поверхности</li>
                <li>Запустите AR-режим и наведите камеру на маркер</li>
                <li>Держите камеру на расстоянии 20-40 см от маркера</li>
                <li>Дождитесь появления 3D-модели исторического объекта</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Markers Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* HIRO Marker */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:break-inside-avoid">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <h2 className="mb-2">HIRO Маркер</h2>
              <p className="text-white/90 text-sm">
                Используется для: Колизей, Парфенон, Мачу-Пикчу
              </p>
            </div>

            {/* Marker Image Placeholder */}
            <div className="p-8 bg-white">
              <div className="aspect-square bg-white border-8 border-black rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-48 h-48 border-4 border-black flex items-center justify-center mx-auto mb-4">
                    <div className="w-40 h-40 bg-black flex items-center justify-center">
                      <div className="w-32 h-32 bg-white flex items-center justify-center">
                        <div className="text-4xl font-bold text-black">H</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Классический HIRO маркер</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-100 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Печать
                </button>
                <button
                  onClick={() => handleDownload('HIRO')}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Скачать PDF
                </button>
              </div>
            </div>
          </div>

          {/* KANJI Marker */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:break-inside-avoid">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <h2 className="mb-2">KANJI Маркер</h2>
              <p className="text-white/90 text-sm">
                Используется для: Пирамида Хеопса, Стоунхендж, Великая стена
              </p>
            </div>

            {/* Marker Image Placeholder */}
            <div className="p-8 bg-white">
              <div className="aspect-square bg-white border-8 border-black rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-48 h-48 border-4 border-black flex items-center justify-center mx-auto mb-4">
                    <div className="w-40 h-40 bg-black flex items-center justify-center">
                      <div className="w-32 h-32 bg-white flex items-center justify-center">
                        <div className="text-6xl font-bold text-black">漢</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Японский KANJI маркер</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Печать
                </button>
                <button
                  onClick={() => handleDownload('KANJI')}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Скачать PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-8 shadow-lg print:hidden">
          <h3 className="text-gray-900 mb-4">Важная информация</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="text-gray-900 mb-2">Требования к печати:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Используйте белую бумагу формата A4</li>
                <li>Черно-белая печать высокого качества</li>
                <li>Без масштабирования (100%)</li>
                <li>Избегайте бликов на маркере</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">Рекомендации:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Размещайте маркер на ровной поверхности</li>
                <li>Обеспечьте хорошее освещение</li>
                <li>Избегайте теней на маркере</li>
                <li>Расстояние до камеры: 20-40 см</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
