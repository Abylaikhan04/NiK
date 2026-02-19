import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Brain } from 'lucide-react';
import { quizQuestions } from '../data/quiz-data';
import { historicalObjects } from '../data/historical-objects';

interface QuizProps {
  onComplete?: (score: number, total: number) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete?.(score, quizQuestions.length);
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const relatedObject = historicalObjects.find(obj => obj.id === question.objectId);

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-gray-900 mb-3">Тест завершен!</h2>
            
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {percentage}%
            </div>
            
            <p className="text-xl text-gray-700 mb-8">
              Правильных ответов: {score} из {quizQuestions.length}
            </p>

            {percentage >= 80 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800">
                  Отлично! Вы прекрасно знаете историю!
                </p>
              </div>
            )}

            {percentage >= 50 && percentage < 80 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-yellow-800">
                  Хороший результат! Продолжайте изучать историю!
                </p>
              </div>
            )}

            {percentage < 50 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800">
                  Попробуйте ещё раз! Изучите материалы в галерее.
                </p>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Пройти заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Тест по истории</h1>
          <p className="text-gray-600">
            Проверьте свои знания об исторических объектах
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">
                Вопрос {currentQuestion + 1} из {quizQuestions.length}
              </span>
              <span className="text-sm text-white/80">
                Счет: {score}/{currentQuestion + 1}
              </span>
            </div>
            {relatedObject && (
              <div className="text-sm text-white/90 mb-2">
                Тема: {relatedObject.name}
              </div>
            )}
          </div>

          {/* Question Content */}
          <div className="p-8">
            <h3 className="text-gray-900 mb-6">{question.question}</h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
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

            {/* Explanation */}
            {selectedAnswer !== null && (
              <div className={`p-4 rounded-xl mb-6 ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-blue-50 border-2 border-blue-200'
              }`}>
                <p className={`text-sm ${
                  selectedAnswer === question.correctAnswer
                    ? 'text-green-800'
                    : 'text-blue-800'
                }`}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                {isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'}
              </button>
            )}
          </div>
        </div>

        {/* Related Object Card */}
        {relatedObject && relatedObject.imageUrl && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={relatedObject.imageUrl}
                alt={relatedObject.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-gray-900 mb-2">{relatedObject.name}</h4>
              <p className="text-sm text-gray-600">
                {relatedObject.period} • {relatedObject.date}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
