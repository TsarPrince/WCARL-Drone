import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CheckmyDevicePage from "./pages/checkmyDevice.page"
import HomePage from "./pages/home.page"


// Sensors
import AccelerometerPage from "./pages/sensors/AccelerometerPage"
import CameraPage from "./pages/sensors/CameraPage"
import GyroscopePage from "./pages/sensors/GyroscopePage"
import NetworkPage from "./pages/sensors/NetworkPage"
import ProximityPage from "./pages/sensors/ProximityPage"
import StoragePage from "./pages/sensors/StoragePage"
import Stream from "./pages/stream/index.page"
import JoinStream from "./pages/stream/[USER_ID].page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/check-my-device",
    element: <CheckmyDevicePage />,
  },
  {
    path: "/sensors/camera",
    element: <CameraPage />,
  },
  {
    path: "/sensors/network",
    element: <NetworkPage />,
  },
  {
    path: "/sensors/accelerometer",
    element: <AccelerometerPage />,
  },
  {
    path: "/sensors/storage",
    element: <StoragePage />,
  },
  {
    path: "/sensors/gyroscope",
    element: <GyroscopePage />,
  },
  {
    path: "/sensors/proximity",
    element: <ProximityPage />,
  },
  {
    path: "/stream",
    element: <Stream />,
  },
  {
    path: "/stream/:ROOM_ID",
    element: <JoinStream />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
