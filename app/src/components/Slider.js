import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SliderMaterial from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(SliderMaterial);

function Slider(props) {
    return (
        <PrettoSlider
            onChange={props.onChange}
            default={props.defaultValue}
            min={props.min}
            max={props.max}
        />
    )
}

export default Slider
