import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // General UI
      toggleTheme: 'Toggle theme',
      language: 'Language',
      languages: {
        en: 'English',
        ru: 'Русский',
        kk: 'Қазақша',
      },
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      required: 'Required',
      optional: 'Optional',
      progressLabel: 'Section {{current}} of {{total}}',

      // Section titles
      sections: {
        about: 'About You',
        landing: 'Landing Page',
        onboarding: 'Onboarding',
        aiChat: 'AI Chat',
        interface: 'Interface',
        deploy: 'Deployment',
        value: 'Value Proposition',
        overall: 'Overall Assessment',
      },

      // Section 1: About You (Q1-Q4)
      q1: {
        label: 'What is your role?',
        options: {
          developer: 'Developer',
          designer: 'Designer',
          pm: 'Product Manager',
          founder: 'Founder / Entrepreneur',
          student: 'Student',
          other: 'Other',
        },
      },
      q2: {
        label: 'What is your technical experience level?',
        options: {
          beginner: 'Beginner (0-1 years)',
          junior: 'Junior (1-3 years)',
          middle: 'Middle (3-5 years)',
          senior: 'Senior (5-10 years)',
          expert: 'Expert (10+ years)',
        },
      },
      q3: {
        label: 'How did you hear about Strayl?',
        options: {
          social: 'Social media',
          friend: 'Friend / Colleague',
          search: 'Search engine',
          article: 'Blog / Article',
          ad: 'Advertisement',
          other: 'Other',
        },
      },
      q4: {
        label: 'Have you used similar AI app builders before?',
        options: {
          yes: 'Yes, I have experience',
          no: 'No, first time',
        },
      },
      q4b: {
        label: 'Which ones have you used?',
        placeholder: 'e.g. Bolt, v0, Lovable, Cursor...',
      },

      // Section 2: Landing Page (Q5-Q8)
      q5: {
        label: 'How clear is the value proposition on the landing page?',
        scaleMin: 'Not clear at all',
        scaleMax: 'Very clear',
      },
      q6: {
        label: 'What was your first impression of the landing page?',
        options: {
          very_positive: 'Very positive',
          positive: 'Positive',
          neutral: 'Neutral',
          negative: 'Negative',
          very_negative: 'Very negative',
        },
      },
      q7: {
        label: 'Did the landing page motivate you to try the product?',
        options: {
          yes: 'Yes, definitely',
          somewhat: 'Somewhat',
          no: 'Not really',
        },
      },
      q8: {
        label: 'What would you improve on the landing page?',
        placeholder: 'Your suggestions...',
      },

      // Section 3: Onboarding (Q9-Q11)
      q9: {
        label: 'How easy was the registration / sign-up process?',
        scaleMin: 'Very difficult',
        scaleMax: 'Very easy',
      },
      q10: {
        label: 'Was the onboarding flow clear and intuitive?',
        scaleMin: 'Not at all',
        scaleMax: 'Absolutely',
      },
      q11: {
        label: 'What would you improve in the onboarding process?',
        placeholder: 'Your suggestions...',
      },

      // Section 4: AI Chat (Q12-Q18)
      q12: {
        label: 'How well did the AI understand your requests?',
        scaleMin: 'Poorly',
        scaleMax: 'Perfectly',
      },
      q13: {
        label: 'How satisfied are you with the quality of generated code?',
        scaleMin: 'Not satisfied',
        scaleMax: 'Very satisfied',
      },
      q14: {
        label: 'How fast did the AI respond to your requests?',
        options: {
          very_fast: 'Very fast',
          fast: 'Fast enough',
          acceptable: 'Acceptable',
          slow: 'Slow',
          very_slow: 'Very slow',
        },
      },
      q15: {
        label: 'Did the AI make errors that required correction?',
        options: {
          never: 'Never',
          rarely: 'Rarely',
          sometimes: 'Sometimes',
          often: 'Often',
          always: 'Almost always',
        },
      },
      q16: {
        label: 'Did you try using different AI models?',
        options: {
          yes: 'Yes, I tried',
          no: 'No, I used the default',
          didnt_know: "I didn't know that was possible",
        },
      },
      q16b: {
        label: 'Which model worked best for you?',
        placeholder: 'e.g. Claude, GPT-4...',
      },
      q17: {
        label: 'Did you use file editing features (code editor)?',
        options: {
          yes: 'Yes',
          no: 'No',
        },
      },
      q17b: {
        label: 'How convenient was the code editor?',
        scaleMin: 'Inconvenient',
        scaleMax: 'Very convenient',
      },
      q18: {
        label: 'What would you improve in the AI chat?',
        placeholder: 'Your suggestions...',
      },

      // Section 5: Interface (Q19-Q23)
      q19: {
        label: 'How intuitive is the overall interface?',
        scaleMin: 'Not intuitive',
        scaleMax: 'Very intuitive',
      },
      q20: {
        label: 'How do you rate the visual design?',
        scaleMin: 'Poor',
        scaleMax: 'Excellent',
      },
      q21: {
        label: 'Did you encounter any bugs or glitches?',
        options: {
          none: 'No bugs at all',
          minor: 'Minor bugs',
          moderate: 'Some noticeable bugs',
          major: 'Major bugs',
          critical: 'Critical bugs that blocked work',
        },
      },
      q22: {
        label: 'Which features did you find most useful?',
        options: {
          ai_chat: 'AI Chat',
          code_editor: 'Code Editor',
          preview: 'Live Preview',
          deploy: 'One-click Deploy',
          file_tree: 'File Tree',
          version_history: 'Version History',
        },
      },
      q23: {
        label: 'What features are you missing?',
        placeholder: 'Features you would like to see...',
      },

      // Section 6: Deployment (Q24-Q26)
      q24: {
        label: 'Were you able to deploy your project?',
        options: {
          yes_easy: 'Yes, it was easy',
          yes_hard: 'Yes, but with difficulties',
          no: 'No, I couldn\'t',
          didnt_try: 'I didn\'t try',
        },
      },
      q24b: {
        label: 'What difficulties did you encounter during deployment?',
        placeholder: 'Describe the issues...',
      },
      q25: {
        label: 'How fast was the deployment process?',
        options: {
          very_fast: 'Very fast (< 1 min)',
          fast: 'Fast (1-3 min)',
          acceptable: 'Acceptable (3-5 min)',
          slow: 'Slow (> 5 min)',
          na: 'N/A',
        },
      },
      q26: {
        label: 'How satisfied are you with the deployed result?',
        scaleMin: 'Not satisfied',
        scaleMax: 'Very satisfied',
      },

      // Section 7: Value Proposition (Q27-Q30)
      q27: {
        label: 'Does Strayl save you time compared to traditional development?',
        options: {
          significantly: 'Significantly',
          somewhat: 'Somewhat',
          same: 'About the same',
          slower: 'Actually slower',
          cant_tell: 'Hard to tell',
        },
      },
      q28: {
        label: 'Would you use Strayl for a real project?',
        options: {
          definitely: 'Definitely yes',
          probably: 'Probably yes',
          maybe: 'Maybe',
          probably_not: 'Probably not',
          no: 'Definitely not',
        },
      },
      q29: {
        label: 'How much would you be willing to pay monthly for Strayl?',
        options: {
          free: 'Only free tier',
          ten: '$5-10',
          twenty: '$10-20',
          fifty: '$20-50',
          more: 'More than $50',
        },
      },
      q30: {
        label: 'Who would you recommend Strayl to?',
        options: {
          developers: 'Developers',
          non_tech: 'Non-technical people',
          startups: 'Startup founders',
          students: 'Students',
          agencies: 'Agencies',
          nobody: 'I wouldn\'t recommend it',
        },
      },

      // Section 8: Overall Assessment (Q31-Q35)
      q31: {
        label: 'Overall, how satisfied are you with Strayl?',
        scaleMin: 'Very dissatisfied',
        scaleMax: 'Very satisfied',
      },
      q32: {
        label: 'How likely are you to recommend Strayl to a friend or colleague? (NPS)',
        scaleMin: 'Not at all likely',
        scaleMax: 'Extremely likely',
      },
      q33: {
        label: 'What did you like most about Strayl?',
        placeholder: 'Tell us what impressed you...',
      },
      q34: {
        label: 'What did you dislike or find frustrating?',
        placeholder: 'Tell us what needs improvement...',
      },
      q35: {
        label: 'Any additional comments or suggestions?',
        placeholder: 'Anything else you want to share...',
      },

      // Thank you screen
      thankYou: {
        title: 'Thank you!',
        message: 'Your feedback is invaluable. It will help us make Strayl better for everyone.',
        subtitle: 'We appreciate your time and effort.',
      },
    },
  },
  ru: {
    translation: {
      toggleTheme: 'Сменить тему',
      language: 'Язык',
      languages: {
        en: 'English',
        ru: 'Русский',
        kk: 'Қазақша',
      },
      next: 'Далее',
      back: 'Назад',
      submit: 'Отправить',
      required: 'Обязательное',
      optional: 'Необязательное',
      progressLabel: 'Секция {{current}} из {{total}}',

      sections: {
        about: 'О вас',
        landing: 'Лендинг',
        onboarding: 'Онбординг',
        aiChat: 'AI-чат',
        interface: 'Интерфейс',
        deploy: 'Деплой',
        value: 'Ценность',
        overall: 'Общая оценка',
      },

      q1: {
        label: 'Какова ваша роль?',
        options: {
          developer: 'Разработчик',
          designer: 'Дизайнер',
          pm: 'Продакт-менеджер',
          founder: 'Основатель / Предприниматель',
          student: 'Студент',
          other: 'Другое',
        },
      },
      q2: {
        label: 'Какой у вас уровень технического опыта?',
        options: {
          beginner: 'Новичок (0-1 год)',
          junior: 'Джуниор (1-3 года)',
          middle: 'Мидл (3-5 лет)',
          senior: 'Сеньор (5-10 лет)',
          expert: 'Эксперт (10+ лет)',
        },
      },
      q3: {
        label: 'Как вы узнали о Strayl?',
        options: {
          social: 'Соцсети',
          friend: 'Друг / Коллега',
          search: 'Поисковик',
          article: 'Блог / Статья',
          ad: 'Реклама',
          other: 'Другое',
        },
      },
      q4: {
        label: 'Пользовались ли вы подобными AI-конструкторами раньше?',
        options: {
          yes: 'Да, есть опыт',
          no: 'Нет, первый раз',
        },
      },
      q4b: {
        label: 'Какими именно?',
        placeholder: 'напр. Bolt, v0, Lovable, Cursor...',
      },

      q5: {
        label: 'Насколько понятно ценностное предложение на лендинге?',
        scaleMin: 'Совсем непонятно',
        scaleMax: 'Полностью понятно',
      },
      q6: {
        label: 'Какое первое впечатление произвёл лендинг?',
        options: {
          very_positive: 'Очень положительное',
          positive: 'Положительное',
          neutral: 'Нейтральное',
          negative: 'Отрицательное',
          very_negative: 'Очень отрицательное',
        },
      },
      q7: {
        label: 'Мотивировал ли лендинг вас попробовать продукт?',
        options: {
          yes: 'Да, определённо',
          somewhat: 'Отчасти',
          no: 'Не особо',
        },
      },
      q8: {
        label: 'Что бы вы улучшили на лендинге?',
        placeholder: 'Ваши предложения...',
      },

      q9: {
        label: 'Насколько легко было зарегистрироваться?',
        scaleMin: 'Очень сложно',
        scaleMax: 'Очень легко',
      },
      q10: {
        label: 'Был ли процесс онбординга понятным и интуитивным?',
        scaleMin: 'Совсем нет',
        scaleMax: 'Абсолютно',
      },
      q11: {
        label: 'Что бы вы улучшили в процессе онбординга?',
        placeholder: 'Ваши предложения...',
      },

      q12: {
        label: 'Насколько хорошо AI понимал ваши запросы?',
        scaleMin: 'Плохо',
        scaleMax: 'Отлично',
      },
      q13: {
        label: 'Насколько вы довольны качеством сгенерированного кода?',
        scaleMin: 'Не доволен',
        scaleMax: 'Полностью доволен',
      },
      q14: {
        label: 'Как быстро AI отвечал на ваши запросы?',
        options: {
          very_fast: 'Очень быстро',
          fast: 'Достаточно быстро',
          acceptable: 'Приемлемо',
          slow: 'Медленно',
          very_slow: 'Очень медленно',
        },
      },
      q15: {
        label: 'Допускал ли AI ошибки, требующие исправления?',
        options: {
          never: 'Никогда',
          rarely: 'Редко',
          sometimes: 'Иногда',
          often: 'Часто',
          always: 'Почти всегда',
        },
      },
      q16: {
        label: 'Пробовали ли вы разные AI-модели?',
        options: {
          yes: 'Да, пробовал',
          no: 'Нет, использовал по умолчанию',
          didnt_know: 'Не знал, что это возможно',
        },
      },
      q16b: {
        label: 'Какая модель работала лучше всего?',
        placeholder: 'напр. Claude, GPT-4...',
      },
      q17: {
        label: 'Использовали ли вы функции редактирования файлов (код-редактор)?',
        options: {
          yes: 'Да',
          no: 'Нет',
        },
      },
      q17b: {
        label: 'Насколько удобным был код-редактор?',
        scaleMin: 'Неудобным',
        scaleMax: 'Очень удобным',
      },
      q18: {
        label: 'Что бы вы улучшили в AI-чате?',
        placeholder: 'Ваши предложения...',
      },

      q19: {
        label: 'Насколько интуитивен общий интерфейс?',
        scaleMin: 'Не интуитивен',
        scaleMax: 'Очень интуитивен',
      },
      q20: {
        label: 'Как вы оцениваете визуальный дизайн?',
        scaleMin: 'Плохо',
        scaleMax: 'Отлично',
      },
      q21: {
        label: 'Сталкивались ли вы с багами или сбоями?',
        options: {
          none: 'Нет, никаких багов',
          minor: 'Мелкие баги',
          moderate: 'Заметные баги',
          major: 'Серьёзные баги',
          critical: 'Критические баги, мешающие работе',
        },
      },
      q22: {
        label: 'Какие функции оказались наиболее полезными?',
        options: {
          ai_chat: 'AI-чат',
          code_editor: 'Код-редактор',
          preview: 'Предпросмотр',
          deploy: 'Деплой в один клик',
          file_tree: 'Дерево файлов',
          version_history: 'История версий',
        },
      },
      q23: {
        label: 'Каких функций вам не хватает?',
        placeholder: 'Функции, которые хотели бы видеть...',
      },

      q24: {
        label: 'Удалось ли вам задеплоить проект?',
        options: {
          yes_easy: 'Да, это было легко',
          yes_hard: 'Да, но с трудностями',
          no: 'Нет, не получилось',
          didnt_try: 'Не пробовал',
        },
      },
      q24b: {
        label: 'Какие трудности вы встретили при деплое?',
        placeholder: 'Опишите проблемы...',
      },
      q25: {
        label: 'Как быстро прошёл процесс деплоя?',
        options: {
          very_fast: 'Очень быстро (< 1 мин)',
          fast: 'Быстро (1-3 мин)',
          acceptable: 'Приемлемо (3-5 мин)',
          slow: 'Медленно (> 5 мин)',
          na: 'Не применимо',
        },
      },
      q26: {
        label: 'Насколько вы довольны результатом деплоя?',
        scaleMin: 'Не доволен',
        scaleMax: 'Полностью доволен',
      },

      q27: {
        label: 'Экономит ли Strayl время по сравнению с обычной разработкой?',
        options: {
          significantly: 'Значительно',
          somewhat: 'Отчасти',
          same: 'Примерно одинаково',
          slower: 'На самом деле медленнее',
          cant_tell: 'Сложно сказать',
        },
      },
      q28: {
        label: 'Использовали бы вы Strayl для реального проекта?',
        options: {
          definitely: 'Определённо да',
          probably: 'Скорее да',
          maybe: 'Возможно',
          probably_not: 'Скорее нет',
          no: 'Определённо нет',
        },
      },
      q29: {
        label: 'Сколько вы готовы платить ежемесячно за Strayl?',
        options: {
          free: 'Только бесплатный тариф',
          ten: '$5-10',
          twenty: '$10-20',
          fifty: '$20-50',
          more: 'Более $50',
        },
      },
      q30: {
        label: 'Кому бы вы порекомендовали Strayl?',
        options: {
          developers: 'Разработчикам',
          non_tech: 'Нетехническим людям',
          startups: 'Основателям стартапов',
          students: 'Студентам',
          agencies: 'Агентствам',
          nobody: 'Никому бы не рекомендовал',
        },
      },

      q31: {
        label: 'В целом, насколько вы довольны Strayl?',
        scaleMin: 'Совсем не доволен',
        scaleMax: 'Полностью доволен',
      },
      q32: {
        label: 'Насколько вероятно, что вы порекомендуете Strayl другу или коллеге? (NPS)',
        scaleMin: 'Совсем маловероятно',
        scaleMax: 'Крайне вероятно',
      },
      q33: {
        label: 'Что вам больше всего понравилось в Strayl?',
        placeholder: 'Расскажите, что впечатлило...',
      },
      q34: {
        label: 'Что не понравилось или вызвало разочарование?',
        placeholder: 'Расскажите, что стоит улучшить...',
      },
      q35: {
        label: 'Дополнительные комментарии или предложения?',
        placeholder: 'Что ещё хотите сказать...',
      },

      thankYou: {
        title: 'Спасибо!',
        message: 'Ваш отзыв бесценен. Он поможет нам сделать Strayl лучше для всех.',
        subtitle: 'Мы ценим ваше время и усилия.',
      },
    },
  },
  kk: {
    translation: {
      toggleTheme: 'Тақырыпты ауыстыру',
      language: 'Тіл',
      languages: {
        en: 'English',
        ru: 'Русский',
        kk: 'Қазақша',
      },
      next: 'Келесі',
      back: 'Артқа',
      submit: 'Жіберу',
      required: 'Міндетті',
      optional: 'Міндетті емес',
      progressLabel: '{{total}} бөлімнің {{current}}-і',

      sections: {
        about: 'Өзіңіз туралы',
        landing: 'Лендинг',
        onboarding: 'Онбординг',
        aiChat: 'AI-чат',
        interface: 'Интерфейс',
        deploy: 'Деплой',
        value: 'Құндылық',
        overall: 'Жалпы баға',
      },

      q1: {
        label: 'Сіздің рөліңіз қандай?',
        options: {
          developer: 'Әзірлеуші',
          designer: 'Дизайнер',
          pm: 'Продакт-менеджер',
          founder: 'Негізін қалаушы / Кәсіпкер',
          student: 'Студент',
          other: 'Басқа',
        },
      },
      q2: {
        label: 'Техникалық тәжірибе деңгейіңіз қандай?',
        options: {
          beginner: 'Бастаушы (0-1 жыл)',
          junior: 'Джуниор (1-3 жыл)',
          middle: 'Мидл (3-5 жыл)',
          senior: 'Сеньор (5-10 жыл)',
          expert: 'Эксперт (10+ жыл)',
        },
      },
      q3: {
        label: 'Strayl туралы қалай білдіңіз?',
        options: {
          social: 'Әлеуметтік желілер',
          friend: 'Дос / Әріптес',
          search: 'Іздеу жүйесі',
          article: 'Блог / Мақала',
          ad: 'Жарнама',
          other: 'Басқа',
        },
      },
      q4: {
        label: 'Бұрын ұқсас AI-құрылымдарды қолдандыңыз ба?',
        options: {
          yes: 'Иә, тәжірибем бар',
          no: 'Жоқ, бірінші рет',
        },
      },
      q4b: {
        label: 'Нақты қайсыларын?',
        placeholder: 'мыс. Bolt, v0, Lovable, Cursor...',
      },

      q5: {
        label: 'Лендингтегі құндылық ұсынысы қаншалықты түсінікті?',
        scaleMin: 'Мүлде түсініксіз',
        scaleMax: 'Толық түсінікті',
      },
      q6: {
        label: 'Лендинг қандай алғашқы әсер қалдырды?',
        options: {
          very_positive: 'Өте жағымды',
          positive: 'Жағымды',
          neutral: 'Бейтарап',
          negative: 'Жағымсыз',
          very_negative: 'Өте жағымсыз',
        },
      },
      q7: {
        label: 'Лендинг сізді өнімді қолданып көруге итермеледі ме?',
        options: {
          yes: 'Иә, міндетті түрде',
          somewhat: 'Біршама',
          no: 'Ерекше емес',
        },
      },
      q8: {
        label: 'Лендингте нені жақсартар едіңіз?',
        placeholder: 'Сіздің ұсыныстарыңыз...',
      },

      q9: {
        label: 'Тіркелу қаншалықты оңай болды?',
        scaleMin: 'Өте қиын',
        scaleMax: 'Өте оңай',
      },
      q10: {
        label: 'Онбординг процесі түсінікті және интуитивті болды ма?',
        scaleMin: 'Мүлде жоқ',
        scaleMax: 'Толығымен',
      },
      q11: {
        label: 'Онбординг процесінде нені жақсартар едіңіз?',
        placeholder: 'Сіздің ұсыныстарыңыз...',
      },

      q12: {
        label: 'AI сіздің сұрауларыңызды қаншалықты жақсы түсінді?',
        scaleMin: 'Нашар',
        scaleMax: 'Тамаша',
      },
      q13: {
        label: 'Генерацияланған кодтың сапасына қаншалықты қанағаттандыңыз?',
        scaleMin: 'Қанағаттанбадым',
        scaleMax: 'Толық қанағаттандым',
      },
      q14: {
        label: 'AI сұрауларыңызға қаншалықты тез жауап берді?',
        options: {
          very_fast: 'Өте тез',
          fast: 'Жеткілікті тез',
          acceptable: 'Қолайлы',
          slow: 'Баяу',
          very_slow: 'Өте баяу',
        },
      },
      q15: {
        label: 'AI түзетуді қажет ететін қателер жіберді ме?',
        options: {
          never: 'Ешқашан',
          rarely: 'Сирек',
          sometimes: 'Кейде',
          often: 'Жиі',
          always: 'Әрқашан дерлік',
        },
      },
      q16: {
        label: 'Әр түрлі AI модельдерін қолданып көрдіңіз бе?',
        options: {
          yes: 'Иә, қолданып көрдім',
          no: 'Жоқ, әдепкі бойынша қолдандым',
          didnt_know: 'Мүмкін екенін білмедім',
        },
      },
      q16b: {
        label: 'Қай модель жақсы жұмыс істеді?',
        placeholder: 'мыс. Claude, GPT-4...',
      },
      q17: {
        label: 'Файл өңдеу мүмкіндіктерін (код-редактор) пайдаландыңыз ба?',
        options: {
          yes: 'Иә',
          no: 'Жоқ',
        },
      },
      q17b: {
        label: 'Код-редактор қаншалықты ыңғайлы болды?',
        scaleMin: 'Ыңғайсыз',
        scaleMax: 'Өте ыңғайлы',
      },
      q18: {
        label: 'AI-чатта нені жақсартар едіңіз?',
        placeholder: 'Сіздің ұсыныстарыңыз...',
      },

      q19: {
        label: 'Жалпы интерфейс қаншалықты интуитивті?',
        scaleMin: 'Интуитивті емес',
        scaleMax: 'Өте интуитивті',
      },
      q20: {
        label: 'Визуалды дизайнды қалай бағалайсыз?',
        scaleMin: 'Нашар',
        scaleMax: 'Тамаша',
      },
      q21: {
        label: 'Қателер немесе ақаулар кездесті ме?',
        options: {
          none: 'Ешқандай қате жоқ',
          minor: 'Кішігірім қателер',
          moderate: 'Байқалатын қателер',
          major: 'Елеулі қателер',
          critical: 'Жұмысқа кедергі болатын маңызды қателер',
        },
      },
      q22: {
        label: 'Қай мүмкіндіктер ең пайдалы болды?',
        options: {
          ai_chat: 'AI-чат',
          code_editor: 'Код-редактор',
          preview: 'Тікелей алдын ала қарау',
          deploy: 'Бір рет басу арқылы деплой',
          file_tree: 'Файл ағашы',
          version_history: 'Нұсқалар тарихы',
        },
      },
      q23: {
        label: 'Қандай мүмкіндіктер жетіспейді?',
        placeholder: 'Көргіңіз келетін мүмкіндіктер...',
      },

      q24: {
        label: 'Жобаңызды деплой жасай алдыңыз ба?',
        options: {
          yes_easy: 'Иә, оңай болды',
          yes_hard: 'Иә, бірақ қиындықтармен',
          no: 'Жоқ, мүмкін болмады',
          didnt_try: 'Қолданып көрмедім',
        },
      },
      q24b: {
        label: 'Деплой кезінде қандай қиындықтар кездесті?',
        placeholder: 'Мәселелерді сипаттаңыз...',
      },
      q25: {
        label: 'Деплой процесі қаншалықты тез болды?',
        options: {
          very_fast: 'Өте тез (< 1 мин)',
          fast: 'Тез (1-3 мин)',
          acceptable: 'Қолайлы (3-5 мин)',
          slow: 'Баяу (> 5 мин)',
          na: 'Қолданылмайды',
        },
      },
      q26: {
        label: 'Деплой нәтижесіне қаншалықты қанағаттандыңыз?',
        scaleMin: 'Қанағаттанбадым',
        scaleMax: 'Толық қанағаттандым',
      },

      q27: {
        label: 'Strayl дәстүрлі әзірлеумен салыстырғанда уақыт үнемдейді ме?',
        options: {
          significantly: 'Айтарлықтай',
          somewhat: 'Біршама',
          same: 'Шамамен бірдей',
          slower: 'Шын мәнінде баяу',
          cant_tell: 'Айту қиын',
        },
      },
      q28: {
        label: 'Нақты жоба үшін Strayl қолданар ма едіңіз?',
        options: {
          definitely: 'Міндетті түрде иә',
          probably: 'Ықтимал иә',
          maybe: 'Мүмкін',
          probably_not: 'Ықтимал жоқ',
          no: 'Міндетті түрде жоқ',
        },
      },
      q29: {
        label: 'Strayl үшін ай сайын қанша төлеуге дайынсыз?',
        options: {
          free: 'Тек тегін тариф',
          ten: '$5-10',
          twenty: '$10-20',
          fifty: '$20-50',
          more: '$50-ден астам',
        },
      },
      q30: {
        label: 'Strayl-ды кімге ұсынар едіңіз?',
        options: {
          developers: 'Әзірлеушілерге',
          non_tech: 'Техникалық емес адамдарға',
          startups: 'Стартап негізін қалаушыларға',
          students: 'Студенттерге',
          agencies: 'Агенттіктерге',
          nobody: 'Ешкімге ұсынбас едім',
        },
      },

      q31: {
        label: 'Жалпы алғанда, Strayl-ға қаншалықты қанағаттандыңыз?',
        scaleMin: 'Мүлде қанағаттанбадым',
        scaleMax: 'Толық қанағаттандым',
      },
      q32: {
        label: 'Strayl-ды досыңызға немесе әріптесіңізге ұсыну ықтималдығы қандай? (NPS)',
        scaleMin: 'Мүлде ықтимал емес',
        scaleMax: 'Өте ықтимал',
      },
      q33: {
        label: 'Strayl-да не ұнады ең көп?',
        placeholder: 'Не әсер еткенін айтыңыз...',
      },
      q34: {
        label: 'Не ұнамады немесе не ренжітті?',
        placeholder: 'Нені жақсарту керегін айтыңыз...',
      },
      q35: {
        label: 'Қосымша пікірлер немесе ұсыныстар?',
        placeholder: 'Тағы бір нәрсе бөліскіңіз келсе...',
      },

      thankYou: {
        title: 'Рахмет!',
        message: 'Сіздің пікіріңіз аса құнды. Ол Strayl-ды барлығы үшін жақсартуға көмектеседі.',
        subtitle: 'Уақытыңыз бен күшіңізді бағалаймыз.',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'kk'],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
