const DRONE_ROOM_ID = "DRONE-69"

let SOCKET_URL
if (process.env?.REACT_APP_DEVELOPMENT_MODE === "true") {
  SOCKET_URL = "http://localhost:8080"
} else {
  SOCKET_URL = "https://wcarl-drone-socketio-production.up.railway.app"
  // SOCKET_URL = "https://nice-stone-guitar.glitch.me"
}

module.exports = { DRONE_ROOM_ID, SOCKET_URL }
