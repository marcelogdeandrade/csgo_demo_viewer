import React, { useState } from 'react'
import UploadDemo from './UploadDemo'
import Loading from '../Loading/Loading'
import { fetchUrl } from '../../url'

const uploadDemoCallback = (c, setIsLoading, selectedDate) => {
  const file = c.target.files[0]
  const formData = new FormData();
  formData.append("file", file, "demo.dem")
  formData.append("date", selectedDate)
  const url = fetchUrl() + "/upload_demo"
  setIsLoading(true)
  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(_ => setIsLoading(false))
    .catch(err => console.log(err))

}

const handleDateChange = (date, setSelectedDate) => {
  setSelectedDate(date);
};

function UploadDemoContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2020-01-01T21:11:54'));

  return (
    <div>
      {
        isLoading ?
          <Loading />
          :
          <UploadDemo
            onFormSubmit={(event) => uploadDemoCallback(event, setIsLoading, selectedDate)}
            handleDateChange={(date) => handleDateChange(date, setSelectedDate)}
            selectedDate={selectedDate}
          />
      }
    </div>

  )
}

export default UploadDemoContainer
