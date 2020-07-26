import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../Loading/Loading';
import Demo from './Demo'
import Box from '@material-ui/core/Box';

const fetchDemo = (demoName, setDemo) => {
  if (!demoName) { return null }
  const url = "http://localhost:8080/get_demo/" + demoName
  return fetch(url)
    .then(response => response.json())
    .then(data => setDemo(data))
    .catch(err => console.log(err))
}

const filterRound = (currentRound, frames, rounds) => {
  if (!frames) { return null }
  const filteredFrame = frames.filter(frame => frame.Round === currentRound)
  return {
    frames: filteredFrame,
    startTime: rounds[currentRound].StartTime
  }
}


function DemoContainer(props) {
  const { id } = useParams();
  const [demo, setDemo] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [roundFrames, setRoundFrames] = useState(null)

  const changeRound = (value) => {
    setCurrentRound(value)
  }

  useEffect(() => {
    if (!demo) { return }
    setRoundFrames(filterRound(currentRound, demo.Frames, demo.Rounds))
  }, [currentRound, demo]);

  useEffect(() => {
    fetchDemo(id, setDemo)
    setCurrentRound(0)
  }, [id]);

  return (
    <Box>
      {roundFrames ?
        <Demo
          demo={demo}
          roundFrames={roundFrames}
          mapName={demo.MapName}
          rounds={demo.Rounds}
          currentRound={currentRound}
          maxRounds={demo.Rounds.length}
          changeRoundCallback={changeRound}
        /> : <Loading />}
    </Box>
  )
}

export default DemoContainer
