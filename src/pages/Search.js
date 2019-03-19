import React from "react";
import Page from "../Shared/Page"
import "../sass/searchPage.scss"

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: Page.get('list')
        }
        Page.set('list', [])
    }

    handleClick = async (item) => {

        this.props.setLocation("load")
        try {
            await Page.searchMovie(item.id)
            this.props.setLocation("movie")
        } catch (error) {
            console.log(error)
            this.props.setLocation("error")
        }
    }

    render() {
        const { list } = this.state
        if (list.length <= 0) {
            return (
                <div className="search-page">
                    <p>Sorry, No Results Found</p>
                </div>)
        }
        else {
            return (
                <div className="search-page">
                    <div className="content">
                        {list.map((item) => {
                            return (
                                <div className="item" onClick={() => { this.handleClick(item) }}>
                                    <p>{item.title.length >= 40 ? item.title.slice(0, 40) + " ..." : item.title}</p>
                                    <p>{item.vote_average}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

    }
}


export default Search