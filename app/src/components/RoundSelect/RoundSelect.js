import React from 'react'
import { ButtonGroup, Button, Grid } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  selected: {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  }
})


function RoundSelect(props) {
  const classes = useStyles()

  const renderRoundSelection = (round, idx, currentRound, changeRound) => {
    const winnerColor = round.Winner === "Terrorists" ? "#f44336" : "#3f51b5"
    const selected = currentRound === idx ? true : false

    return <Button
      value={idx}
      className={selected ? classes.selected : null}
      onClick={() => changeRound(idx)}>
      <Grid container direction="column">
        <Grid item>
          <FiberManualRecordIcon
            style={{ color: winnerColor }}
            fontSize="small" />
        </Grid>
        <Grid item>
          {idx + 1}
        </Grid>
      </Grid>
    </Button>
  }

  const renderButtons = (rounds, currentRound, changeRound) => {
    return rounds.map((round, idx) => {
      return renderRoundSelection(round, idx, currentRound, changeRound)
    })
  }

  return (
    <Grid
      direction="row"
      container
      justify="center">
      <Grid item>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {renderButtons(props.rounds, props.currentRound, props.changeRoundCallback)}
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default RoundSelect
