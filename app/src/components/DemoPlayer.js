import React, { useState, useRef, useEffect } from 'react';
import Player from './Player'
import Image from './Image'
import { useInterval } from '../utils'
import Box from '@material-ui/core/Box';
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

  const delay = 1000 / 100

  useInterval(() => {
    updatePosition()
  }, isRunning ? delay : null)

  useEffect(() => {
    const boundingBox = ref?.current?.getBoundingClientRect?.();
    setImgWidth(boundingBox.width)
  });


  return (
    <Box
      ref={ref}
      maxWidth="100%"
      maxHeight="100%"
      position="relative">
      <Image
        path={process.env.PUBLIC_URL + "/overviews/de_inferno.jpg"}
      />
      {renderPlayers(props.states[currentIdx], imgWidth)}
      <Slider
        onChange={(e, value) => changeFrame(setIsRunning, setCurrentIdx, value)}
        min={0}
        max={props.states.length}
        defaultValue={currentIdx}
      />
    </Box>
  )
}

export default DemoPlayer
