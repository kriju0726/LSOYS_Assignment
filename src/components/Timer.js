function Timer({ time, isRunning, onStart, onToggle }) {
  return (
    <div className="timer" style={{display: "flex", gap:"15px" }}>
      <p className="score-tab" style={{}}>Time: {time} sec</p>
      <button onClick={onStart}>Start</button>
      <button onClick={onToggle}>{isRunning ? "Pause" : "Resume"}</button>
    </div>
  );
}

export default Timer;

