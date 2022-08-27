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

      <div className="container-xxl bg-white p-0">
        


        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title text-center text-primary text-uppercase">Sensors</h6>
                    <h1 className="mb-5">Checking The <span className="text-primary text-uppercase">Sensors</span></h1>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item rounded" href="">
                            <div>
                                <div >

                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <h5 className="mb-3">Camera Enabled</h5>
                            <p className="text-body mb-0">Checking if Camera of the Phone working properly...</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="service-item rounded" href="">
                            <div>
                                <div >

                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <h5 className="mb-3">Network Enabled</h5>
                            <p className="text-body mb-0">Checking if Network is established...</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="service-item rounded" href="">
                            <div >
                                <div >
                                    <input type="checkbox"/>

                                </div>
                            </div>
                            <h5 className="mb-3">Storage Access Granted</h5>
                            <p className="text-body mb-0">Checking if we can use the storage of phone...</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="service-item rounded" href="">
                            <div >
                                <div >
                                    <input type="checkbox"/>

                                </div>
                            </div>
                            <h5 className="mb-3">Gyroscope Enabled</h5>
                            <p className="text-body mb-0">Checking the Gyroscope...</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="service-item rounded" href="">
                            <div >
                                <div >
                                    <input type="checkbox"/>

                                </div>
                            </div>
                            <h5 className="mb-3">Proximity Sensor Enabled</h5>
                            <p className="text-body mb-0">Checking the Proximity Sensor...</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <div className="service-item rounded" href="">
                            <div >
                                <div >
                                    <input type="checkbox"/>

                                </div>
                            </div>
                            <h5 className="mb-3">All Sensors Enabled</h5>
                            <p className="text-body mb-0">Checking if all the sensors are working properly...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        


        



        <div href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></div>
    </div>
    </>
  );
}
