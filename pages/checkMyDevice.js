import React, { useEffect, useState } from "react";
import { checkSensors, checkMediaSupport } from "../public/scripts/sensorCheck";
import { Round } from "../public/scripts/Utils";

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
    // Compatability -> https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope#browser_compatibility
    if (results.hasOwnProperty("gyroscope")) {
      let gyroscope = results["gyroscope"];
      gyroscope.addEventListener("reading", () => {
        setgyroscopeStat(
          `Angular Velocities => X: ${Round(gyroscope.x)}, Y: ${Round(
            gyroscope.y
          )}, Z: ${Round(gyroscope.z)}`
        );
      });
    }
    if (results.hasOwnProperty("accelerometer")) {
      let acl = results["accelerometer"];
      acl.addEventListener("reading", () => {
        setAccelerometerStat(
          `Acceleration => X: ${Round(acl.x)}, Y: ${Round(acl.y)}, Z: ${Round(
            acl.z
          )}`
        );
      });
    }
  }, []);
  return (
    <>
      <h2>Your device supports: </h2>
      <ul>
        <li>Camera: {cameraStat ? "true" : "false"}</li>
        <li>
          Accelerometer: {accelerometerStat ? accelerometerStat : "false"}
        </li>
        <li>Gyroscope: {gyroscopeStat ? gyroscopeStat : "false"}</li>
      </ul>
    </>
  );
}
