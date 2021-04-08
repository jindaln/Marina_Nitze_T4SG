import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import StateCard from "../Components/State Scorecard/StateCard"
import Subheader from "../Components/Subheader"
import Legend from '../Components/Legend'


const high_pop = 7500000;
const low_pop = 2500000;

class Scorecard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 0,
                abbreviation: "",
                electronic_request: false,
                name: "",
                no_fee: false,
                no_contact: false,
                no_notary_required: false,
                no_witness_required: false,
                county_administered: false,
                population: 0,
                implemented: 0
            }],
            electronic_request: false,
            notary: false,
            fee: false,
            office: false,
            witness: false,
            population_filter: 0,
            implemented_sort: 0,
            county_filter: 0,
            searchedState: "",
            total_practices: 5,
        };
    }

    changeReq = (req) => {
        this.setState({ electronic_request: !req})
    }
    changeNotary = (n) => {
        this.setState({ notary: !n })
    }
    changeFee = (f) => {
        this.setState({ fee: !f })
    }
    changeOffice = (o) => {
        this.setState({ office: !o })
    }
    changeWitness = (w) => {
        this.setState({ witness: !w })
    }

    updateSearchedState = (s) => {
        this.setState({ searchedState: s.target.value })
    }

    countImplementations(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var count = 0;
            var item = data[i];

            if (item["electronic_request"])
                count += 1;
            if (item["no_contact"])
                count += 1;
            if (item["no_fee"])
                count += 1;
            if (item["no_notary_required"])
                count += 1;
            if (item["no_witness_required"])
                count += 1;

            tempData.push(
                {
                    id: i,
                    abbreviation: item["abbreviation"],
                    county_administered: item["county_administered"],
                    electronic_request: item["electronic_request"],
                    name: item["name"],
                    no_contact: item["no_contact"],
                    no_fee: item["no_fee"],
                    no_notary_required: item["no_notary_required"],
                    no_witness_required: item["no_witness_required"],
                    population: item["population"],
                    implemented: count
                })


        }

        this.setState({ data: tempData });
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.countImplementations(res.data))
            .catch(err => console.log(err));
    }

    render() {

        var newStates = this.state.data;
        var scoreCardStates = [];
        var searchedStates = [];

        if (this.state.data[0]["name"]) {
             scoreCardStates = this.state.data;
             searchedStates = scoreCardStates;
             if(this.state.searchedState !== ""){
                searchedStates = searchedStates.filter(
                    state => state.name.toLowerCase().includes( this.state.searchedState.toLowerCase() )===true)
             }
             
        }

        if (this.state.electronic_request) {
            newStates = newStates.filter(
                state => state.electronic_request === true);
        }
        if (this.state.notary) {
            newStates = newStates.filter(
                state => state.no_notary_required === true);
        }
        if (this.state.fee) {
            newStates = newStates.filter(
                state => state.no_fee === true);
        }
        if (this.state.office) {
            newStates = newStates.filter(
                state => state.no_contact === true);
        }
        if (this.state.witness) {
            newStates = newStates.filter(
                state => state.no_witness_required === true);
        }

        if (this.state.population_filter === 1) {
            newStates = newStates.filter(
                state => state.population < low_pop);
        }
        else if (this.state.population_filter === 2) {
            newStates = newStates.filter(
                state => state.population >= low_pop && state.population < high_pop);
        }
        else if (this.state.population_filter === 3) {
            newStates = newStates.filter(
                state => state.population >= high_pop);
        }
        if (this.state.implemented_sort === 1) {

            newStates.sort((a, b) => (a.implemented < b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === -1) {

            newStates.sort((a, b) => (a.implemented > b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === 0) {
            newStates.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }

        if (this.state.county_filter === 0) {
            newStates = newStates;
        }
        else if (this.state.county_filter === 1) {
            newStates = newStates.filter(
                state => state.county_administered === true
            )
        }
        else if (this.state.county_filter === 2) {
            newStates = newStates.filter(
                state => state.county_administered === false
            )
        }

        var glyphs = null;
        if (newStates.length !== 0) {
            glyphs = <Glyphs states={newStates}/>
        }

    return (

        <div className="landing-page">

                <div className="playbook-region-header">
                    <Subheader title = "National Comparison"/>
                </div>
                
            <div className="filter-box">
                <div> 
                    <div className="filter-titles">

                        <h2> Promising Practices: </h2>
                        <h4> How Do the 50 States Compare? </h4>
                    </div>

                    <h5> Sort By... </h5>
                    <div className="sort-boxes">
                        <label className="sort-label">
                            
                            <div className="sort-title"> Population Size </div>

                            <select onChange={(e) => {
                                if (e.target.value === "no-filter") {
                                    this.setState({ population_filter: 0 })
                                }

                                else if (e.target.value === "small") {
                                    this.setState({ population_filter: 1 })
                                }
                                else if (e.target.value === "medium") {
                                    this.setState({ population_filter: 2 })
                                }
                                else if (e.target.value === "large") {
                                    this.setState({ population_filter: 3 })
                                }
                            }}>
                                <option value="no-filter">Select a Population</option>
                                <option value="small">Less than 2.5 M</option>
                                <option value="medium">2.5M to 7.5 M</option>
                                <option value="large">7.5M +</option>
                            </select>
                        </label>

                        <label className="sort-label">
                            <div className="sort-title">  Practices Implemented </div>

                            <select onChange={(e) => {
                                if (e.target.value === "most") {
                                    this.setState({ implemented_sort: 1 })
                                }

                                else if (e.target.value === "least") {
                                    this.setState({ implemented_sort: -1 })
                                }
                                else if (e.target.value === "no-sort") {
                                    this.setState({ implemented_sort: 0 })
                                }
                            }}>
                                <option value="no-sort">No Sort</option>
                                <option value="most">Most Practices Implemented</option>
                                <option value="least">Least Practices Implemented</option>
                            </select>
                        </label>

                        <label className="sort-label">
                            
                            <div className="sort-title"> State vs County </div>
                            <select onChange={(e) => {
                                if (e.target.value === "no-filter") {
                                    this.setState({ county_filter: 0 })
                                }

                                else if (e.target.value === "county") {
                                    this.setState({ county_filter: 1 })
                                }
                                else if (e.target.value === "state") {
                                    this.setState({ county_filter: 2 })
                                }
                            }}>
                                <option value="no-filter">County or State</option>
                                <option value="county">County Administered</option>
                                <option value="state">State Administered</option>
                            </select>
                        </label>
                    </div>
                </div>


                <div className="right-header"> 
                    <h5> Filter By... </h5>
                    <div className="checkboxes">
                        <label className="filter-label">
                            
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="Electronic Request"
                                onChange={() => this.changeReq(this.state.electronic_request)}
                            />
                            <div className="filter-title"> Electronic Request </div>
                        </label>
                        <label className="filter-label">
                            
                            <input
                                className="filter-check"
                                type="checkbox"
                                label=" No Notary"
                                onChange={() => this.changeNotary(this.state.notary)}
                            />
                            <div className="filter-title"> No Notary </div>
                        </label>
                        <label className="filter-label">
                            
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="No Fee"
                                onChange={() => this.changeFee(this.state.fee)}
                            />
                            <div className="filter-title"> No Fee </div>
                        </label>
                        <label className="filter-label">
                            
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="Office Contact"
                                onChange={() => this.changeOffice(this.state.office)}
                            />
                            <div className="filter-title"> Office Contact </div>
                        </label>
                        <label className="filter-label">
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="First"
                                onChange={() => this.changeWitness(this.state.witness)}
                            />
                            <div className="filter-title"> No Witness Needed </div>
                        </label>
                    </div>
                </div>
                <Legend/>
            </div>

            <div>{glyphs}</div>


            <div id="state-by-state-area">
                <div className="playbook-region-header">
                <Subheader title="State-by-State Scorecard"/>
                <input
                    className = "searchbar"
                    type = "text"
                    value = {this.state.searchedState}
                    placeholder={"search"}
                    onChange={this.updateSearchedState}
                />
                </div>

                {searchedStates.map(state =>
                    <StateCard state={state["name"]} state_data={state} key={state.id} total={this.state.total_practices} completed={state.implemented} />)}
                </div>
            </div>
        );
    }
}
export default Scorecard
