import React, { useState } from 'react';
import inferno from './json/inferno2.json'
import DemoPlayer from './components/DemoPlayer'
import Grid from '@material-ui/core/Grid';
import Rounds from './components/Rounds'
import './App.css';


const getPlayerStates = (jsonFile, startFrame, endFrame) => {
  const states = jsonFile.States.slice(startFrame, endFrame)
  return states.map(state => {
    return {
      players: state.Players,
      timeElapsed: state.Time
    }
  })
}

const getRounds = (jsonFile) => {
  return jsonFile.RoundStarts
    .map((curr, idx, rounds) => {
      const currentFrame = curr.Frame
      const endFrame = idx < rounds.length - 1 ? rounds[idx + 1].Frame : jsonFile.States.length
      return {
        round: idx + 1,
        startFrame: currentFrame,
        endFrame: endFrame,
        roundTime: curr.RoundTime
      }
    })
}

const changeRound = (value, setCurrentRoundIdx) => {
  setCurrentRoundIdx(value - 1)
}

const rounds = getRounds(inferno)

function App() {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);

  const states = getPlayerStates(inferno, rounds[currentRoundIdx].startFrame, rounds[currentRoundIdx].endFrame)
  return (
    <Grid
      spacing={2}
      direction="column"
      alignItems="center"
      container
    >
      <Grid
        item xs={5}>
        <DemoPlayer
          states={states}
          currentRound={rounds[currentRoundIdx]}
        />
        <Rounds
          rounds={rounds}
          current={currentRoundIdx + 1}
          changeRoundCallback={(e, value) => changeRound(value, setCurrentRoundIdx)}
        />
      </Grid>
    </Grid  >
  );
}

export default App;
