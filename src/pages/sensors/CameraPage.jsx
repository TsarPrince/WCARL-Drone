import React, { useEffect, useState } from "react";
import {checkMediaSupport } from "../../utils/check-sensors.js";
import Layout from "../../components/layout/Layout.component"
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";
const CameraPage = () => {
    let [cameraStat, setCameraStat] = useState(false);
    useEffect(()=>{
        checkMediaSupport(({ hasWebcam }) => {
            if (hasWebcam) {
                setCameraStat(true);
            }
        });
    },[])
    return (
        <Layout>
            <div className="container-xxl">
                <div className="fw-bold text-uppercase mb-8 text-center mt-4 fs-1">Camera</div>
                {!cameraStat ? <Loader label={"Checking for the Camera availability"} passes={false}/> : <Loader label={"Done"} passes={true}/> }
                <div className="container text-center">
                    <Link to="/sensors/network" type="button" className="btn btn-outline-success mb-5 btn-lg" style={{width: "150px", height: "50px"}}>Next</Link>
                </div>
            </div>
        </Layout>
    )
}

export default CameraPage;
