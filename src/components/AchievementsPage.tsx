import { Trophy, Star, Lock } from 'lucide-react';
import { achievements, UserProgress } from '../data/achievements';

interface AchievementsPageProps {
  progress: UserProgress;
}

export function AchievementsPage({ progress }: AchievementsPageProps) {
  const unlockedCount = progress.achievements.length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  const checkAchievement = (achievementId: string) => {
    return progress.achievements.includes(achievementId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">Достижения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Отслеживайте свой прогресс и получайте награды за изучение истории
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">Ваш прогресс</h2>
              <p className="text-gray-600">
                Открыто {unlockedCount} из {totalCount} достижений
              </p>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {Math.round(progressPercent)}%
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {progress.viewedObjects.length}
            </div>
            <p className="text-sm text-gray-600">Объектов изучено</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">
              {progress.completedQuizzes}
            </div>
            <p className="text-sm text-gray-600">Тестов пройдено</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {progress.bestQuizScore}%
            </div>
            <p className="text-sm text-gray-600">Лучший результат</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {progress.arSessionsCount}
            </div>
            <p className="text-sm text-gray-600">AR-сессий</p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="space-y-4">
          <h2 className="text-gray-900">Все достижения</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const isUnlocked = checkAchievement(achievement.id);
              
              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg transition-all ${
                    isUnlocked
                      ? 'border-2 border-purple-300 shadow-purple-100'
                      : 'opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`text-5xl ${isUnlocked ? '' : 'opacity-40'}`}>
                      {isUnlocked ? achievement.icon : '🔒'}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{achievement.title}</h3>
                        {isUnlocked && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        )}
                        {!isUnlocked && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      
                      {isUnlocked ? (
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          ✓ Открыто
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                          Заблокировано
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Message */}
        {progressPercent < 100 && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h3 className="mb-2">Продолжайте исследовать!</h3>
            <p className="text-white/90">
              У вас осталось {totalCount - unlockedCount} достижений. 
              Изучайте объекты, проходите тесты и открывайте новые награды!
            </p>
          </div>
        )}

        {progressPercent === 100 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="mb-2">Поздравляем!</h3>
            <p className="text-white/90">
              Вы открыли все достижения! Вы настоящий мастер истории!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
