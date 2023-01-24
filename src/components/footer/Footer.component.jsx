import React from 'react'

const Footer = ({ sensor, status }) => {
    return (
        <>
            {sensor &&
                <footer className="bg-light w-100 text-center text-lg-start sensor-footer">
                    <div className="btn-group rounded-0 flex-wrap w-100">
                        <a href="/sensors/accelerometer" className={`btn btn-primary rounded-0 ${status.accelerometer ? 'btn-success' : 'btn-danger'}  ${sensor == 'Accelerometer' ? " active" : ""}` }>Accelerometer</a>
                        <a href="/sensors/camera" className={`btn btn-primary ${status.camera ? 'btn-success' : 'btn-danger'}  ${sensor == 'Camera' ? " active" : ""}` }>Camera</a>
                        <a href="/sensors/gyroscope" className={`btn btn-primary ${status.gyroscope ? 'btn-success' : 'btn-danger'}  ${sensor == 'Gyroscope' ? " active" : ""}` }>Gyroscope</a>
                        <a href="/sensors/network" className={`btn btn-primary ${status.network ? 'btn-success' : 'btn-danger'}  ${sensor == 'Network' ? " active" : ""}` }>Network</a>
                        <a href="/sensors/storage" className={`btn btn-primary rounded-0 ${status.storage ? 'btn-success' : 'btn-danger'}  ${sensor == 'Storage' ? " active" : ""}` }>Storage</a>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        © 2023 Copyright:
                        <a className="text-dark" href="#">WCARL Drone</a>
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer