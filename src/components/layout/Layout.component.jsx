import React from "react"

import Navbar from "../navbar/Navbar.component"
import Footer from "../footer/Footer.component"

const sensorStatus = {
  accelerometer: false,
  camera: false,
  gyroscope: false,
  network: false,
  storage: false,
}

const Layout = ({ children, sensor, status }) => {
  const [sensorStat, setSensorStat] = React.useState()

  React.useEffect(() => {
    if(status && status.name && status.status)
      updateStatus(status)
  }, [status])

  const updateStatus = ({name, status}) => {
    sensorStatus[name] = status
    console.log(sensorStatus)

    setSensorStat((prev) => ({...prev, [name]: status}))
  }

  return (
    <> 
      <Navbar />
      {children}
      {sensor && <Footer sensor={sensor} status={sensorStatus} update={sensorStat} />}
    </>
  )
}

export default Layout
