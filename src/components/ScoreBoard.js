function ScoreBoard({ highScore, turns }) {
  return (
    <div className="score-tab">
      <p style={{ marginLeft: "25px" }}>High Score: {highScore}</p>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default ScoreBoard;



