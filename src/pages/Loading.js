import React from "react";
import gif from '../img/Loading-Pacman.gif'

class Loading extends React.Component {
    render() {
        return (
            <div className='home-page'>
                <img width={150} height={150} src={gif}></img>
            </div>
        )
    }
}

export default Loading