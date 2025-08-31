import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // High Score
  const [highScore, setHighScore] = useState(() => {
    const savedScore = localStorage.getItem("highScore");
    return savedScore ? parseInt(savedScore) : 0;
  });

  // Timer States
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);


  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);

    // Reset timer
    setTime(0);
    setIsRunning(false);
  };

  // handle a Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        new Audio("/music/match.mp3").play();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        new Audio("/music/notMatch.mp3").play();
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Check when game is won
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched) && turns > 0) {
      new Audio("/music/winner.mp3").play();

      // Stop timer
      setIsRunning(false);

      // Update High Score
      if (highScore === 0 || turns < highScore) {
        setHighScore(turns);
        localStorage.setItem("highScore", turns); // Save in localStorage
      }
    }
  }, [cards, turns]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <div className='bottom-part'>
      <div className="score-tab">
        <p style={{ marginLeft: "25px"}}>High Score: {highScore}</p>
        <p>Turns: {turns}</p>
        <p>Time: {time} sec</p>
      </div>

        <button onClick={() => setIsRunning(true)}>Start Timer</button>

        <button onClick={() => setIsRunning(!isRunning)}>
           {isRunning ? "Pause Timer" : "Resume Timer"}
        </button>
      </div>
    </div>
  );
}

export default App;


