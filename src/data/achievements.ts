export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first_view',
    title: 'Первый контакт',
    description: 'Просмотрите свой первый исторический объект',
    icon: '🔍',
    condition: 'view_1_objects',
    unlocked: false
  },
  {
    id: 'explorer',
    title: 'Исследователь',
    description: 'Изучите 3 исторических объекта',
    icon: '🗺️',
    condition: 'view_3_objects',
    unlocked: false
  },
  {
    id: 'historian',
    title: 'Историк',
    description: 'Изучите все исторические объекты',
    icon: '📚',
    condition: 'view_all_objects',
    unlocked: false
  },
  {
    id: 'ar_beginner',
    title: 'AR-новичок',
    description: 'Запустите AR-режим впервые',
    icon: '📷',
    condition: 'use_ar',
    unlocked: false
  },
  {
    id: 'quiz_master',
    title: 'Мастер викторин',
    description: 'Наберите 100% в тесте',
    icon: '🏆',
    condition: 'quiz_perfect',
    unlocked: false
  },
  {
    id: 'quick_learner',
    title: 'Быстрый ученик',
    description: 'Пройдите тест с результатом 80%+',
    icon: '⚡',
    condition: 'quiz_80_percent',
    unlocked: false
  },
  {
    id: 'time_traveler',
    title: 'Путешественник во времени',
    description: 'Просмотрите временную шкалу',
    icon: '⏰',
    condition: 'view_timeline',
    unlocked: false
  },
  {
    id: 'marker_collector',
    title: 'Коллекционер маркеров',
    description: 'Просмотрите страницу с AR-маркерами',
    icon: '🎯',
    condition: 'view_markers',
    unlocked: false
  },
  {
    id: 'demo_viewer',
    title: 'Демонстратор',
    description: 'Попробуйте демо-режим',
    icon: '🎬',
    condition: 'view_demo',
    unlocked: false
  },
  {
    id: 'dedicated_student',
    title: 'Прилежный ученик',
    description: 'Проведите в приложении 10 минут',
    icon: '⭐',
    condition: 'time_10_minutes',
    unlocked: false
  }
];

export interface UserProgress {
  viewedObjects: string[];
  completedQuizzes: number;
  bestQuizScore: number;
  arSessionsCount: number;
  timeSpent: number;
  achievements: string[];
  favorites: string[];
}

export const defaultProgress: UserProgress = {
  viewedObjects: [],
  completedQuizzes: 0,
  bestQuizScore: 0,
  arSessionsCount: 0,
  timeSpent: 0,
  achievements: [],
  favorites: []
};
