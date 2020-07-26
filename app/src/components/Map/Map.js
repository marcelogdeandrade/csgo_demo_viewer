import React from 'react'
import { Box } from '@material-ui/core/';
import Player from './Player'
import Grenade from './Grenade'
import constants from '../../constants'
import Inferno from './Inferno';
import Image from '../Image/Image'


function Map(props) {
  const { players, grenades, infernos, imgWidth, calculatePositionMultiplier, mapPath } = props
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
  return (
    <Box>
      <Image path={mapPath} />
      {renderInfernos()}
      {renderGrenades()}
      {renderPlayers()}
    </Box>
  )
}

export default Map
