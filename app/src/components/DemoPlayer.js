import React, { useState, useRef, useEffect } from 'react';
import Player from './Player'
import Image from './Image'
import { useInterval, formatTime } from '../utils'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { IMG_SIZE } from '../constats'
import Slider from './Slider'

const parsePlayer = (player) => {
  return { x: player.X, y: player.Y, team: player.Team }
}

const calculatePositionMultiplier = (initialSize, currentSize) => {
  return currentSize / initialSize
}

const renderPlayers = (players, imgCurrentSize) => {
  if (players) {
    return players.map(player => {
      return <Player
        player={(parsePlayer(player))}
        positionMultipler={calculatePositionMultiplier(IMG_SIZE, imgCurrentSize)}
      />
    })
  } return []
}

const changeFrame = (setIsRunning, setCurrentIdx, value) => {
  setCurrentIdx(value)
}

const calculateTimer = (roundTime, roundStartTime, currentTime) => {
  const roundTimeElapsed = currentTime - roundStartTime
  const remainingTime = roundTime - roundTimeElapsed

  return formatTime(remainingTime)
}

const delay = 1000 / 6

function DemoPlayer(props) {
  const ref = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgWidth, setImgWidth] = useState(null)
  const [isRunning, setIsRunning] = useState(false);


  const updatePosition = () => {
    if (currentIdx < props.states.length - 1) {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const remainingTime = calculateTimer(props.currentRound.roundTime, props.states[0].timeElapsed, props.states[currentIdx].timeElapsed)

  useInterval(() => {
    updatePosition()
  }, isRunning ? delay : null)

  useEffect(() => {
    const boundingBox = ref?.current?.getBoundingClientRect?.();
    setImgWidth(boundingBox.width)
  }, []);

  return (
    <Box
      ref={ref}
      maxWidth="100%"
      maxHeight="100%"
      position="relative">
      <Box>
        {remainingTime}
      </Box>
      <Image
        path={process.env.PUBLIC_URL + "/overviews/de_inferno.jpg"}
      />
      {renderPlayers(props.states[currentIdx].players, imgWidth)}
      <Box display="flex" justifyContent="center">
        <IconButton color="primary" size="large">
          <PlayCircleFilledIcon
            onClick={() => setIsRunning(true)}
          />
        </IconButton>
        <IconButton color="primary">
          <PauseCircleFilledIcon
            onClick={() => setIsRunning(false)}
          />
        </IconButton>
      </Box>
      <Slider
        onChange={(e, value) => changeFrame(setIsRunning, setCurrentIdx, value)}
        min={0}
        value={currentIdx}
        max={props.states.length - 1}
        defaultValue={currentIdx}
      />
    </Box>
  )
}

export default DemoPlayer
