import React from "react";

import Page from "../Shared/Page"

import Home from "./Home"
import Movie from './Movie'
import Search from "./Search"
import ErrorP from "./Error"
import Load from "./Loading"

class Route extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        switch (this.props.location) {
            case "movie":
                return <Movie setLocation={this.props.setLocation} />
            case "search":
                return <Search setLocation={this.props.setLocation} />
            case "home":
                return <Home />
            case 'load':
                return <Load />
            default:
                return <ErrorP />
        }
    }
}


export default Route