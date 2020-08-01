import React, { useState } from 'react'
import UploadDemo from './UploadDemo'
import Loading from '../Loading/Loading'
import { fetchUrl } from '../../url'
import Error from '../Error/Error'
import Cookies from 'js-cookie';

const uploadDemoCallback = (c, setIsLoading, selectedDate) => {
  const file = c.target.files[0]
  const formData = new FormData();
  formData.append("file", file, "demo.dem")
  formData.append("date", selectedDate)
  const url = fetchUrl() + "/auth/upload_demo"
  setIsLoading(true)
  fetch(url, {
    method: "POST",
    credentials: 'include',
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
  const token = Cookies.get("jwt")

  return (
    <div>
      {token ?
        isLoading ?
          <Loading />
          :
          <UploadDemo
            onFormSubmit={(event) => uploadDemoCallback(event, setIsLoading, selectedDate)}
            handleDateChange={(date) => handleDateChange(date, setSelectedDate)}
            selectedDate={selectedDate}
          /> :
        <Error />
      }
    </div>

  )
}

export default UploadDemoContainer
