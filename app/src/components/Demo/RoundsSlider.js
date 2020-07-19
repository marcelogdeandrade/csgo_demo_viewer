import React from 'react'
import Slider from '@material-ui/core/Slider';

function Rounds(props) {
    return (
        <div>
            <Slider
                defaultValue={props.currentRound}
                onChangeCommitted={(e, value) => props.changeRoundCallback(value)}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={props.maxRounds}
            />
        </div>
    )
}

export default Rounds
