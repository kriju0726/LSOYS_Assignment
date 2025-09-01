import "./App.css";
import SingleCard from "./components/SingleCard";
import ScoreBoard from "./components/ScoreBoard";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import useTimer from "./hooks/useTimer";
import useGameLogic from "./hooks/useGameLogic";

function App() {
  const { time, isRunning, setIsRunning, setTime } = useTimer();

  const {
    cards,
    turns,
    highScore,
    disabled,
    shuffleCards,
    handleChoice,
    choiceOne,
    choiceTwo,
  } = useGameLogic({ setIsRunning, setTime });

  return (
    <div className="App">
      <h1>Magic Match</h1>

      <Controls onNewGame={shuffleCards} />

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

      <div className="bottom-part">
        <ScoreBoard highScore={highScore} turns={turns} />
        <Timer
          time={time}
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
          onToggle={() => setIsRunning(!isRunning)}
        />
        
      </div>
    </div>
  );
}

export default App;
