import React, { useState, useRef, useEffect } from 'react'
import { Box } from '@material-ui/core/';
import Map from './Map'

const getImagePath = (mapName) => {
  return process.env.PUBLIC_URL + "/maps/" + mapName + ".jpg"
}

const calculatePositionMultiplier = (initialSize, currentSize) => {
  return currentSize / initialSize
}


function MapContainer(props) {
  const { mapName, roundFrames, currentFrame } = props
  const [imgWidth, setImgWidth] = useState(null)
  const ref = useRef(null);
  const boudingBoxCheck = ref?.current?.getBoundingClientRect?.()

  useEffect(() => {
    const boundingBox = ref?.current?.getBoundingClientRect?.();
    setImgWidth(boundingBox.width)
  }, [boudingBoxCheck]);



  return (
    <Box
      maxHeight="100%"
      maxWidth="650px"
      position="relative"
      ref={ref}>
      <Map
        grenades={roundFrames[currentFrame].Grenades}
        infernos={roundFrames[currentFrame].Infernos}
        players={roundFrames[currentFrame].Players}
        imgWidth={imgWidth}
        calculatePositionMultiplier={calculatePositionMultiplier}
        mapPath={getImagePath(mapName)}
      />
    </Box>

  )
}

export default MapContainer
