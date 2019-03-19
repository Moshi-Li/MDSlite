import React from "react";
import "../sass/index.scss"


import TopBar from "../components/topBar";
import SearchBar from "../components/searchBar"
import TokenBar from "../components/tokenBar"

import Route from "./@Route"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: "home",
        }
    }

    setLocation = location => {
        this.setState({
            ...this.state,
            location: location
        })
    }

    render() {
        return (
            <div className="main-container">
                <TopBar />
                <SearchBar setLocation={this.setLocation} />
                <TokenBar />
                <Route location={this.state.location} setLocation={this.setLocation} />
            </div>

        )
    }
}

export default App;