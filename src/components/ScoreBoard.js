function ScoreBoard({ highScore, turns }) {
  return (
    <div className="score-tab" >
      <p style={{ margin: "20px" }}>High Score: {highScore}</p>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default ScoreBoard;



