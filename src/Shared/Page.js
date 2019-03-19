import Bar from "./Bar"
import Axios from "axios"
class Page {
    constructor() {
        this.Data = {
            location: "home",
            list: [],
            movie: null
        }
    }

    searchWord = async (text) => {
        var res = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Bar.get('token')}&query=${text}&page=1&include_adult=true`)
        var results = [...res.data.results];

        results.sort((a, b) => {
            return b.popularity - a.popularity
        })

        results = results.map(item => {
            return {
                title: item.title,
                vote_average: item.vote_average,
                id: item.id
            }
        })

        return this.set('list', [].concat(results))

    }

    searchMovie = async (id) => {
        var obj = {};
        //Get fundamental detail
        var res = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${Bar.get('token')}`);
        obj = { ...res.data };

        //Get crew detail
        res = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Bar.get('token')}`);
        obj = { ...obj, cast: res.data.cast ? res.data.cast.slice(0, 3) : null };
        obj['director'] = res.data.crew[0].name
        //Get comments
        res = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${Bar.get('token')}`);
        this.Data.movie = { ...obj, comments: res.data };

    };

    set = (prop, value) => {
        this.Data[prop] = value
    }
    get = (prop) => {
        return this.Data[prop]
    }
    log = () => {
        console.log(this.Data)
    }
}

const myPage = new Page()

export default myPage