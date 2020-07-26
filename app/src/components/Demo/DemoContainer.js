import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import Demo from './Demo'
import Box from '@material-ui/core/Box';
import constants from '../../constants';
import { useInterval } from '../../utils'

const filterRound = (currentRound, frames) => {
  return frames.filter(frame => frame.Round === currentRound)
}

const getPlaySpeed = (frameRate, frameFactor) => {
  return 1000 / (frameRate / frameFactor)
}

const getTeamPlayers = (players, team) => {
  return players
    .filter(player => player.Team === team)
    .sort((a, b) => a.ID - b.ID)
}

function DemoContainer({ demo }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(constants.ROUND_START_FRAME)
  const [roundFrames, setRoundFrames] = useState(filterRound(currentRound, demo.Frames))
  const [isPlaying, setIsPlaying] = useState(false)

  const players = roundFrames[currentFrame].Players
  const terroristPlayers = getTeamPlayers(players, "Terrorists")
  const counterTerroristPlayers = getTeamPlayers(players, "Counter-Terrorists")
  const playSpeed = getPlaySpeed(demo.FrameRate, demo.FrameFactor)

  const changeRound = (value) => {
    setCurrentRound(value)
  }

  const changeFrame = (value) => {
    setCurrentFrame(value)
  }

  useEffect(() => {
    setRoundFrames(filterRound(currentRound, demo.Frames))
    setCurrentFrame(constants.ROUND_START_FRAME)
  }, [currentRound, demo]);

  useEffect(() => {
    setCurrentRound(0)
  }, [demo]);

  useInterval(() => {
    if (currentFrame < roundFrames.length) {
      setCurrentFrame(currentFrame + 1)
    }
  }, isPlaying ? playSpeed : null)


  return (
    <Box>
      {roundFrames ?
        <Demo
          playSpeed={playSpeed}
          roundFrames={roundFrames}
          mapName={demo.MapName}
          rounds={demo.Rounds}
          currentRound={currentRound}
          maxRounds={demo.Rounds.length}
          maxFrames={roundFrames.length - 1}
          changeRoundCallback={changeRound}
          changeFrameCallback={changeFrame}
          isPlaying={isPlaying}
          isPlayingCallback={setIsPlaying}
          terroristPlayers={terroristPlayers}
          terroristTeam={roundFrames[currentFrame].Terrorists}
          currentTime={roundFrames[currentFrame].Time}
          counterTerroristTeam={roundFrames[currentFrame].CounterTerrorists}
          counterTerroristPlayers={counterTerroristPlayers}
          currentFrame={currentFrame}
          players={players}
        /> : <Loading />}
    </Box>
  )
}

export default DemoContainer
