// Extra practice questions merged into each tense pool
const EXTRA_QUESTIONS = {
  'simple-present': {
    easy: [
      { q: 'Dogs ___ bark.', correct: 'do', options: ['do', 'does', 'is', 'are'], hint: 'Plural subject' },
      { q: 'My sister ___ milk every morning.', correct: 'drinks', options: ['drink', 'drinks', 'drinking', 'drank'], hint: 'Sister = she' },
      { q: 'I ___ happy at school.', correct: 'am', options: ['am', 'is', 'are', 'be'], hint: 'I + am' }
    ],
    medium: [
      { q: 'The baby ___ when he is hungry.', correct: 'cries', options: ['cry', 'cries', 'crying', 'cried'], hint: 'Baby = he' },
      { q: '___ she play the piano?', correct: 'Does', options: ['Do', 'Does', 'Is', 'Are'], hint: 'She + Does' },
      { q: 'We often ___ to the library.', correct: 'go', options: ['go', 'goes', 'going', 'went'], hint: 'We + base verb' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'He always brushes his teeth.', options: ['He always brush his teeth.', 'He always brushes his teeth.', 'He always brushing his teeth.', 'He always brushed his teeth.'], hint: 'Habit + -s' },
      { q: 'Light ___ faster than sound.', correct: 'travels', options: ['travel', 'travels', 'traveling', 'traveled'], hint: 'Scientific fact' },
      { q: '___ your brother like apples?', correct: 'Does', options: ['Do', 'Does', 'Is', 'Are'], hint: 'Brother = he' }
    ]
  },
  'present-continuous': {
    easy: [
      { q: 'Look! The dog ___ running.', correct: 'is', options: ['am', 'is', 'are', 'be'], hint: 'Dog = it' },
      { q: 'You ___ wearing a red hat.', correct: 'are', options: ['am', 'is', 'are', 'be'], hint: 'You + are' },
      { q: 'I am ___ a letter now.', correct: 'writing', options: ['write', 'writing', 'wrote', 'writes'], hint: 'am + -ing' }
    ],
    medium: [
      { q: 'Right now, Mum ___ the dishes.', correct: 'is washing', options: ['washes', 'is washing', 'washed', 'wash'], hint: 'Right now' },
      { q: 'Why ___ the baby crying?', correct: 'is', options: ['am', 'is', 'are', 'do'], hint: 'Baby = it/he' },
      { q: 'We are ___ for the bus.', correct: 'waiting', options: ['wait', 'waiting', 'waited', 'waits'], hint: 'are + -ing' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'I am learning English now.', options: ['I learn English now.', 'I am learning English now.', 'I learning English now.', 'I am learn English now.'], hint: 'Present continuous' },
      { q: 'Please be quiet. The teacher ___.', correct: 'is speaking', options: ['speaks', 'is speaking', 'spoke', 'speak'], hint: 'Happening now' },
      { q: 'They ___ not playing outside today.', correct: 'are', options: ['am', 'is', 'are', 'do'], hint: 'They + are' }
    ]
  },
  'simple-past': {
    easy: [
      { q: 'Yesterday I ___ a new toy.', correct: 'bought', options: ['buy', 'buys', 'bought', 'buying'], hint: 'buy → bought' },
      { q: 'She ___ happy last week.', correct: 'was', options: ['is', 'was', 'were', 'be'], hint: 'She + was' },
      { q: 'We ___ to the museum.', correct: 'went', options: ['go', 'goes', 'went', 'going'], hint: 'go → went' }
    ],
    medium: [
      { q: 'Dad ___ a funny joke yesterday.', correct: 'told', options: ['tell', 'tells', 'told', 'telling'], hint: 'tell → told' },
      { q: 'The bird ___ away quickly.', correct: 'flew', options: ['fly', 'flies', 'flew', 'flying'], hint: 'fly → flew' },
      { q: 'I ___ not see the rainbow.', correct: 'did', options: ['do', 'does', 'did', 'was'], hint: 'Past negative' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'They built a sandcastle yesterday.', options: ['They build a sandcastle yesterday.', 'They built a sandcastle yesterday.', 'They building a sandcastle yesterday.', 'They builds a sandcastle yesterday.'], hint: 'Simple past' },
      { q: 'Where ___ you go last night?', correct: 'did', options: ['do', 'does', 'did', 'are'], hint: 'Past question' },
      { q: 'Mum ___ me a story before bed.', correct: 'read', options: ['reads', 'read', 'reading', 'is reading'], hint: 'Past of read (same spelling)' }
    ]
  },
  'past-continuous': {
    easy: [
      { q: 'At 9 PM, I ___ reading.', correct: 'was', options: ['was', 'were', 'am', 'is'], hint: 'I + was' },
      { q: 'You ___ singing loudly.', correct: 'were', options: ['was', 'were', 'are', 'is'], hint: 'You + were' },
      { q: 'The cat was ___ on the bed.', correct: 'lying', options: ['lie', 'lying', 'lied', 'lies'], hint: 'was + -ing' }
    ],
    medium: [
      { q: 'While we ___, Dad cooked dinner.', correct: 'were studying', options: ['studied', 'were studying', 'study', 'are studying'], hint: 'While + past continuous' },
      { q: 'The wind ___ blowing hard.', correct: 'was', options: ['was', 'were', 'is', 'are'], hint: 'Wind = it' },
      { q: 'What ___ she doing then?', correct: 'was', options: ['was', 'were', 'is', 'did'], hint: 'She + was' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'He was running when he fell.', options: ['He ran when he fell.', 'He was running when he fell.', 'He is running when he fell.', 'He was run when he fell.'], hint: 'Interrupted action' },
      { q: 'I ___ not sleeping when you called.', correct: 'was', options: ['was', 'were', 'am', 'did'], hint: 'I + was' },
      { q: 'They ___ chatting all afternoon.', correct: 'were', options: ['was', 'were', 'are', 'is'], hint: 'They + were' }
    ]
  },
  'simple-future': {
    easy: [
      { q: 'Tomorrow we ___ visit the zoo.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Tomorrow = future' },
      { q: 'I ___ help you later.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'Promise' },
      { q: 'Mum ___ make cookies tonight.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'will + base verb' }
    ],
    medium: [
      { q: 'Don\'t worry. Everything ___ be fine.', correct: 'will', options: ['will', 'is', 'was', 'does'], hint: 'Reassurance' },
      { q: '___ it be sunny tomorrow?', correct: 'Will', options: ['Will', 'Is', 'Does', 'Did'], hint: 'Future question' },
      { q: 'I ___ not tell anyone your secret.', correct: 'will', options: ['will', 'am', 'do', 'did'], hint: 'Promise negative' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'She will open the gift soon.', options: ['She open the gift soon.', 'She will open the gift soon.', 'She opens the gift soon.', 'She opening the gift soon.'], hint: 'Simple future' },
      { q: 'Next year I ___ be in Grade 4.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'Future fact' },
      { q: 'They ___ bring snacks to the party.', correct: 'will', options: ['will', 'are', 'were', 'did'], hint: 'Future plan' }
    ]
  },
  'future-continuous': {
    easy: [
      { q: 'At 9 PM I ___ be watching TV.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'will be + -ing' },
      { q: 'Tomorrow at noon, we ___ be eating lunch.', correct: 'will', options: ['will', 'are', 'were', 'do'], hint: 'Future time' },
      { q: 'She will be ___ at this time tomorrow.', correct: 'flying', options: ['fly', 'flying', 'flew', 'flies'], hint: 'will be + -ing' }
    ],
    medium: [
      { q: 'Don\'t call at 8. I ___ be bathing.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'Busy at future time' },
      { q: 'What ___ they be doing at 5?', correct: 'will', options: ['will', 'are', 'were', 'do'], hint: 'Future continuous Q' },
      { q: 'He will be ___ when the show starts.', correct: 'arriving', options: ['arrive', 'arriving', 'arrived', 'arrives'], hint: 'will be + -ing' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'We will be camping next weekend.', options: ['We will camp next weekend.', 'We will be camping next weekend.', 'We are camping next weekend.', 'We camping next weekend.'], hint: 'Future continuous' },
      { q: 'This time tomorrow, she ___ driving to school.', correct: 'will be', options: ['will', 'will be', 'is', 'was'], hint: 'will be + -ing' },
      { q: 'I ___ be waiting outside the cinema.', correct: 'will', options: ['will', 'am', 'was', 'do'], hint: 'Future arrangement' }
    ]
  },
  'present-perfect': {
    easy: [
      { q: 'I ___ just washed my hands.', correct: 'have', options: ['have', 'has', 'had', 'am'], hint: 'Just + have' },
      { q: 'Tom ___ already gone home.', correct: 'has', options: ['have', 'has', 'had', 'is'], hint: 'Tom = he' },
      { q: 'We have ___ this song before.', correct: 'heard', options: ['hear', 'heard', 'hearing', 'hears'], hint: 'hear → heard' }
    ],
    medium: [
      { q: 'Have you ___ your lunch yet?', correct: 'eaten', options: ['eat', 'eaten', 'ate', 'eating'], hint: 'Yet + past participle' },
      { q: 'She has lived here ___ five years.', correct: 'for', options: ['since', 'for', 'ago', 'in'], hint: 'for + duration' },
      { q: 'I ___ never climbed a mountain.', correct: 'have', options: ['have', 'has', 'had', 'am'], hint: 'Never = experience' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'They have already started.', options: ['They already started.', 'They have already started.', 'They are already started.', 'They have already start.'], hint: 'Present perfect' },
      { q: '___ anybody seen my pencil?', correct: 'Has', options: ['Have', 'Has', 'Did', 'Is'], hint: 'Anybody = singular' },
      { q: 'He has ___ his bike to school today.', correct: 'ridden', options: ['ride', 'ridden', 'rode', 'riding'], hint: 'ride → ridden' }
    ]
  },
  'past-perfect': {
    easy: [
      { q: 'Before school, I ___ packed my bag.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Earlier past' },
      { q: 'She ___ already woken up.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'had + past participle' },
      { q: 'They had ___ the cake before the guests came.', correct: 'eaten', options: ['eat', 'eaten', 'ate', 'eating'], hint: 'eat → eaten' }
    ],
    medium: [
      { q: 'By the time the movie began, we ___ sat down.', correct: 'had', options: ['had', 'have', 'has', 'were'], hint: 'By the time' },
      { q: 'He said he ___ lost his phone.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Reported past' },
      { q: 'After Mum ___ cooked, we ate.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'After + past perfect' }
    ],
    hard: [
      { q: 'Choose the correct sentence:', correct: 'I had closed the window before it rained.', options: ['I closed the window before it rained.', 'I had closed the window before it rained.', 'I have closed the window before it rained.', 'I was closed the window before it rained.'], hint: 'Past perfect' },
      { q: 'She ___ never tasted mango before that day.', correct: 'had', options: ['had', 'have', 'has', 'was'], hint: 'Experience before past' },
      { q: 'We realized we ___ taken the wrong bus.', correct: 'had', options: ['had', 'have', 'has', 'were'], hint: 'Realization' }
    ]
  }
};
