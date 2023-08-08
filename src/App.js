import React, { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
const RandomNumber = () => {
  const digits = Array.from({ length: 10 }, (_, i) => i);
  const result = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    const digit = digits.splice(randomIndex, 1)[0];
    result.push(digit);
  }
  return result.join("");
};

function App() {
  const [gameState, setGameState] = useState("start");
  const [userName, setUserName] = useState("");
  const [computerNumber, setComputerNumber] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const startNewGame = () => {
    setGameState("enterName");
    setUserName("");
    setComputerNumber(RandomNumber());
    setUserGuess("");
    setFeedback("");
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setGameState("playing");
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    const computerDigits = computerNumber.split("");
    const userDigits = userGuess.split("");
    let plus = 0;
    let minus = 0;

    for (let i = 0; i < 4; i++) {
      if (computerDigits[i] === userDigits[i]) {
        plus++;
      } else if (computerDigits.includes(userDigits[i])) {
        minus++;
      }
    }

    if (plus === 4) {
      setFeedback(" You guessed the number correctly.");
    } else {
      setFeedback(`+${plus}, *${minus}`);
    }

    setUserGuess("");
  };

  return (
    <div className="guess">
      <div>
        {gameState === "start" && (
          <Button variant="contained" onClick={startNewGame}>
            Start New Game
          </Button>
        )}
        {gameState === "enterName" && (
          <form onSubmit={handleNameSubmit}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Enter your name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        )}
        {gameState === "playing" && (
          <div>
            <h3>Hello, {userName}! guess the 4-digit number</h3>
            <form onSubmit={handleGuessSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  maxLength={4}
                  id="outlined-basic"
                  label="Enter your guess"
                  variant="outlined"
                />
                <Button variant="contained" type="submit">
                  Guess
                </Button>
              </Stack>
            </form>
            {feedback && <h1>result: {feedback}</h1>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
