// Start button
window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    let timer = (null);
  });

  

  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1,
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean',     
         'Pacific Ocean'],
      a: 3,
    },

    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the highest mountain in the world?',
      o: ['Makalu', 'Kangchenjunga', 'Lhotse', 'Mount Everest'],
      a: 3,
    },
    {
      q: 'What is the largest continent in the world?',
      o: ['Afica', 'Asia', 'North America', 'South America'],
      a: 1,
    },
  ];
// function quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.forEach((quizItem, index) => {
      quizDisplay += `
        <ul class="list-group">
        Q - ${quizItem.q}
          <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
          <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
          <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
          <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
        </ul>
        <div>&nbsp;</div>`;
    });
    quizWrap.innerHTML = quizDisplay;
  };
  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        const li = `li_${index}_${i}`;
        const r = `radio_${index}_${i}`;
        const liElement = document.querySelector('#' + li);
        const radioElement = document.querySelector('#' + r);

        if (quizItem.a === i) {
          liElement.style.backgroundColor = 'puple';
        }

        if (radioElement.checked && quizItem.a === i) {
          score++;
        }
      }
    });
    return score;
  };
// submit button
  const submitButton = document.querySelector('#btnSubmit');
  submitButton.addEventListener('click', () => {
    const score = calculateScore();
    clearInterval(timer);
    document.querySelector('#score').textContent = `Score: ${score}`;
    highlightCorrectAnswers();
  });
//restart button
  const resetButton = document.querySelector('#btnReset');
  resetButton.addEventListener('click', () => {
    window.location.reload();
  });

  const countdownTimer = () => {
    let seconds = 60;
    const timeDisplay = document.querySelector('#time');

      timer = setInterval(() => {
      seconds--;
      timeDisplay.textContent = formatTime(seconds);

      if (seconds <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${padZero(min)}:${padZero(sec)}`;
  };

  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const endQuiz = () => {
    const score = calculateScore();
    document.querySelector('#score').textContent = `Score: ${score}`;
    highlightCorrectAnswers();
  };

  const highlightCorrectAnswers = () => {
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        const li = `li_${index}_${i}`;
        const liElement = document.querySelector('#' + li);

        if (quizItem.a === i) {
          liElement.style.backgroundColor = 'pink';
        }
      }
    });
  };
  // call the displayQuiz function
  displayQuiz();
  countdownTimer();
});