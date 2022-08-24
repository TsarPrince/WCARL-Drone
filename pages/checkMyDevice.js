import React, { useEffect, useState } from "react";
import { checkSensors, checkMediaSupport } from "../public/scripts/sensorCheck";

export default function CheckDevice() {
  let [cameraStat, setCameraStat] = useState(false);
  let [gyroscopeStat, setgyroscopeStat] = useState(false);
  let [accelerometerStat, setAccelerometerStat] = useState(false);
  useEffect(() => {
    checkMediaSupport(({ hasWebcam }) => {
      if (hasWebcam) {
        setCameraStat(true);
      }
    });
    let results = checkSensors();
    if (results.hasOwnProperty("gyroscope")) setgyroscopeStat(true);
    if (results.hasOwnProperty("accelerometer")) setAccelerometerStat(true);
  }, []);
  return (
    <>
      <h2>Your device supports: </h2>
      <ul>
        <li>Camera: {cameraStat ? "true" : "false"}</li>
        <li>Accelerometer: {accelerometerStat ? "true" : "false"}</li>
        <li>Gyroscope: {gyroscopeStat ? "true" : "false"}</li>
      </ul>
    </>
  );
}
