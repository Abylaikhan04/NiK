export interface QuizQuestion {
  id: string;
  objectId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    objectId: 'colosseum',
    question: 'При каком императоре был открыт Колизей?',
    options: ['Веспасиан', 'Тит', 'Нерон', 'Траян'],
    correctAnswer: 1,
    explanation: 'Колизей был открыт императором Титом в 80 году н.э., хотя строительство началось при его отце Веспасиане.'
  },
  {
    id: 'q2',
    objectId: 'colosseum',
    question: 'Сколько зрителей мог вместить Колизей?',
    options: ['30 000', '40 000', '50 000', '60 000'],
    correctAnswer: 2,
    explanation: 'Колизей мог вместить до 50 000 зрителей одновременно.'
  },
  {
    id: 'q3',
    objectId: 'pyramid',
    question: 'Сколько каменных блоков использовано в Пирамиде Хеопса?',
    options: ['1 миллион', '2,3 миллиона', '5 миллионов', '10 миллионов'],
    correctAnswer: 1,
    explanation: 'Пирамида Хеопса состоит примерно из 2,3 миллионов каменных блоков.'
  },
  {
    id: 'q4',
    objectId: 'pyramid',
    question: 'Сколько лет строилась Пирамида Хеопса?',
    options: ['10 лет', '20 лет', '30 лет', '40 лет'],
    correctAnswer: 1,
    explanation: 'Строительство Пирамиды Хеопса заняло около 20 лет.'
  },
  {
    id: 'q5',
    objectId: 'parthenon',
    question: 'Какой богине посвящен Парфенон?',
    options: ['Гера', 'Афродита', 'Артемида', 'Афина'],
    correctAnswer: 3,
    explanation: 'Парфенон - это храм богини Афины, покровительницы города Афины.'
  },
  {
    id: 'q6',
    objectId: 'parthenon',
    question: 'Кто заказал строительство Парфенона?',
    options: ['Перикл', 'Солон', 'Фемистокл', 'Александр Македонский'],
    correctAnswer: 0,
    explanation: 'Парфенон был построен по заказу Перикла, выдающегося афинского государственного деятеля.'
  }
];
