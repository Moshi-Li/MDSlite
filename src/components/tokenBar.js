import React from "react";
import posed from 'react-pose';
import "../sass/tokenBar.scss"

import { FiSettings } from "react-icons/fi";

import Bar from "../Shared/Bar"


const Box = posed.div({
    close: {
        width: "20px",
        borderRadius: "50%"

    },
    open: {
        width: "280px",
        borderRadius: "0px"
    }
});


class tokenBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            token: Bar.get('token')
        }
    }


    handleClick = (e) => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen,
            token: Bar.get('token')
        })
    }

    valueOnChange = (e) => {
        this.setState({
            ...this.state,
            token: e.target.value
        })
    }

    render() {
        const { isOpen, token } = this.state
        return (
            <Box className="token-bar" pose={isOpen ? 'open' : 'close'}>
                {isOpen &&
                    (<div className="content" >
                        <div />
                        <p>Token:</p>
                        <input type='text' value={token} onChange={this.valueOnChange} />
                        <button onClick={() => { Bar.set('token', token) }}>Set</button>
                    </div>)
                }
                <div className="token-icon" onClick={this.handleClick}>
                    <FiSettings />
                </div>
            </Box>
        )
    }
}

export default tokenBar

