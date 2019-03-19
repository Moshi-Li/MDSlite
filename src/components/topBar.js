import React from "react";
import { remote } from 'electron'
import "../sass/topBar.scss"

import { FiMinusCircle, FiXCircle } from "react-icons/fi"

class TopBar extends React.Component {
    minimize = e => {
        remote.getCurrentWindow().minimize();
    }
    close = e => {
        remote.getCurrentWindow().close()
    }
    render() {
        return (
            <div className="top-bar">
                <div className="btn-container">
                    <FiXCircle onClick={this.close} />
                    <FiMinusCircle onClick={this.minimize} />
                </div>
            </div>
        )
    }
}

export default TopBar;