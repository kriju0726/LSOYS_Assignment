function Timer({ time, isRunning, onStart, onToggle }) {
  return (
    <div className="timer">
      <p>Time: {time} sec</p>
      <button onClick={onStart}>Start</button>
      <button onClick={onToggle}>{isRunning ? "Pause" : "Resume"}</button>
    </div>
  );
}

export default Timer;

