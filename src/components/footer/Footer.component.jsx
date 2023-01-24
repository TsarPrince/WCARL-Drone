import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ sensor, status, update }) => {
    return (
        <>
            {sensor &&
                <footer className={"bg-light w-100 text-center text-lg-start sensor-footer " + update }>
                    <div className="btn-group rounded-0 flex-wrap w-100">
                        <Link to="/sensors/accelerometer" className={`btn btn-primary rounded-0 ${status.accelerometer ? 'btn-success' : 'btn-danger'}  ${sensor == 'Accelerometer' ? " active" : ""}` }>Accelerometer</Link>
                        <Link to="/sensors/camera" className={`btn btn-primary ${status.camera ? 'btn-success' : 'btn-danger'}  ${sensor == 'Camera' ? " active" : ""}` }>Camera</Link>
                        <Link to="/sensors/gyroscope" className={`btn btn-primary ${status.gyroscope ? 'btn-success' : 'btn-danger'}  ${sensor == 'Gyroscope' ? " active" : ""}` }>Gyroscope</Link>
                        <Link to="/sensors/network" className={`btn btn-primary ${status.network ? 'btn-success' : 'btn-danger'}  ${sensor == 'Network' ? " active" : ""}` }>Network</Link>
                        <Link to="/sensors/storage" className={`btn btn-primary rounded-0 ${status.storage ? 'btn-success' : 'btn-danger'}  ${sensor == 'Storage' ? " active" : ""}` }>Storage</Link>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        © 2023 Copyright:
                        <Link className="text-dark" to="#">WCARL Drone</Link>
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer