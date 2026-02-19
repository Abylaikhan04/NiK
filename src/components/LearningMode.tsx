import { useState } from 'react';
import { GraduationCap, CheckCircle, XCircle, Award } from 'lucide-react';
import { historicalObjects } from '../data/historical-objects';

interface Task {
  id: string;
  objectId: string;
  title: string;
  description: string;
  type: 'question' | 'find' | 'match';
  question?: string;
  answer?: string;
  options?: string[];
  correctAnswer?: number | string;
}

const learningTasks: Task[] = [
  {
    id: 't1',
    objectId: 'colosseum',
    title: 'Изучите Колизей',
    description: 'Прочитайте информацию о Колизее и ответьте на вопрос',
    type: 'question',
    question: 'В каком году был открыт Колизей?',
    options: ['70 н.э.', '80 н.э.', '90 н.э.', '100 н.э.'],
    correctAnswer: 1
  },
  {
    id: 't2',
    objectId: 'pyramid',
    title: 'Исследуйте Пирамиду',
    description: 'Найдите информацию о строительстве Великой пирамиды',
    type: 'question',
    question: 'Из скольких каменных блоков состоит Пирамида Хеопса?',
    options: ['1 миллион', '2,3 миллиона', '5 миллионов', '10 миллионов'],
    correctAnswer: 1
  },
  {
    id: 't3',
    objectId: 'parthenon',
    title: 'Узнайте о Парфеноне',
    description: 'Изучите историю древнегреческого храма',
    type: 'question',
    question: 'Какой богине посвящен Парфенон?',
    options: ['Гера', 'Афродита', 'Артемида', 'Афина'],
    correctAnswer: 3
  },
  {
    id: 't4',
    objectId: 'stonehenge',
    title: 'Разгадайте Стоунхендж',
    description: 'Исследуйте загадочное мегалитическое сооружение',
    type: 'question',
    question: 'Сколько весят самые крупные камни Стоунхенджа?',
    options: ['До 10 тонн', 'До 15 тонн', 'До 25 тонн', 'До 50 тонн'],
    correctAnswer: 2
  }
];

export function LearningMode() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentTask = learningTasks[currentTaskIndex];
  const relatedObject = historicalObjects.find(obj => obj.id === currentTask.objectId);
  const progress = (completedTasks.length / learningTasks.length) * 100;
  const isLastTask = currentTaskIndex === learningTasks.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    if (answerIndex === currentTask.correctAnswer) {
      if (!completedTasks.includes(currentTask.id)) {
        setCompletedTasks([...completedTasks, currentTask.id]);
      }
    }
  };

  const handleNext = () => {
    if (isLastTask) {
      setShowResult(true);
    } else {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentTaskIndex(0);
    setSelectedAnswer(null);
    setCompletedTasks([]);
    setShowResult(false);
  };

  if (showResult) {
    const score = Math.round((completedTasks.length / learningTasks.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-gray-900 mb-3">Обучение завершено!</h2>

            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {score}%
            </div>

            <p className="text-xl text-gray-700 mb-8">
              Выполнено заданий: {completedTasks.length} из {learningTasks.length}
            </p>

            {score === 100 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800">
                  🎉 Превосходно! Вы справились со всеми заданиями!
                </p>
              </div>
            )}

            {score >= 75 && score < 100 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-yellow-800">
                  Отличная работа! Попробуйте еще раз для идеального результата.
                </p>
              </div>
            )}

            {score < 75 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800">
                  Продолжайте изучать материал и попробуйте снова!
                </p>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Режим обучения</h1>
          <p className="text-gray-600">
            Изучайте объекты и выполняйте задания
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Task Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">
                Задание {currentTaskIndex + 1} из {learningTasks.length}
              </span>
              <span className="text-sm text-white/80">
                Выполнено: {completedTasks.length}
              </span>
            </div>
            <h2 className="mb-2">{currentTask.title}</h2>
            <p className="text-white/90 text-sm">{currentTask.description}</p>
          </div>

          <div className="p-8">
            {/* Related Object Info */}
            {relatedObject && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <div className="flex gap-6">
                  <img
                    src={relatedObject.imageUrl}
                    alt={relatedObject.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-gray-900 mb-2">{relatedObject.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{relatedObject.period}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {relatedObject.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question */}
            <h3 className="text-gray-900 mb-6">{currentTask.question}</h3>

            {/* Answer Options */}
            {currentTask.options && (
              <div className="space-y-3 mb-8">
                {currentTask.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentTask.correctAnswer;
                  const showCorrect = selectedAnswer !== null && isCorrect;
                  const showIncorrect = selectedAnswer === index && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        showCorrect
                          ? 'bg-green-50 border-green-500'
                          : showIncorrect
                          ? 'bg-red-50 border-red-500'
                          : isSelected
                          ? 'bg-purple-50 border-purple-500'
                          : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option}</span>
                        {showCorrect && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                {isLastTask ? 'Завершить обучение' : 'Следующее задание'}
              </button>
            )}
          </div>
        </div>

        {/* Additional Facts */}
        {relatedObject && selectedAnswer !== null && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-900 mb-4">Интересные факты:</h3>
            <ul className="space-y-3">
              {relatedObject.facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
