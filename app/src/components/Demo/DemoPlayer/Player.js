import React from 'react'
import Box from '@material-ui/core/Box';
import constants from '../../../constants'
import { makeStyles } from '@material-ui/core/styles';
import TollTwoToneIcon from '@material-ui/icons/TollTwoTone';

const useStyles = makeStyles({
  direction: props => ({
    position: "absolute",
    transform: `rotate(${-parseInt(props.viewDirection) - 180}deg)`,
    left: props.left,
    top: props.top,
    color: props.backgroundColor
  })
})

function Player(props) {
  const { player, positionMultipler } = props
  const playerSize = constants.PLAYER_SIZE * positionMultipler
  const x = (player.X - 5 - playerSize / 2) * positionMultipler
  const y = (player.Y + 5 - playerSize / 2) * positionMultipler
  const styleProps = {
    viewDirection: props.player.ViewDirection,
    left: x,
    top: y,
    backgroundColor: player.Team === "Terrorists" ? "#ba000d" : "#002984",
    playerSize: playerSize
  }
  const classes = useStyles(styleProps);

  return (
    <Box>
      <TollTwoToneIcon
        fontSize="small"
        className={classes.direction}
      />
    </Box>
  )
}

export default Player
