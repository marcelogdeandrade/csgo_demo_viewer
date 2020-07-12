import React from 'react'
import Slider from '@material-ui/core/Slider';

function Rounds(props) {
    const max = props.rounds.length + 1
    return (
        <div>
            <Slider
                defaultValue={props.current}
                onChangeCommitted={props.changeRoundCallback}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={max}
            />
        </div>
    )
}

export default Rounds
