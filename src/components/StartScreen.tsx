import { Camera, Info, Smartphone, QrCode, Trophy, Globe, Brain, GraduationCap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Camera className="w-10 h-10" />
          </div>
          <h1 className="mb-4">WebAR Система для Исторического Образования</h1>
          <p className="text-lg text-white/80">
            Оживите историю с помощью дополненной реальности
          </p>
        </div>

        {/* Instructions */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <h2 className="mb-6 flex items-center gap-2">
            <Info className="w-6 h-6" />
            Как использовать систему
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="mb-2">Разрешите доступ к камере</h3>
                <p className="text-white/70">
                  При запуске система запросит доступ к камере вашего устройства
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="mb-2">Подготовьте AR-маркер</h3>
                <p className="text-white/70">
                  Распечатайте или откройте на другом устройстве AR-маркер (HIRO или KANJI)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="mb-2">Наведите камеру на маркер</h3>
                <p className="text-white/70">
                  Держите камеру над маркером и дождитесь появления 3D-модели
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="mb-2">Изучайте историю</h3>
                <p className="text-white/70">
                  Читайте информацию об историческом объекте и наслаждайтесь 3D-визуализацией
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features - Extended */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Smartphone className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Работает в браузере
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <QrCode className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              AR-маркеры
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Достижения
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Globe className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Карта мира
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Brain className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Тесты
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <GraduationCap className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Обучение
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Info className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              6 объектов
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <Camera className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-white/90">
              Демо-режим
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 rounded-full transition-all transform hover:scale-105 shadow-xl"
        >
          Начать изучение
        </button>

        {/* Info Note */}
        <p className="text-sm text-white/60 mt-8 text-center max-w-2xl">
          Для лучшего опыта используйте смартфон или планшет. 
          Система включает 6 исторических объектов, интерактивные тесты, достижения и многое другое!
        </p>
      </div>
    </div>
  );
}