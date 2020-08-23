import React, { useState } from 'react'
import UploadDemo from './UploadDemo'
import Loading from '../Loading/Loading'
import { fetchUrl } from '../../url'
import Error from '../Error/Error'
import Cookies from 'js-cookie';
import axios from 'axios';

const processDemo = (matchID, selectedDate, setIsLoading) => {
  const formData = new FormData();
  formData.append("match_id", matchID)
  formData.append("date", selectedDate)
  const url = fetchUrl() + "/auth/upload_demo"

  const payLoad = {
    method: "POST",
    credentials: 'include',
    body: formData
  }

  fetch(url, payLoad)
    .then(response => response.json())
    .then(_ => setIsLoading(false))
}

const getUploadURL = (c, setIsLoading, selectedDate) => {
  const file = c.target.files[0]
  const url = fetchUrl() + "/auth/upload_demo"
  fetch(url, {
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => uploadDemo(file, setIsLoading, selectedDate, data.upload_url, data.match_id))
}

const uploadDemo = (file, setIsLoading, selectedDate, url, matchID) => {
  setIsLoading(true)

  const options = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
  }
  axios({
    method: "PUT",
    url: url,
    data: file,
    headers: {
      "Content-Type": "binary/octet-stream",
      accept: "binary/octet-stream",
    },
    options: options
  })
    .then(_ => processDemo(matchID, selectedDate, setIsLoading))
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
            onFormSubmit={(event) => getUploadURL(event, setIsLoading, selectedDate.value)}
            // onFormSubmit={(event) => uploadDemoCallback(event, setIsLoading, selectedDate.value)}
            handleDateChange={(date, value) => handleDateChange(date, value, setSelectedDate)}
            selectedDate={selectedDate.date}
          /> :
        <Error />
      }
    </div>

  )
}

export default UploadDemoContainer
