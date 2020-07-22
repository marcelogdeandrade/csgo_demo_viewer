import React, { useState, useRef, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import DemoPlayer from './DemoPlayer'
import Player from './Player'
import Grenade from './Grenade'
import constants from '../../../constants'
import Inferno from './Inferno';

const getImagePath = (mapName) => {
  return process.env.PUBLIC_URL + "/maps/" + mapName + ".jpg"
}

const calculatePositionMultiplier = (initialSize, currentSize) => {
  return currentSize / initialSize
}

const getPlayers = (frames, currentIdx) => {
  if (!frames) return []
  if (currentIdx >= frames.length) return []
  return frames[currentIdx].Players.filter(player => player.IsAlive)
}

const getGrenades = (frames, currentIdx) => {
  if (!frames) return []
  if (currentIdx >= frames.length) return []
  return frames[currentIdx].Grenades
}

const getInfernos = (frames, currentIdx) => {
  if (!frames) return []
  if (currentIdx >= frames.length) return []
  return frames[currentIdx].Infernos
}

const getCurrentTime = (frames, currentIdx) => {
  if (!frames) return []
  if (currentIdx >= frames.length) return []
  return frames[currentIdx].Time
}

const changeFrame = (setCurrentIdx, value) => {
  setCurrentIdx(value)
}

function DemoPlayerContainer(props) {
  const { mapName, roundFrames } = props
  const [currentIdx, setCurrentIdx] = useState(0)
  const [players, setPlayers] = useState(getPlayers(roundFrames.frames, 0))
  const [grenades, setGrenades] = useState(getGrenades(roundFrames.frames, 0))
  const [infernos, setInfernos] = useState(getInfernos(roundFrames.frames, 0))
  const [currentTime, setCurrentTime] = useState(getCurrentTime(roundFrames.frames, 0))
  const [imgWidth, setImgWidth] = useState(null)
  const ref = useRef(null);

  const renderPlayers = () => {
    if (players) {
      return players.map(player => {
        return <Player
          player={(player)}
          positionMultipler={calculatePositionMultiplier(constants.IMG_SIZE, imgWidth)}
        />
      })
    } return []
  }

  const renderGrenades = () => {
    if (grenades) {
      return grenades.map(grenade => {
        return <Grenade
          grenade={grenade}
          positionMultipler={calculatePositionMultiplier(constants.IMG_SIZE, imgWidth)}
        />
      })
    } return []
  }

  const renderInfernos = () => {
    if (infernos) {
      return infernos.map(inferno => {
        return <Inferno
          inferno={inferno}
          positionMultipler={calculatePositionMultiplier(constants.IMG_SIZE, imgWidth)}
        />
      })
    }
  }

  useEffect(() => {
    setCurrentIdx(0)
  }, [roundFrames]);

  useEffect(() => {
    setPlayers(getPlayers(roundFrames.frames, currentIdx))
    setGrenades(getGrenades(roundFrames.frames, currentIdx))
    setInfernos(getInfernos(roundFrames.frames, currentIdx))
    setCurrentTime(getCurrentTime(roundFrames.frames, currentIdx))
  }, [currentIdx, roundFrames]);

  useEffect(() => {
    const boundingBox = ref?.current?.getBoundingClientRect?.();
    setImgWidth(boundingBox.width)
  }, [ref?.current?.getBoundingClientRect?.()]);

  return (
    <Box
      maxHeight="100%"
      position="relative"
      ref={ref}>
      <DemoPlayer
        mapPath={getImagePath(mapName)}
        setImgWidthCallback={setImgWidth}
        renderPlayers={renderPlayers}
        renderGrenades={renderGrenades}
        renderInfernos={renderInfernos}
        changeFrame={(value) => changeFrame(setCurrentIdx, value)}
        currentIdx={currentIdx}
        maxFrames={roundFrames.frames.length - 1}
        currentTime={currentTime}
      />
    </Box>
  )
}

export default DemoPlayerContainer
