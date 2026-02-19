import { Lightbulb, Target, Layers, Code, Camera, BookOpen } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-3">О проекте</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            WebAR-система для повышения эффективности исторического образования
          </p>
        </div>

        {/* Main Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-gray-900 mb-4">Описание проекта</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Данный проект представляет собой <strong>WebAR-систему</strong>, предназначенную для изучения 
            исторических объектов и событий с использованием технологий дополненной реальности (Augmented Reality), 
            работающей непосредственно в веб-браузере.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Система позволяет пользователю навести камеру устройства на специальный маркер и получить 
            визуализацию исторического объекта в 3D-формате, а также сопутствующую образовательную информацию.
          </p>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-purple-600" />
            <h2 className="text-gray-900">Цель и задачи проекта</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Цель проекта:</h3>
            <p className="text-gray-700 leading-relaxed">
              Разработка WebAR-системы для повышения вовлечённости и качества восприятия исторического 
              материала за счёт визуализации объектов прошлого.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 mb-3">Задачи проекта:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Визуализировать исторические объекты в дополненной реальности</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Обеспечить простое и доступное использование через браузер</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Объединить 3D-модели и историческую информацию</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Создать систему, не требующую установки приложений и серверной части</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-8 h-8 text-purple-600" />
            <h2 className="text-gray-900">Структура проекта</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-gray-900 mb-2">1. Пользовательский интерфейс (Presentation Layer)</h3>
              <p className="text-gray-600 text-sm">
                Отвечает за взаимодействие пользователя с системой: стартовый экран, AR-экран с камерой, 
                информационные панели поверх AR-сцены.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-gray-900 mb-2">2. Логика дополненной реальности (AR Logic Layer)</h3>
              <p className="text-gray-600 text-sm">
                Реализует процессы дополненной реальности: обработка видеопотока, распознавание маркера, 
                привязка виртуального объекта к реальному пространству.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-gray-900 mb-2">3. Образовательный контент (Educational Content Layer)</h3>
              <p className="text-gray-600 text-sm">
                Содержит 3D-модели исторических объектов, текстовую информацию, даты, события, 
                краткие пояснения для поддержки учебного процесса.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-purple-600" />
            <h2 className="text-gray-900">Используемые технологии</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  React + TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Lucide React (иконки)
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3">AR Technologies</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  WebRTC (доступ к камере)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  AR.js (распознавание маркеров)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Three.js (3D-визуализация)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-8 h-8 text-purple-600" />
            <h2 className="text-gray-900">Функциональные возможности</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-gray-900 mb-2">AR-режим</h4>
              <p className="text-sm text-gray-600">
                Распознавание маркеров и отображение 3D-объектов
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Галерея объектов</h4>
              <p className="text-sm text-gray-600">
                Каталог исторических объектов с подробной информацией
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Образовательные тесты</h4>
              <p className="text-sm text-gray-600">
                Проверка знаний и закрепление материала
              </p>
            </div>
          </div>
        </div>

        {/* Educational Value */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="mb-4">Педагогическая значимость</h2>
          <div className="space-y-3 text-white/90">
            <p>
              ✓ Упрощение восприятия сложных исторических тем
            </p>
            <p>
              ✓ Повышение интереса к изучению истории через визуальный опыт
            </p>
            <p>
              ✓ Возможность "увидеть" исторические объекты в реальном масштабе
            </p>
            <p>
              ✓ Интерактивное обучение с немедленной обратной связью
            </p>
            <p>
              ✓ Доступность для образовательных учреждений без дополнительных затрат
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
