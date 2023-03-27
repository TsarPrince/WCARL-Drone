import React, { useState } from "react"
import { Peer } from "peerjs"
import { io } from "socket.io-client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Layout from "../../components/layout/Layout.component"

const chunks = []

const JoinStream = () => {
  const { ROOM_ID } = useParams()
  const { SOCKET_URL, DRONE_ROOM_ID } = require("../../utils/constants")

  const [recording, setRecording] = useState([])
  const [recorder, setRecorder] = useState(null)
  const [stream, setStream] = useState(null)
  const [isRecording, setIsRecording] = useState(false)

  const createFileFormCurrentRecordedData = (event) => {
    const blob = new Blob(chunks, { type: "video/mp4" })
    const file = new File([blob], "drone.mp4", { type: "video/mp4" })
    console.log(file)
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = "drone.mp4"

    a.click()
  }

  useEffect(() => {
    if (stream && !isRecording) {
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        console.log(event.data)
        chunks.push(event.data)
        setRecording((store) => [...store, event.data])
        console.log(recording)
        console.log(chunks)
      }

      mediaRecorder.onstart = (e) => {
        console.log("Starting recording...")
        setIsRecording(true)
      }
      mediaRecorder.onstop = (e) => createFileFormCurrentRecordedData(e)

      setRecorder(mediaRecorder)
    }
  }, [stream])

  const handleStart = () => {
    if (recorder) recorder.start(1000)
  }

  const handleEnd = () => {
    if (recorder && recorder.state === "recording") recorder.stop()
  }

  useEffect(() => {
    let mediaRecorder = null

    ;(async () => {
      let droneDevice = false
      if (ROOM_ID == DRONE_ROOM_ID) {
        try {
          console.log("checking for drone device...")
          const response = await fetch(`${SOCKET_URL}/clients?roomId=${DRONE_ROOM_ID}`)
          const result = await response.json()
          console.log(result)
          const deviceAlreadyStreaming = result.numOfClients !== 0
          if (!deviceAlreadyStreaming) {
            droneDevice = true
          }
        } catch (err) {
          console.log(err)
        }
      }

      const myPeer = new Peer()
      const socket = io(SOCKET_URL)
      const videoGrid = document.getElementById("video-grid")
      const myVideo = document.createElement("video")
      myVideo.muted = true
      const peers = {}

      console.log({ ROOM_ID, droneDevice })

      // NORMAL USECASE
      if (ROOM_ID != DRONE_ROOM_ID || droneDevice) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            addVideoStream(myVideo, stream)
            setStream(stream)

            console.log(mediaRecorder)
            // Create a new MediaStream
            const newStream = new MediaStream()

            // answer a call
            myPeer.on("call", (call) => {
              console.log("call received... answering")

              call.answer(stream)
              const video = document.createElement("video")
              call.on("stream", (userVideoStream) => {
                console.log("receiving stream...")
                addVideoStream(video, userVideoStream)
              })
            })

            // whenever a new user joins
            socket.on("user-connected", (userId) => {
              console.log(`${userId} user-connected`)
              // call the new user
              connectToNewUser(userId, stream)
            })
          })
      } else {
        // SPECIAL USECASE FOR NON DRONE DEVICES IN DRONE_ROOM_ID
        myPeer.on("call", (call) => {
          console.log("call received... answering")
          call.answer()
          const video = document.createElement("video")
          call.on("stream", (userVideoStream) => {
            console.log("receiving stream...")
            addVideoStream(video, userVideoStream)
          })
        })

        // whenever a new user joins
        socket.on("user-connected", (userId) => {
          console.log(`${userId} user-connected`)
          console.log({ ROOM_ID, droneDevice })
          // DON'T call the new user
          // connectToNewUser(userId, stream)
        })
      }

      socket.on("user-disconnected", (userId) => {
        if (mediaRecorder) mediaRecorder.stop()
        console.log(`${userId} user-disconnected`)
        if (peers[userId]) peers[userId].close()
      })

      // on-connection
      myPeer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id)
      })

      function connectToNewUser(userId, stream) {
        // make a call
        console.log("calling new user...")
        const call = myPeer.call(userId, stream)
        const video = document.createElement("video")
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream)
        })
        call.on("close", () => {
          video.remove()
        })

        peers[userId] = call
      }

      function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener("loadedmetadata", () => {
          video.play()
        })
        videoGrid.append(video)
      }
    })()
  }, [])

  return (
    <Layout>
      <div className="container py-4">
        <div id="video-grid"></div>
        <button onClick={isRecording ? handleEnd : handleStart}>
          {isRecording ? "End" : "Start"} Recording
        </button>
      </div>
    </Layout>
  )
}

export default JoinStream
