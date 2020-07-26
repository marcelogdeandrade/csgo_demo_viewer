import React, { useState, useRef, useEffect } from 'react'
import { Box, Grid } from '@material-ui/core/';
import DemoPlayer from './DemoPlayer'
import Player from './Player'
import Grenade from './Grenade'
import constants from '../../../constants'
import Inferno from './Inferno';
import TeamPlayerInfo from './PlayerInfo/TeamPlayerInfo'
import PlayerHeader from './PlayerHeader'

const getImagePath = (mapName) => {
  return process.env.PUBLIC_URL + "/maps/" + mapName + ".jpg"
}

const calculatePositionMultiplier = (initialSize, currentSize) => {
  return currentSize / initialSize
}

const getPlayers = (frames, currentIdx) => {
  if (!frames) return []
  if (currentIdx >= frames.length) return []
  return frames[currentIdx].Players
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

const getCts = (players) => {
  return players
    .filter(player => player.Team === "Counter-Terrorists")
    .sort((a, b) => a.ID - b.ID)
}

const getTrs = (players) => {
  return players
    .filter(player => player.Team === "Terrorists")
    .sort((a, b) => a.ID - b.ID)
}

const getTerroristTeam = (frames, currentIdx) => {
  if (!frames) return ""
  if (currentIdx >= frames.length) return ""
  return frames[currentIdx].Terrorists
}

const getCounterTerroristsTeam = (frames, currentIdx) => {
  if (!frames) return ""
  if (currentIdx >= frames.length) return ""
  return frames[currentIdx].CounterTerrorists
}

function DemoPlayerContainer(props) {
  const { mapName, roundFrames } = props
  const [currentIdx, setCurrentIdx] = useState(constants.ROUND_START_FRAME)
  const [players, setPlayers] = useState(getPlayers(roundFrames.frames, constants.ROUND_START_FRAME))
  const [terrorists, setTerrorists] = useState(getTerroristTeam(roundFrames.frames, constants.ROUND_START_FRAME))
  const [counterTerrorists, setCounterTerrorists] = useState(getCounterTerroristsTeam(roundFrames.frames, constants.ROUND_START_FRAME))
  const [grenades, setGrenades] = useState(getGrenades(roundFrames.frames, constants.ROUND_START_FRAME))
  const [infernos, setInfernos] = useState(getInfernos(roundFrames.frames, constants.ROUND_START_FRAME))
  const [currentTime, setCurrentTime] = useState(getCurrentTime(roundFrames.frames, constants.ROUND_START_FRAME))
  const [imgWidth, setImgWidth] = useState(null)
  const ref = useRef(null);
  const boudingBoxCheck = ref?.current?.getBoundingClientRect?.()


  const renderPlayers = () => {
    if (players) {
      return players
        .filter(player => player.IsAlive)
        .map(player => {
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
    setCurrentIdx(constants.ROUND_START_FRAME)
  }, [roundFrames]);

  useEffect(() => {
    setPlayers(getPlayers(roundFrames.frames, currentIdx))
    setGrenades(getGrenades(roundFrames.frames, currentIdx))
    setInfernos(getInfernos(roundFrames.frames, currentIdx))
    setCurrentTime(getCurrentTime(roundFrames.frames, currentIdx))
    setTerrorists(getTerroristTeam(roundFrames.frames, currentIdx))
    setCounterTerrorists(getCounterTerroristsTeam(roundFrames.frames, currentIdx))
  }, [currentIdx, roundFrames]);

  useEffect(() => {
    const boundingBox = ref?.current?.getBoundingClientRect?.();
    setImgWidth(boundingBox.width)
  }, [boudingBoxCheck]);

  return (
    <Grid
      direction="row"
      container
      justify="center">
      <Grid item xs={2}>
        <TeamPlayerInfo
          players={getTrs(players)}
          team={terrorists}
          side={"Terrorists"}
        />
      </Grid>
      <Grid item>
        <PlayerHeader
          trScore={terrorists.Score}
          ctScore={counterTerrorists.Score}
          timeLeft={currentTime}
        />
        <Box
          maxHeight="100%"
          maxWidth="650px"
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
      </Grid>
      <Grid xs={2} justify="center">
        <TeamPlayerInfo
          players={getCts(players)}
          team={counterTerrorists}
          side={"Counter-Terrorists"} />
      </Grid>
    </Grid>
  )
}

export default DemoPlayerContainer
