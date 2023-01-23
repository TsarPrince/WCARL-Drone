import React from "react"
import { Link } from "react-router-dom"

import Layout from "../components/layout/Layout.component"

const HomePage = () => {
  return (
    <Layout>
      <div>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="/drone.jpg"
                className="d-block mx-lg-auto img-fluid rounded shadow"
                alt="Drone"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Wirelessly control your drone with a phone
              </h1>
              <p className="lead">
                This is a drone project developed and maintained under Wireless Communications and
                Analytics Research Lab (WCARL) envisioned and led by Dr. Vishal Krishna Singh.
                Quickly check your device to see that if you are all ready for controlling your
                drone.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to={"/check-my-device"}>
                  <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
                    Check my Device
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
