import React from 'react'
import { Peer } from "peerjs"
import { io } from "socket.io-client"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const JoinStream = () => {
  const { ROOM_ID } = useParams()
  console.log(useParams())

  useEffect(() => {
    const myPeer = new Peer()
    const socket = io('https://nice-stone-guitar.glitch.me/')
    const videoGrid = document.getElementById('video-grid')
    const myVideo = document.createElement('video')
    myVideo.muted = true
    const peers = {}

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(myVideo, stream)

      myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

      socket.on('user-connected', userId => {
        console.log(`${userId} user-connected`)
        connectToNewUser(userId, stream)
      })
    })

    socket.on('user-disconnected', userId => {
      console.log(`${userId} user-disconnected`)
      if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id)
    })

    function connectToNewUser(userId, stream) {
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
    <div>
      <div id="video-grid"></div>
    </div>
  )
}

export default JoinStream