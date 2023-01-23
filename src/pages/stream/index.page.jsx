import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const { v4: uuidV4 } = require('uuid')

const Stream = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ROOM_ID = uuidV4()
    navigate(`/stream/${ROOM_ID}`)
  }, [])

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  )
}

export default Stream