import { useState, useEffect } from "react";
import cardImages from "../utils/cardsData";

export default function useGameLogic({ setIsRunning, setTime }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("highScore");
    return saved ? parseInt(saved) : 0;
  });

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
    setTime(0);
    setIsRunning(false);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        new Audio("/music/match.mp3").play();
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        new Audio("/music/notMatch.mp3").play();
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((t) => t + 1);
    setDisabled(false);
  };

  // Auto start new game
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check win
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched) && turns > 0) {
      new Audio("/music/winner.mp3").play();
      setIsRunning(false);

      if (highScore === 0 || turns < highScore) {
        setHighScore(turns);
        localStorage.setItem("highScore", turns);
      }
    }
  }, [cards, turns]);

  return {
    cards,
    turns,
    highScore,
    disabled,
    shuffleCards,
    handleChoice,
    choiceOne,
    choiceTwo,
  };
}


