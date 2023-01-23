import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Layout from "../components/layout/Layout.component"
import { checkMediaSupport, checkSensors } from "../utils/check-sensors"
import { Round } from "../utils/utils"

const CheckmyDevicePage = () => {
  // let [cameraStat, setCameraStat] = useState(false)
  // let [gyroscopeStat, setgyroscopeStat] = useState(false)
  // let [accelerometerStat, setAccelerometerStat] = useState(false)
  //
  // useEffect(() => {
  //   checkMediaSupport(({ hasWebcam }) => {
  //     if (hasWebcam) {
  //       setCameraStat(true)
  //     }
  //   })
  //   let results = checkSensors()
  //   // Compatability -> https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope#browser_compatibility
  //   if (results["gyroscope"]) {
  //     let gyroscope = results["gyroscope"]
  //     gyroscope.addEventListener("reading", () => {
  //       setgyroscopeStat(
  //         `X: ${Round(gyroscope.x)}, Y: ${Round(gyroscope.y)}, Z: ${Round(gyroscope.z)}`
  //       )
  //     })
  //   }
  //   if (results["accelerometer"]) {
  //     let acl = results["accelerometer"]
  //     acl.addEventListener("reading", () => {
  //       setAccelerometerStat(`X: ${Round(acl.x)}, Y: ${Round(acl.y)}, Z: ${Round(acl.z)}`)
  //     })
  //   }
  // }, [])

  // const sensors = [
  //   {
  //     heading: "Camera Enabled",
  //     description: "Checking if Camera of the Phone working properly...",
  //     enabled: cameraStat,
  //     link: "/sensors/camera",
  //   },
  //   {
  //     heading: "Network Enabled",
  //     description: "Checking if Network is established...",
  //     enabled: true,
  //     link: "/sensors/network",
  //   },
  //   {
  //     heading: "Accelerometer Enabled",
  //     description: "Checking if we have access to Accelerometer of the device...",
  //     enabled: accelerometerStat,
  //     link: "/sensors/accelerometer",
  //   },
  //   {
  //     heading: "Storage Access Granted",
  //     description: "Checking if we can use the storage of phone...",
  //     enabled: true,
  //     link: "/sensors/storage",
  //   },
  //   {
  //     heading: "Gyroscope Enabled",
  //     description: "Checking the Gyroscope",
  //     enabled: gyroscopeStat,
  //     link: "/sensors/gyroscope",
  //   },
  //   {
  //     heading: "Proximity Sensor Enabled",
  //     description: "Checking the Proximity Sensor",
  //     enabled: false,
  //     link: "/sensors/proximity",
  //   },
  // ]
  return (
    <Layout>
      <div className="container-xxl bg-white p-0 align-items-center">
        <div className="container-xxl py-5 vertical_center">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              {/*<h6 className="section-title text-center text-primary text-uppercase fs-1">Sensors</h6>*/}
              <h1 className="mb-8">
                Check The <span className="text-primary text-uppercase">Sensors</span>
              </h1>
            </div>
            <div className="container text-center">
              <Link to="/sensors/camera" type="button" className="btn btn-outline-primary mb-5 btn-lg" style={{width: "150px", height: "50px"}}>Start</Link>
            </div>
            {/*<div className="row g-4">*/}
            {/*  {sensors.map((sensor) => (*/}
            {/*    <div*/}
            {/*      key={sensor.heading}*/}
            {/*      className="col-lg-4 col-md-6 wow fadeInUp"*/}
            {/*      data-wow-delay="0.1s"*/}
            {/*    >*/}
            {/*      <Link to={sensor.link || "/checkMyDevice"}>*/}
            {/*        <div*/}
            {/*          className={`service-item text-white rounded ${*/}
            {/*            sensor.enabled ? "service-item-enabled" : "service-item-disabled"*/}
            {/*          }`}*/}
            {/*        >*/}
            {/*          <div>*/}
            {/*            <div className="service-item-svg">*/}
            {/*              {sensor.enabled ? (*/}
            {/*                <svg*/}
            {/*                  xmlns="http://www.w3.org/2000/svg"*/}
            {/*                  fill="currentColor"*/}
            {/*                  viewBox="0 0 448 512"*/}
            {/*                >*/}
            {/*                  <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />*/}
            {/*                </svg>*/}
            {/*              ) : (*/}
            {/*                <svg*/}
            {/*                  xmlns="http://www.w3.org/2000/svg"*/}
            {/*                  fill="currentColor"*/}
            {/*                  viewBox="0 0 320 512"*/}
            {/*                >*/}
            {/*                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />*/}
            {/*                </svg>*/}
            {/*              )}*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <h5 className="mt-4">{sensor.heading}</h5>*/}
            {/*          <p className="mb-0">{sensor.description}</p>*/}
            {/*        </div>*/}
            {/*      </Link>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CheckmyDevicePage
