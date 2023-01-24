import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.component"
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";
const NetworkPage = () => {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOnline(window.navigator.onLine);
        };

        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    return (
        <Layout sensor={"Network"} status={{name: "network", status: isOnline ? true: false}}>
            <div className="container-xxl">
                <div className="fw-bold text-uppercase mb-8 text-center mt-4 fs-1">Network</div>
                {isOnline ? <Loader label={"Connected to the network"} passes={true}/> : <Loader label={"Not connected to the network"} passes={false}/> }
                <div className="container text-center">
                    <Link to="/sensors/accelerometer" type="button" className="btn btn-outline-success mb-5 btn-lg" style={{width: "150px", height: "50px"}}>Next</Link>
                </div>
            </div>
        </Layout>

    );
}

export default NetworkPage;
