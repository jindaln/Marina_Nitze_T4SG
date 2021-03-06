import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Components/SideBar'
import LandingPage from "./Views/LandingPage"
import Scorecard from "./Views/Scorecard"
import Contacts from "./Views/Contacts"
import AboutUs from "./Views/AboutUs"
import HomePage from "./Views/HomePage"
import { useState } from "react";
import Header from "./Components/Header"
import AdminView from "./Views/AdminView"
import { useEffect } from 'react';


function App() {
    const [sidebar, setSidebar] = useState(false)
    const showSideBar = () => {
        setSidebar(!sidebar)
    }

    useEffect(() => {
        document.title = "Child Welfare Playbook"
    }, [])

    return (
        <div className="App">
            <Header onClick={showSideBar} toggle={sidebar}/>

            <header className="App-header">
                <Router>
                    <SideBar className="side-bar" click={showSideBar} show={sidebar}/>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path={"/dashboard"} component={LandingPage} />
                        <Route path="/contacts" component={Contacts} />
                        <Route path={"/adminView"} component={AdminView} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path={["", "/scorecard"]} component={Scorecard} />
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
