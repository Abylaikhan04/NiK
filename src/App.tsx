import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { ARScene } from './components/ARScene';
import { ObjectGallery } from './components/ObjectGallery';
import { InfoPanel } from './components/InfoPanel';
import { ARMarkers } from './components/ARMarkers';
import { Timeline } from './components/Timeline';
import { Quiz } from './components/Quiz';
import { About } from './components/About';
import { DemoMode } from './components/DemoMode';
import { AchievementsPage } from './components/AchievementsPage';
import { WorldMap } from './components/WorldMap';
import { SearchAndFilter } from './components/SearchAndFilter';
import { CompareObjects } from './components/CompareObjects';
import { LearningMode } from './components/LearningMode';
import { historicalObjects, HistoricalObject } from './data/historical-objects';
import { UserProgress, defaultProgress } from './data/achievements';
import { BookOpen, Camera, Home, QrCode, Clock, Brain, Info, Presentation, Trophy, Globe, Search, Scale, GraduationCap } from 'lucide-react';

type Screen = 'start' | 'gallery' | 'ar' | 'markers' | 'timeline' | 'quiz' | 'about' | 'demo' | 'achievements' | 'map' | 'search' | 'compare' | 'learning';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedObject, setSelectedObject] = useState<HistoricalObject | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('webar_user_progress');
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('webar_user_progress', JSON.stringify(userProgress));
    } catch {}
  }, [userProgress]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setUserProgress(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check and unlock achievements
  useEffect(() => {
    const newAchievements = [...userProgress.achievements];

    // First view
    if (userProgress.viewedObjects.length >= 1 && !newAchievements.includes('first_view')) {
      newAchievements.push('first_view');
    }

    // Explorer
    if (userProgress.viewedObjects.length >= 3 && !newAchievements.includes('explorer')) {
      newAchievements.push('explorer');
    }

    // Historian
    if (userProgress.viewedObjects.length === historicalObjects.length && !newAchievements.includes('historian')) {
      newAchievements.push('historian');
    }

    // AR beginner
    if (userProgress.arSessionsCount >= 1 && !newAchievements.includes('ar_beginner')) {
      newAchievements.push('ar_beginner');
    }

    // Time based
    if (userProgress.timeSpent >= 600 && !newAchievements.includes('dedicated_student')) {
      newAchievements.push('dedicated_student');
    }

    if (newAchievements.length !== userProgress.achievements.length) {
      setUserProgress(prev => ({ ...prev, achievements: newAchievements }));
    }
  }, [userProgress.viewedObjects.length, userProgress.arSessionsCount, userProgress.timeSpent, userProgress.achievements]);

  const handleStart = () => {
    setCurrentScreen('gallery');
  };

  const handleStartAR = () => {
    setCurrentScreen('ar');
    setUserProgress(prev => ({
      ...prev,
      arSessionsCount: prev.arSessionsCount + 1
    }));
  };

  const handleBackToGallery = () => {
    setCurrentScreen('gallery');
  };

  const handleBackToStart = () => {
    setCurrentScreen('start');
    setSelectedObject(null);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    setUserProgress(prev => {
      const newAchievements = [...prev.achievements];
      if (percentage === 100 && !newAchievements.includes('quiz_master')) {
        newAchievements.push('quiz_master');
      }
      if (percentage >= 80 && !newAchievements.includes('quick_learner')) {
        newAchievements.push('quick_learner');
      }
      return {
        ...prev,
        completedQuizzes: prev.completedQuizzes + 1,
        bestQuizScore: Math.max(prev.bestQuizScore, percentage),
        achievements: newAchievements,
      };
    });
  };

  const handleSelectObject = (object: HistoricalObject) => {
    setSelectedObject(object);
    if (!userProgress.viewedObjects.includes(object.id)) {
      setUserProgress(prev => ({
        ...prev,
        viewedObjects: [...prev.viewedObjects, object.id]
      }));
    }
  };

  if (currentScreen === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (currentScreen === 'ar') {
    return <ARScene onBack={handleBackToGallery} />;
  }

  if (currentScreen === 'markers') {
    return (
      <div>
        <ARMarkers />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'timeline') {
    return (
      <div>
        <Timeline />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    return (
      <div>
        <Quiz onComplete={handleQuizComplete} />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'about') {
    return (
      <div>
        <About />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'demo') {
    return (
      <div>
        <DemoMode />
        <button
          onClick={handleBackToGallery}
          className="fixed top-4 left-4 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl hover:bg-white/30 transition-all flex items-center gap-2 z-50"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'achievements') {
    return (
      <div>
        <AchievementsPage progress={userProgress} />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'map') {
    return (
      <div>
        <WorldMap />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'search') {
    return (
      <div>
        <SearchAndFilter onSelectObject={handleSelectObject} />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
        {selectedObject && (
          <InfoPanel
            object={selectedObject}
            onClose={() => setSelectedObject(null)}
          />
        )}
      </div>
    );
  }

  if (currentScreen === 'compare') {
    return (
      <div>
        <CompareObjects />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'learning') {
    return (
      <div>
        <LearningMode />
        <button
          onClick={handleBackToGallery}
          className="fixed bottom-8 left-8 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </div>
    );
  }

  if (currentScreen === 'gallery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-gray-900">WebAR История</h1>
                  <p className="text-sm text-gray-600">Галерея исторических объектов</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                
                <button
                  onClick={handleStartAR}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <Camera className="w-5 h-5" />
                  Запустить AR
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="mb-3">Исследуйте историю в дополненной реальности</h2>
            <p className="text-white/90 mb-6 max-w-3xl">
              Выберите исторический объект из галереи, затем запустите AR-режим и наведите камеру на соответствующий маркер, 
              чтобы увидеть 3D-визуализацию и получить подробную информацию.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">Работает в браузере</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">Поддержка AR-маркеров</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">Образовательный контент</span>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setCurrentScreen('demo')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Presentation className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Демо-режим</h3>
              <p className="text-sm text-gray-600">
                Просмотр AR без камеры
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('markers')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-2">AR-маркеры</h3>
              <p className="text-sm text-gray-600">
                Скачать и распечатать
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('timeline')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Таймлайн</h3>
              <p className="text-sm text-gray-600">
                Хронология истории
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('quiz')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Тест</h3>
              <p className="text-sm text-gray-600">
                Проверьте знания
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('achievements')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Достижения</h3>
              <p className="text-sm text-gray-600">
                Просмотрите свои достижения
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('map')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Карта мира</h3>
              <p className="text-sm text-gray-600">
                Просмотрите исторические объекты на карте
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('search')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Поиск и фильтр</h3>
              <p className="text-sm text-gray-600">
                Найдите объекты по ключевым словам
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('compare')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Сравнение объектов</h3>
              <p className="text-sm text-gray-600">
                Сравните различные исторические объекты
              </p>
            </button>

            <button
              onClick={() => setCurrentScreen('learning')}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Образовательный режим</h3>
              <p className="text-sm text-gray-600">
                Изучайте историю в интерактивном режиме
              </p>
            </button>
          </div>

          {/* Gallery */}
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Доступные объекты</h2>
            <p className="text-gray-600">
              Нажмите на объект, чтобы узнать больше, или запустите AR-режим для полного опыта
            </p>
          </div>

          <ObjectGallery
            objects={historicalObjects}
            onSelectObject={handleSelectObject}
          />

          {/* AR Markers Info */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-gray-900 mb-4">AR-маркеры для распознавания</h2>
            <p className="text-gray-600 mb-6">
              Распечатайте или откройте на другом устройстве следующие AR-маркеры:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-xl p-6 text-center">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-32 h-32 border-4 border-black mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">HIRO Маркер</p>
                  </div>
                </div>
                <h3 className="text-gray-900 mb-2">HIRO</h3>
                <p className="text-sm text-gray-600">
                  Используется для: Колизей, Парфенон
                </p>
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-center">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-32 h-32 border-4 border-black mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">漢</span>
                    </div>
                    <p className="text-sm text-gray-600">KANJI Маркер</p>
                  </div>
                </div>
                <h3 className="text-gray-900 mb-2">KANJI</h3>
                <p className="text-sm text-gray-600">
                  Используется для: Пирамида Хеопса
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-900">WebAR Система для Исторического Образования</p>
                <p className="text-sm text-gray-600 mt-1">
                  Дипломный проект - 2025
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('about')}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Info className="w-5 h-5" />
                О проекте
              </button>
            </div>
          </div>
        </footer>

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

  return null;
}