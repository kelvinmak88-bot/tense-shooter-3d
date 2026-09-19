// 8 English Tenses - Teaching content & game questions
const TENSES = [
  {
    id: 'simple-present',
    name: 'Simple Present',
    nameZh: '一般現在式',
    emoji: '🌞',
    color: '#FFD93D',
    teaching: {
      title: 'Simple Present Tense',
      subtitle: '一般現在式 — 習慣、事實、規律',
      formula: 'Subject + Verb(s/es) + Object',
      rules: [
        'Use for daily habits: I brush my teeth every day.',
        'Use for facts: The sun rises in the east.',
        'Add -s/-es for he/she/it: She plays tennis.',
        'Use do/does for questions: Do you like pizza?'
      ],
      examples: [
        { en: 'I eat breakfast at 7 AM.', zh: '我早上7點吃早餐。' },
        { en: 'She reads books every night.', zh: '她每晚看書。' },
        { en: 'They play football on Sundays.', zh: '他們星期天踢足球。' }
      ],
      signalWords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day']
    },
    questions: {
      easy: [
        { q: 'I ___ to school every day.', correct: 'go', options: ['go', 'goes', 'going', 'went'], hint: 'I + base verb' },
        { q: 'She ___ English very well.', correct: 'speaks', options: ['speak', 'speaks', 'speaking', 'spoke'], hint: 'She + verb + s' },
        { q: 'They ___ TV in the evening.', correct: 'watch', options: ['watch', 'watches', 'watching', 'watched'], hint: 'They + base verb' },
        { q: 'He ___ his homework after school.', correct: 'does', options: ['do', 'does', 'doing', 'did'], hint: 'He + does' },
        { q: 'We ___ pizza on Fridays.', correct: 'eat', options: ['eat', 'eats', 'eating', 'ate'], hint: 'We + base verb' }
      ],
      medium: [
        { q: 'My cat ___ on the sofa.', correct: 'sleeps', options: ['sleep', 'sleeps', 'sleeping', 'slept'], hint: 'My cat = it' },
        { q: 'Birds ___ in the sky.', correct: 'fly', options: ['fly', 'flies', 'flying', 'flew'], hint: 'Birds = plural' },
        { q: 'Tom ___ not like vegetables.', correct: 'does', options: ['do', 'does', 'is', 'did'], hint: 'Tom = he, negative' },
        { q: 'Water ___ at 100°C.', correct: 'boils', options: ['boil', 'boils', 'boiling', 'boiled'], hint: 'Scientific fact' },
        { q: 'The shop ___ at 9 AM.', correct: 'opens', options: ['open', 'opens', 'opening', 'opened'], hint: 'The shop = it' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'She plays piano.', options: ['She play piano.', 'She plays piano.', 'She playing piano.', 'She played piano.'], hint: 'Simple present' },
        { q: '___ you like ice cream?', correct: 'Do', options: ['Do', 'Does', 'Are', 'Did'], hint: 'Question with you' },
        { q: 'He never ___ late for class.', correct: 'is', options: ['is', 'are', 'be', 'was'], hint: 'State of being' },
        { q: 'The Earth ___ around the Sun.', correct: 'revolves', options: ['revolve', 'revolves', 'revolving', 'revolved'], hint: 'Universal fact' },
        { q: 'My parents ___ in London.', correct: 'live', options: ['live', 'lives', 'living', 'lived'], hint: 'Parents = plural' }
      ]
    }
  },
  {
    id: 'present-continuous',
    name: 'Present Continuous',
    nameZh: '現在進行式',
    emoji: '🏃',
    color: '#6BCB77',
    teaching: {
      title: 'Present Continuous Tense',
      subtitle: '現在進行式 — 正在發生的事',
      formula: 'Subject + am/is/are + Verb-ing + Object',
      rules: [
        'Use for actions happening NOW: I am reading a book.',
        'Use am with I, is with he/she/it, are with we/you/they.',
        'Add -ing to the verb: play → playing.',
        'Signal words: now, at the moment, currently, right now.'
      ],
      examples: [
        { en: 'I am studying English now.', zh: '我現在正在學英文。' },
        { en: 'She is cooking dinner.', zh: '她正在煮晚餐。' },
        { en: 'They are playing in the park.', zh: '他們正在公園玩耍。' }
      ],
      signalWords: ['now', 'at the moment', 'currently', 'right now', 'today']
    },
    questions: {
      easy: [
        { q: 'I ___ watching TV now.', correct: 'am', options: ['am', 'is', 'are', 'be'], hint: 'I + am' },
        { q: 'She ___ reading a book.', correct: 'is', options: ['am', 'is', 'are', 'be'], hint: 'She + is' },
        { q: 'They ___ playing football.', correct: 'are', options: ['am', 'is', 'are', 'be'], hint: 'They + are' },
        { q: 'He is ___ dinner.', correct: 'cooking', options: ['cook', 'cooking', 'cooked', 'cooks'], hint: 'is + -ing' },
        { q: 'We are ___ to music.', correct: 'listening', options: ['listen', 'listening', 'listened', 'listens'], hint: 'are + -ing' }
      ],
      medium: [
        { q: 'Look! It ___ raining outside.', correct: 'is', options: ['am', 'is', 'are', 'was'], hint: 'It + is' },
        { q: 'The children ___ sleeping.', correct: 'are', options: ['am', 'is', 'are', 'was'], hint: 'Children = plural' },
        { q: 'I ___ not feeling well today.', correct: 'am', options: ['am', 'is', 'are', 'was'], hint: 'I + am' },
        { q: 'What ___ you doing?', correct: 'are', options: ['am', 'is', 'are', 'do'], hint: 'You + are' },
        { q: 'She is ___ her homework.', correct: 'doing', options: ['do', 'doing', 'does', 'did'], hint: 'is + -ing' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'They are swimming now.', options: ['They swim now.', 'They are swimming now.', 'They swimming now.', 'They is swimming now.'], hint: 'Present continuous' },
        { q: 'Listen! Someone ___ at the door.', correct: 'is knocking', options: ['knocks', 'is knocking', 'knock', 'knocked'], hint: 'Happening now' },
        { q: 'I ___ for my exam this week.', correct: 'am studying', options: ['study', 'am studying', 'studied', 'studies'], hint: 'Temporary action' },
        { q: 'The baby ___ loudly.', correct: 'is crying', options: ['cries', 'is crying', 'cry', 'cried'], hint: 'Right now' },
        { q: 'We ___ a new game today.', correct: 'are learning', options: ['learn', 'are learning', 'learned', 'learns'], hint: 'are + -ing' }
      ]
    }
  },
  {
    id: 'simple-past',
    name: 'Simple Past',
    nameZh: '一般過去式',
    emoji: '📅',
    color: '#FF6B6B',
    teaching: {
      title: 'Simple Past Tense',
      subtitle: '一般過去式 — 已經完成的事',
      formula: 'Subject + Verb-ed / Past Form + Object',
      rules: [
        'Use for completed actions in the past: I visited Paris last year.',
        'Regular verbs: add -ed (walk → walked).',
        'Irregular verbs: special forms (go → went, eat → ate).',
        'Signal words: yesterday, last week, ago, in 2020.'
      ],
      examples: [
        { en: 'I played football yesterday.', zh: '我昨天踢了足球。' },
        { en: 'She went to the zoo last Sunday.', zh: '她上星期天去了動物園。' },
        { en: 'We watched a movie last night.', zh: '我們昨晚看了一場電影。' }
      ],
      signalWords: ['yesterday', 'last week', 'last year', 'ago', 'in 2020']
    },
    questions: {
      easy: [
        { q: 'I ___ to the park yesterday.', correct: 'went', options: ['go', 'goes', 'went', 'going'], hint: 'go → went' },
        { q: 'She ___ a cake last night.', correct: 'baked', options: ['bake', 'bakes', 'baked', 'baking'], hint: 'Regular: bake + ed' },
        { q: 'They ___ TV after dinner.', correct: 'watched', options: ['watch', 'watches', 'watched', 'watching'], hint: 'watch + ed' },
        { q: 'He ___ his bike to school.', correct: 'rode', options: ['ride', 'rides', 'rode', 'riding'], hint: 'ride → rode' },
        { q: 'We ___ pizza for lunch.', correct: 'ate', options: ['eat', 'eats', 'ate', 'eating'], hint: 'eat → ate' }
      ],
      medium: [
        { q: 'I ___ my friend at the mall.', correct: 'met', options: ['meet', 'meets', 'met', 'meeting'], hint: 'meet → met' },
        { q: 'She ___ a letter to her grandma.', correct: 'wrote', options: ['write', 'writes', 'wrote', 'writing'], hint: 'write → wrote' },
        { q: 'It ___ heavily last night.', correct: 'rained', options: ['rain', 'rains', 'rained', 'raining'], hint: 'rain + ed' },
        { q: 'Tom ___ the window by accident.', correct: 'broke', options: ['break', 'breaks', 'broke', 'breaking'], hint: 'break → broke' },
        { q: 'We ___ a great time at the party.', correct: 'had', options: ['have', 'has', 'had', 'having'], hint: 'have → had' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I saw a rainbow yesterday.', options: ['I see a rainbow yesterday.', 'I saw a rainbow yesterday.', 'I seen a rainbow yesterday.', 'I seeing a rainbow yesterday.'], hint: 'Simple past' },
        { q: 'She ___ not come to school yesterday.', correct: 'did', options: ['do', 'does', 'did', 'was'], hint: 'Past negative' },
        { q: '___ you finish your homework?', correct: 'Did', options: ['Do', 'Does', 'Did', 'Are'], hint: 'Past question' },
        { q: 'The dog ___ away from home.', correct: 'ran', options: ['run', 'runs', 'ran', 'running'], hint: 'run → ran' },
        { q: 'I ___ my keys at home.', correct: 'left', options: ['leave', 'leaves', 'left', 'leaving'], hint: 'leave → left' }
      ]
    }
  },
  {
    id: 'past-continuous',
    name: 'Past Continuous',
    nameZh: '過去進行式',
    emoji: '⏳',
    color: '#C084FC',
    teaching: {
      title: 'Past Continuous Tense',
      subtitle: '過去進行式 — 過去某時正在進行的事',
      formula: 'Subject + was/were + Verb-ing + Object',
      rules: [
        'Use for ongoing actions in the past: I was sleeping at 10 PM.',
        'Use was with I/he/she/it, were with we/you/they.',
        'Often used with simple past: I was reading when he called.',
        'Signal words: while, when, at that time, at 8 o\'clock.'
      ],
      examples: [
        { en: 'I was doing homework at 6 PM.', zh: '我下午6點正在做功課。' },
        { en: 'They were playing when it started to rain.', zh: '下雨時他們正在玩耍。' },
        { en: 'She was cooking while he was watching TV.', zh: '她在煮飯，他在看電視。' }
      ],
      signalWords: ['while', 'when', 'at that time', 'at 8 o\'clock', 'all morning']
    },
    questions: {
      easy: [
        { q: 'I ___ sleeping at 10 PM.', correct: 'was', options: ['was', 'were', 'am', 'is'], hint: 'I + was' },
        { q: 'They ___ playing in the garden.', correct: 'were', options: ['was', 'were', 'are', 'is'], hint: 'They + were' },
        { q: 'She ___ reading a story.', correct: 'was', options: ['was', 'were', 'is', 'are'], hint: 'She + was' },
        { q: 'He was ___ TV when I arrived.', correct: 'watching', options: ['watch', 'watching', 'watched', 'watches'], hint: 'was + -ing' },
        { q: 'We were ___ dinner at 7 PM.', correct: 'eating', options: ['eat', 'eating', 'ate', 'eats'], hint: 'were + -ing' }
      ],
      medium: [
        { q: 'What ___ you doing at 3 PM?', correct: 'were', options: ['was', 'were', 'are', 'did'], hint: 'You + were' },
        { q: 'It ___ raining all morning.', correct: 'was', options: ['was', 'were', 'is', 'are'], hint: 'It + was' },
        { q: 'The kids ___ running in the park.', correct: 'were', options: ['was', 'were', 'are', 'is'], hint: 'Kids = plural' },
        { q: 'I ___ not listening when the teacher spoke.', correct: 'was', options: ['was', 'were', 'am', 'did'], hint: 'I + was' },
        { q: 'She was ___ while he was singing.', correct: 'dancing', options: ['dance', 'dancing', 'danced', 'dances'], hint: 'was + -ing' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I was studying when you called.', options: ['I studied when you called.', 'I was studying when you called.', 'I am studying when you called.', 'I was study when you called.'], hint: 'Past continuous' },
        { q: 'While I ___, the phone rang.', correct: 'was cooking', options: ['cooked', 'was cooking', 'cook', 'am cooking'], hint: 'Ongoing past action' },
        { q: 'They ___ football when it started to rain.', correct: 'were playing', options: ['played', 'were playing', 'play', 'are playing'], hint: 'Interrupted action' },
        { q: 'At 8 AM, she ___ to school.', correct: 'was walking', options: ['walked', 'was walking', 'walks', 'is walking'], hint: 'Specific past time' },
        { q: 'We ___ TV when the power went out.', correct: 'were watching', options: ['watched', 'were watching', 'watch', 'are watching'], hint: 'were + -ing' }
      ]
    }
  },
  {
    id: 'simple-future',
    name: 'Simple Future',
    nameZh: '一般未來式',
    emoji: '🚀',
    color: '#4D96FF',
    teaching: {
      title: 'Simple Future Tense',
      subtitle: '一般未來式 — 將來會發生的事',
      formula: 'Subject + will + Verb + Object',
      rules: [
        'Use will + base verb for future actions: I will visit Japan.',
        'Use for predictions, promises, and decisions: It will rain tomorrow.',
        'Negative: will not (won\'t). Question: Will you come?',
        'Signal words: tomorrow, next week, soon, in the future.'
      ],
      examples: [
        { en: 'I will go to the beach tomorrow.', zh: '我明天會去海灘。' },
        { en: 'She will be a doctor one day.', zh: '她有一天會成為醫生。' },
        { en: 'We will have a party next Saturday.', zh: '我們下星期六會開派對。' }
      ],
      signalWords: ['tomorrow', 'next week', 'next year', 'soon', 'in the future']
    },
    questions: {
      easy: [
        { q: 'I ___ visit my grandma tomorrow.', correct: 'will', options: ['will', 'am', 'was', 'did'], hint: 'Future = will' },
        { q: 'She ___ come to the party.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'will + base verb' },
        { q: 'They ___ play football next week.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Next week = future' },
        { q: 'It ___ rain tomorrow.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Prediction' },
        { q: 'We ___ have fun at the zoo.', correct: 'will', options: ['will', 'are', 'were', 'had'], hint: 'Future plan' }
      ],
      medium: [
        { q: 'I ___ not forget your birthday.', correct: 'will', options: ['will', 'am', 'do', 'did'], hint: 'Promise' },
        { q: '___ you help me with homework?', correct: 'Will', options: ['Will', 'Do', 'Are', 'Did'], hint: 'Future question' },
        { q: 'He ___ be ten years old next month.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Future age' },
        { q: 'The train ___ arrive at 3 PM.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Scheduled future' },
        { q: 'We ___ travel to Japan next summer.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Future plan' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I will call you later.', options: ['I call you later.', 'I will call you later.', 'I am call you later.', 'I called you later.'], hint: 'Simple future' },
        { q: 'She ___ probably pass the exam.', correct: 'will', options: ['will', 'is', 'was', 'has'], hint: 'Prediction' },
        { q: 'They ___ not be late again.', correct: 'will', options: ['will', 'are', 'were', 'do'], hint: 'Future negative' },
        { q: 'What ___ you do this weekend?', correct: 'will', options: ['will', 'do', 'are', 'did'], hint: 'Future question' },
        { q: 'I think it ___ snow tonight.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Weather prediction' }
      ]
    }
  },
  {
    id: 'future-continuous',
    name: 'Future Continuous',
    nameZh: '未來進行式',
    emoji: '🌈',
    color: '#FF9F43',
    teaching: {
      title: 'Future Continuous Tense',
      subtitle: '未來進行式 — 將來某時正在進行的事',
      formula: 'Subject + will be + Verb-ing + Object',
      rules: [
        'Use for actions in progress at a future time: I will be studying at 8 PM.',
        'Structure: will + be + verb-ing.',
        'Shows an action that will be ongoing in the future.',
        'Signal words: at this time tomorrow, at 5 PM, when you arrive.'
      ],
      examples: [
        { en: 'I will be sleeping at midnight.', zh: '午夜時我會正在睡覺。' },
        { en: 'She will be working when you call.', zh: '你打電話時她會正在工作。' },
        { en: 'They will be traveling next month.', zh: '下個月他們會正在旅行。' }
      ],
      signalWords: ['at this time tomorrow', 'at 5 PM', 'when you arrive', 'next week']
    },
    questions: {
      easy: [
        { q: 'I ___ be sleeping at 10 PM.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'will be + -ing' },
        { q: 'She ___ be studying at 8 o\'clock.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Future ongoing' },
        { q: 'They ___ be playing football at 4 PM.', correct: 'will', options: ['will', 'are', 'were', 'do'], hint: 'will be + -ing' },
        { q: 'He will be ___ dinner at 7 PM.', correct: 'cooking', options: ['cook', 'cooking', 'cooked', 'cooks'], hint: 'will be + -ing' },
        { q: 'We ___ be watching a movie tonight.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Future continuous' }
      ],
      medium: [
        { q: 'At 3 PM tomorrow, I ___ be in class.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'Specific future time' },
        { q: 'What ___ you be doing at 6 PM?', correct: 'will', options: ['will', 'are', 'were', 'do'], hint: 'Future question' },
        { q: 'She will be ___ when you arrive.', correct: 'working', options: ['work', 'working', 'worked', 'works'], hint: 'will be + -ing' },
        { q: 'The sun ___ be shining at noon.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Future state' },
        { q: 'They ___ be traveling next week.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Ongoing future' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I will be reading at 9 PM.', options: ['I will read at 9 PM.', 'I will be reading at 9 PM.', 'I am reading at 9 PM.', 'I read at 9 PM.'], hint: 'Future continuous' },
        { q: 'This time next week, we ___ on holiday.', correct: 'will be', options: ['will', 'will be', 'are', 'were'], hint: 'will be + -ing/state' },
        { q: 'While you ___, I will be cooking.', correct: 'will be resting', options: ['rest', 'will be resting', 'rested', 'are resting'], hint: 'Parallel future actions' },
        { q: 'At midnight, most people ___ sleeping.', correct: 'will be', options: ['will', 'will be', 'are', 'were'], hint: 'Future ongoing state' },
        { q: 'She ___ be waiting for you at the station.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Future plan' }
      ]
    }
  },
  {
    id: 'present-perfect',
    name: 'Present Perfect',
    nameZh: '現在完成式',
    emoji: '✨',
    color: '#A855F7',
    teaching: {
      title: 'Present Perfect Tense',
      subtitle: '現在完成式 — 過去發生但與現在有關',
      formula: 'Subject + have/has + Past Participle + Object',
      rules: [
        'Use have with I/you/we/they, has with he/she/it.',
        'Past participle: regular (-ed) or irregular (gone, eaten, seen).',
        'Links past actions to the present: I have finished my homework.',
        'Signal words: already, just, yet, ever, never, since, for.'
      ],
      examples: [
        { en: 'I have eaten lunch already.', zh: '我已經吃過午餐了。' },
        { en: 'She has visited Paris three times.', zh: '她去過巴黎三次。' },
        { en: 'They have lived here since 2020.', zh: '他們從2020年起住在這裡。' }
      ],
      signalWords: ['already', 'just', 'yet', 'ever', 'never', 'since', 'for']
    },
    questions: {
      easy: [
        { q: 'I ___ finished my homework.', correct: 'have', options: ['have', 'has', 'had', 'am'], hint: 'I + have' },
        { q: 'She ___ eaten breakfast.', correct: 'has', options: ['have', 'has', 'had', 'is'], hint: 'She + has' },
        { q: 'They ___ played this game before.', correct: 'have', options: ['have', 'has', 'had', 'are'], hint: 'They + have' },
        { q: 'He has ___ to London.', correct: 'been', options: ['be', 'been', 'was', 'being'], hint: 'has + past participle' },
        { q: 'We ___ seen that movie.', correct: 'have', options: ['have', 'has', 'had', 'are'], hint: 'We + have' }
      ],
      medium: [
        { q: 'I ___ never tried sushi.', correct: 'have', options: ['have', 'has', 'had', 'am'], hint: 'Experience' },
        { q: 'She has ___ her room.', correct: 'cleaned', options: ['clean', 'cleaned', 'cleans', 'cleaning'], hint: 'has + -ed' },
        { q: '___ you ever been to Japan?', correct: 'Have', options: ['Have', 'Has', 'Did', 'Are'], hint: 'Question with you' },
        { q: 'He ___ just arrived home.', correct: 'has', options: ['have', 'has', 'had', 'is'], hint: 'Just = present perfect' },
        { q: 'They have lived here ___ 2019.', correct: 'since', options: ['since', 'for', 'ago', 'in'], hint: 'since + point in time' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I have lost my keys.', options: ['I lost my keys.', 'I have lost my keys.', 'I am lost my keys.', 'I have lose my keys.'], hint: 'Present perfect' },
        { q: 'She ___ not finished yet.', correct: 'has', options: ['have', 'has', 'had', 'is'], hint: 'Yet = present perfect' },
        { q: 'We have known each other ___ ten years.', correct: 'for', options: ['since', 'for', 'ago', 'in'], hint: 'for + duration' },
        { q: '___ he ever ridden a horse?', correct: 'Has', options: ['Have', 'Has', 'Did', 'Is'], hint: 'Has + he' },
        { q: 'I have ___ my best friend today.', correct: 'seen', options: ['see', 'seen', 'saw', 'seeing'], hint: 'see → seen' }
      ]
    }
  },
  {
    id: 'past-perfect',
    name: 'Past Perfect',
    nameZh: '過去完成式',
    emoji: '🕰️',
    color: '#EC4899',
    teaching: {
      title: 'Past Perfect Tense',
      subtitle: '過去完成式 — 過去之前已完成的事',
      formula: 'Subject + had + Past Participle + Object',
      rules: [
        'Use for actions completed BEFORE another past action.',
        'Structure: had + past participle for all subjects.',
        'Example: I had eaten before he arrived.',
        'Signal words: before, after, already, by the time, when.'
      ],
      examples: [
        { en: 'I had finished dinner before 7 PM.', zh: '我在7點前已經吃完晚餐。' },
        { en: 'She had left when I called.', zh: '我打電話時她已經離開了。' },
        { en: 'They had never seen snow before.', zh: '他們以前從未見過雪。' }
      ],
      signalWords: ['before', 'after', 'already', 'by the time', 'when', 'never']
    },
    questions: {
      easy: [
        { q: 'I ___ already eaten when he came.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Past before past' },
        { q: 'She ___ finished her work before lunch.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'had + past participle' },
        { q: 'They ___ left before we arrived.', correct: 'had', options: ['had', 'have', 'has', 'were'], hint: 'Earlier past action' },
        { q: 'He had ___ the movie before.', correct: 'seen', options: ['see', 'seen', 'saw', 'seeing'], hint: 'see → seen' },
        { q: 'We ___ never visited that city.', correct: 'had', options: ['had', 'have', 'has', 'were'], hint: 'Experience before past' }
      ],
      medium: [
        { q: 'By 6 PM, I ___ done my homework.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'By + time = past perfect' },
        { q: 'She had ___ the door before leaving.', correct: 'locked', options: ['lock', 'locked', 'locks', 'locking'], hint: 'had + -ed' },
        { q: 'When I woke up, it ___ stopped raining.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Earlier event' },
        { q: 'They had ___ dinner before the show.', correct: 'eaten', options: ['eat', 'eaten', 'ate', 'eating'], hint: 'eat → eaten' },
        { q: 'He ___ already left when I called.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Already + past perfect' }
      ],
      hard: [
        { q: 'Choose the correct sentence:', correct: 'I had studied before the test.', options: ['I studied before the test.', 'I had studied before the test.', 'I have studied before the test.', 'I was studied before the test.'], hint: 'Past perfect' },
        { q: 'By the time she arrived, we ___ eaten.', correct: 'had', options: ['had', 'have', 'has', 'were'], hint: 'By the time' },
        { q: 'He told me he ___ never been there.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Reported experience' },
        { q: 'After she ___ her homework, she went out.', correct: 'had finished', options: ['finished', 'had finished', 'has finished', 'finishes'], hint: 'After + past perfect' },
        { q: 'I realized I ___ forgotten my wallet.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Realization of past action' }
      ]
    }
  }
];

const LEVELS = [
  { id: 'easy', name: 'Level 1 - Easy', nameZh: '初級', stars: 1, color: '#6BCB77', questionsPerRound: 6, timeLimit: 45 },
  { id: 'medium', name: 'Level 2 - Medium', nameZh: '中級', stars: 2, color: '#FFD93D', questionsPerRound: 7, timeLimit: 40 },
  { id: 'hard', name: 'Level 3 - Hard', nameZh: '高級', stars: 3, color: '#FF6B6B', questionsPerRound: 8, timeLimit: 35 }
];

function getQuestions(tenseId, levelId, count = 6) {
  const tense = TENSES.find(t => t.id === tenseId);
  if (!tense) return [];
  const extra = (EXTRA_QUESTIONS[tenseId] && EXTRA_QUESTIONS[tenseId][levelId]) || [];
  const pool = [...(tense.questions[levelId] || []), ...extra];
  shuffleArray(pool);
  return pool.slice(0, Math.min(count, pool.length)).map(q => ({
    ...q,
    options: shuffleArray([...q.options])
  }));
}

function regenerateQuestions(tenseId, levelId, count = 6) {
  return getQuestions(tenseId, levelId, count);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTenseById(id) {
  return TENSES.find(t => t.id === id);
}
