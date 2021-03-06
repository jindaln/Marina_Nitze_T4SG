
import axios from "axios";
import React, { Component } from "react";
import * as d3 from "d3";
import "./Legend.css"
import "../App.css"

class Legend extends Component {

	render() {
		return (
	        <div className="legend-container">
	        	<svg height="140" width="200">
	            	<g>
				        <circle className="legend-implemented" cx="20" cy="20" r="10" text="A"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="25"> X </text>
				        <text x="40" y="25"> Fully Implemented </text>
				    </g>
				    <g>
				        <circle className="legend-partially-implemented" text="yo" cx="20" cy="50" r="10"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="55"> X </text>
				        <text x="40" y="55"> Partially Implemented </text>
				    </g>
				    <g>
				        <circle className="legend-nonimplemented" text="yo" cx="20" cy="80" r="10"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="85"> X </text>
				        <text x="40" y="85"> Not Implemented </text>
				    </g>
				    <g>
				        <circle className="legend-unknown" text="yo" cx="20" cy="110" r="10"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="115"> X </text>
				        <text x="40" y="115"> No Data Unavailable </text>
				    </g>	
				</svg>
	        </div>

    	);
	}

}

export default Legend