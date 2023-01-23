import React from "react";
import {left} from "@popperjs/core";

const Loader=({label,passes})=>{
    return(
        <div className="container btn-outline-info ">
            <div className="container spinner">
                {!passes ? <span className="loader_title" style={{border: "red 5px double"}}>
                    <i className="fa fa-cog fa-spin" style={{marginRight:"10px"}}></i>
                    {label}
                </span>: <span className="loader_title" style={{border: "green 5px double"}}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    {label}
                </span>}
            </div>
        </div>
    )
}

export default Loader;