import React from "react";
import posed from 'react-pose';
import "../sass/searchBar.scss"


import { FiSearch } from "react-icons/fi";


import Page from "../Shared/Page"
import Bar from "../Shared/Bar"


/**
 * @DropDown
 */
class DropDown extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = async (index) => {

        this.props.setLocation("load")
        try {
            await Page.searchMovie(this.props.list[index].id)
            this.props.setLocation("movie")
        } catch (error) {
            console.log(error)
            this.props.setLocation("error")
        }
    }

    render() {
        const { list, focused, selected } = this.props
        if (list.length > 0 && focused) {
            return (
                <div className="dropdown">
                    {list.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <div className={index === selected ? "item-selected" : "item"} onMouseEnter={() => { this.props.setSelected(index); }}
                                    onMouseDown={() => { this.handleClick(index) }}
                                >
                                    <p className="title">{item.title.length >= 26 ? item.title.slice(0, 26) + " ..." : item.title}</p>
                                    <p className="score">{item.vote_average}</p>
                                </div>
                                {index < list.length - 1 && <hr style={{ margin: '1px' }} />}
                            </div>
                        )
                    })}
                </div>
            )
        }
        else {
            return null
        }
    }
}



/**
 * @SearchBar
 */
const Box = posed.div({
    close: {
        width: "20px",
        borderRadius: "50%"

    },
    open: {
        width: "300px",
        borderRadius: "0px"
    }
});


class searchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
            text: "",
            focused: false,
            selected: -1,
            list: []
        }
    }

    handleToggle = (e) => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    }

    handleChange = async (e) => {
        let str = e.target.value
        // Set to init state when text = ""
        if (str.length <= 0) {
            this.setState({
                ...this.state,
                text: str,
                selected: -1,
                list: []
            })
            return;
        } else {
            this.setState({
                ...this.state,
                text: str,
                selected: -1,
                focused: true
            })
        }
        try {
            var results = await Bar.searchWord(str)

            this.setState({
                ...this.state,
                selected: -1,
                list: [].concat(results)
            })
        } catch (error) {
            this.setState({
                ...this.state,
                selected: -1,
                list: [{
                    title: "ERROR: Pls read Read me on github",
                    vote_average: "",
                    id: -1
                }]
            })
        }
        //this.props.searchWord(str, this.props.token, false, this.props.hisory)
    }

    setSelected = (index) => {
        this.setState({
            ...this.state,
            selected: index
        })
    }

    handleKeyDown = async (e) => {
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 38 && this.state.selected > -1) {
            this.setSelected(this.state.selected - 1)
        }
        else if (e.keyCode === 40 && this.state.selected < this.state.list.length - 1) {
            this.setSelected(this.state.selected + 1)
        }
        else if (e.keyCode === 13 && this.state.selected === -1) {
            e.preventDefault();
            e.target.blur()
            this.setState({
                ...this.state,
                focused: false
            })
            this.handleSearchClick()
        } else if (e.keyCode === 13 && this.state.selected > -1 && this.state.selected < this.state.list.length) {
            e.preventDefault();
            e.target.blur()
            this.props.setLocation("load")
            try {
                await Page.searchMovie(this.state.list[this.state.selected].id)
                this.props.setLocation("movie")
            } catch (error) {
                console.log(error)
                this.props.setLocation("error")
            }

        }
        //38 40
    }

    onFocus = () => {
        this.setState({
            ...this.state,
            focused: true
        })
    }
    onBlur = () => {
        this.setState({
            ...this.state,
            focused: false
        })
    }

    handleSearchClick = async () => {
        if (this.state.text.length <= 0) {
            return
        }

        try {
            this.props.setLocation("load")
            await Page.searchWord(this.state.text)
            this.props.setLocation("search")
        }
        catch (error) {
            this.props.setLocation("error")
            console.log(error)
        }

    }

    render() {
        const { isOpen, text, focused, selected, list } = this.state
        //const { list } = this.props
        return (
            <Box className="search-bar" pose={isOpen ? 'open' : 'close'}>
                {isOpen &&
                    (<div className="content" >
                        <div />
                        <div style={{ position: 'relative' }}>
                            <input type='text' value={text} onChange={this.handleChange}
                                onFocus={this.onFocus} onBlur={this.onBlur} onKeyDown={this.handleKeyDown} />
                            {<DropDown setLocation={this.props.setLocation} list={list} selected={selected} focused={focused} setSelected={this.setSelected} />}
                        </div>
                        <button onClick={this.handleSearchClick}>&rarr;</button>
                    </div>)
                }
                <div className="search-icon" onClick={this.handleToggle}>
                    <FiSearch />
                </div>
            </Box>
        )
    }
}

export default searchBar