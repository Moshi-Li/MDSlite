import React from "react";
import "../sass/moviePage.scss"
import Page from "../Shared/Page"

class Movie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: { ...Page.get('movie') }
        }

    }
    componentDidMount() {
        Page.set('movie', null)
    }
    render() {
        const { movie } = this.state
        return (
            <div className="movie-page">
                <div className="content-poster">
                    < img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                </div>
                <div className="content-rating">
                    <p>{movie.vote_average}/10</p >
                    <p>{` ${movie.vote_count} people voted`}</p >
                </div>

                <div className="content-entry">
                    <p>Title: </p >
                    <p>{movie.title}</p >
                </div>

                <div className="content-entry">
                    <p>Director: </p >
                    <p>{movie.director}</p >
                </div>

                <div className="content-entry">
                    <p>Staring:</p >
                    <p>
                        {movie.cast
                            .map((item) => {
                                return item.name;
                            })
                            .join(', ')}
                    </p >
                </div>

                <div className="content-entry">
                    <p> Overview:</p >
                    <p>{movie.overview}</p >
                </div>


                <div className="content-entry">
                    <p> Release:</p >
                    <p>{movie.release_date}</p >
                </div>


                {movie.spoken_languages.length > 0 &&
                    <div className="content-entry">
                        <p> Language:</p >
                        <p>{movie.spoken_languages.map(item => (item.name)).join(', ')}</p >
                    </div>
                }





                {movie.comments.total_results > 0 && <p>Comments:</p >}
                {movie.comments.total_results > 0 &&
                    movie.comments.results.slice(0, 5).map((item, index) => {
                        return (
                            <div className="content-comment" key={item.id}>

                                <p>{item.author}:</p >
                                <p>{item.content}</p >
                                <hr />
                            </div>
                        );
                    })}
            </div>
        )
    }
}

export default Movie