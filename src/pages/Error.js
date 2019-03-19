import React from "react";
import gif from '../img/404.gif'

class ErrorP extends React.Component {
    render() {
        return (
            <div className='home-page'>
                <img width={200} height={100} src={gif}></img>
            </div>
        )
    }
}

export default ErrorP