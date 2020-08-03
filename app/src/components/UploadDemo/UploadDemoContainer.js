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

const handleDateChange = (date, value, setSelectedDate) => {
  setSelectedDate({ date: date, value: value });
};

function UploadDemoContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ date: new Date('2020-01-01T21:11:54'), value: "01/01/2020" });
  const token = Cookies.get("jwt")

  return (
    <div>
      {token ?
        isLoading ?
          <Loading />
          :
          <UploadDemo
            onFormSubmit={(event) => uploadDemoCallback(event, setIsLoading, selectedDate.value)}
            handleDateChange={(date, value) => handleDateChange(date, value, setSelectedDate)}
            selectedDate={selectedDate.date}
          /> :
        <Error />
      }
    </div>

  )
}

export default UploadDemoContainer
