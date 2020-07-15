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
      players: parsePlayers(state.Players),
      grenades: parseGrenades(state.Grenades, state.GrenadeExplodes),
      timeElapsed: state.Time
    }
  }).map((state, i, states) => {
    const previousGrenades = i > 0 ? states[i - 1].grenades : []
    const currentGrenades = state.grenades.map(grenade => {
      const previousGrenade = getGrenade(previousGrenades, grenade.id)
      const isExploded = previousGrenade ? previousGrenade.isExploded : false
      grenade.isExploded = isExploded || grenade.isExploded
      return grenade
    })
    state.grenades = currentGrenades
    return state
  })
}

const getGrenade = (grenades, id) => {
  return grenades.find(grenade => grenade.id === id);
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

const parseGrenades = (grenades, grenadeExplodes) => {
  return grenades.map(grenade => {
    const isExploded = grenadeExplodes.includes(grenade.ID)
    return {
      x: grenade.X,
      y: grenade.Y,
      type: grenade.Type,
      id: grenade.ID,
      isExploded: isExploded
    }
  })
}

const parsePlayers = (players) => {
  return players.map(player => {
    return { x: player.X, y: player.Y, team: player.Team }

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
