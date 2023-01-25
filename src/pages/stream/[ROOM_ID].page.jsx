import React, { useState } from 'react'
import { Peer } from "peerjs"
import { io } from "socket.io-client"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from "../../components/layout/Layout.component"


const JoinStream = () => {
  const { ROOM_ID } = useParams()
  const [droneDevice, setDroneDevice] = useState(false)
  const { SOCKET_URL, DRONE_ROOM_ID } = require('../../utils/constants')


  useEffect(() => {
    if (ROOM_ID == DRONE_ROOM_ID) {
      (async function () {
        try {
          const response = await fetch(`${SOCKET_URL}/clients?roomId=${DRONE_ROOM_ID}`)
          const result = await response.json()
          const deviceAlreadyStreaming = result.numOfClients !== 0
          if (!deviceAlreadyStreaming) {
            setDroneDevice(true)
          }
        } catch (err) {
          console.log(err)
        }
      })()
    }

    const myPeer = new Peer()
    const socket = io(SOCKET_URL)
    const videoGrid = document.getElementById('video-grid')
    const myVideo = document.createElement('video')
    myVideo.muted = true
    const peers = {}

    console.log({ ROOM_ID, droneDevice })

    // NORMAL USECASE
    if (ROOM_ID != DRONE_ROOM_ID || droneDevice) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        addVideoStream(myVideo, stream)
        // answer a call
        myPeer.on('call', call => {
          console.log('call received... answering')

          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            console.log('receiving stream...')
            addVideoStream(video, userVideoStream)
          })
        })

        // whenever a new user joins
        socket.on('user-connected', userId => {
          console.log(`${userId} user-connected`)
          // call the new user
          connectToNewUser(userId, stream)
        })
      })
    } else {
      // ABNORMAL USECASE
      myPeer.on('call', call => {
        console.log('call received... answering')
        call.answer()
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          console.log('receiving stream...')
          addVideoStream(video, userVideoStream)
        })
      })

      // whenever a new user joins
      socket.on('user-connected', userId => {
        console.log(`${userId} user-connected`)
        console.log({ ROOM_ID, droneDevice })
        // call the new user
        connectToNewUser(userId, stream)
      })

    }

    socket.on('user-disconnected', userId => {
      console.log(`${userId} user-disconnected`)
      if (peers[userId]) peers[userId].close()
    })

    // on-connection
    myPeer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id)
    })

    function connectToNewUser(userId, stream) {
      // make a call
      console.log('calling new user...')
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })

      peers[userId] = call
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      videoGrid.append(video)
    }

  }, [])


  return (
    <Layout>
      <div className='container py-4'>
        <div id='video-grid'></div>
      </div>
    </Layout>
  )
}

export default JoinStream