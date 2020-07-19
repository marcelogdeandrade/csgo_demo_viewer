import React, { useState } from 'react'
import UploadDemo from './UploadDemo'
import Loading from '../Loading/Loading'

const uploadDemoCallback = (c, setIsLoading) => {
  const file = c.target.files[0]
  const formData = new FormData();
  formData.append("file", file, "upload_teste.dem")
  const url = "http://localhost:8080/upload_demo"
  setIsLoading(true)
  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(response => console.log(response))
    .then(_ => setIsLoading(false))
    .catch(err => console.log(err))

}

function UploadDemoContainer() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {
        isLoading ?
          <Loading />
          :
          <UploadDemo
            onFormSubmit={(event) => uploadDemoCallback(event, setIsLoading)}
          />
      }
    </div>

  )
}

export default UploadDemoContainer
