import React, { useState } from 'react';
import inferno from './json/inferno2.json'
import DemoPlayer from './components/DemoPlayer'
import Grid from '@material-ui/core/Grid';
import Rounds from './components/Rounds'
import './App.css';


const getPlayerStates = (jsonFile, startFrame, endFrame) => {
  const states = jsonFile.States.slice(startFrame, endFrame)
  return states.map(state => {
    return state.Players
  })
}

const getRounds = (jsonFile) => {
  return jsonFile.RoundStarts.map((curr, idx, rounds) => {
    const endFrame = idx < rounds.length ? rounds[idx + 1] : jsonFile.States.length
    return {
      round: idx + 1,
      startFrame: curr,
      endFrame: endFrame
    }
  })
}

const changeRound = (value, setCurrentRoundIdx) => {
  setCurrentRoundIdx(value)
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
