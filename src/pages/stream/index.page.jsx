import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const { v4: uuidV4 } = require('uuid')
import Layout from "../../components/layout/Layout.component"

const Stream = () => {
  const { DRONE_ROOM_ID, SOCKET_URL } = require('../../utils/constants')

  const navigate = useNavigate();
  const [customRoomID, setCustomRoomID] = useState()

  const startStreaming = async (e) => {
    e.preventDefault()

    // don't start stream if a device is already streaming at DRONE_ROOM_ID
    try {
      const response = await fetch(`${SOCKET_URL}/clients?roomId=${DRONE_ROOM_ID}`)
      const result = await response.json()
      const deviceAlreadyStreaming = result.numOfClients !== 0
      if (deviceAlreadyStreaming) {
        alert('A device is already streaming!')
        return
      }
    } catch (err) {
      console.log(err)
    }
    redirect(DRONE_ROOM_ID)
  }

  const joinStream = async (e) => {
    e.preventDefault()

    // if trying to join DRONE_ROOM_ID stream
    // don't join if no device is already streaming
    if (customRoomID == DRONE_ROOM_ID) {
      try {
        const response = await fetch(`${SOCKET_URL}/clients?roomId=${DRONE_ROOM_ID}`)
        const result = await response.json()
        const deviceAlreadyStreaming = result.numOfClients !== 0
        if (!deviceAlreadyStreaming) {
          alert(`No device is currently streaming at ${DRONE_ROOM_ID} Room`)
          return
        }
      } catch (err) {
        console.log(err)
      }
    }
    redirect(customRoomID)
  }

  const redirect = async (ROOM_ID) => {
    // assign a random ROOM_ID if no ID is passed
    if (!ROOM_ID) {
      ROOM_ID = uuidV4()
    }
    console.log(droneDevice)
    navigate(`/stream/${ROOM_ID}`)
  }

  return (
    <Layout>
      <div className='container py-4'>

        <form className='form py-4' onSubmit={(e) => { joinStream(e) }}>
          <h3 className='mb-3'>If this device is with you &rarr;</h3>
          <div>
            <label htmlFor="room-id-join" className="form-label">Enter Room ID</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">wcarl-drone.vercel.app/stream/</span>
              <input type="text" className="form-control" id="room-id-join" aria-describedby="basic-addon3" required onChange={(e) => setCustomRoomID(e.target.value)} />
            </div>
          </div>
          <button id="join-stream" type="submit" className="btn btn-primary">Join Stream</button>
        </form>

        <form className='form py-4' onSubmit={(e) => { startStreaming(e) }}>
          <h3 className='mb-3'>If this device is/will be on a drone &rarr;</h3>
          <div>
            <label htmlFor="room-id-stream" className="form-label">Enter Room ID</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">wcarl-drone.vercel.app/stream/</span>
              <input type="text" className="form-control" disabled id="room-id-stream" aria-describedby="basic-addon3" value={DRONE_ROOM_ID} />
            </div>
          </div>
          <button id="start-stream" type="submit" className="btn btn-outline-primary">Start Streaming</button>
        </form>

      </div>
    </Layout>
  )
}

export default Stream