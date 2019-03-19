import Page from "./Page"
import Axios from "axios"
class Bar {
    constructor() {
        this.Data = {
            token: "7412abb160310392832d3bc6029b0b9d"
        }
    }
    searchWord = async (text) => {
        var res = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.Data.token}&query=${text}&page=1&include_adult=true`)
        var results = [...res.data.results];
        results.sort((a, b) => {
            return b.popularity - a.popularity
        })
        results = results.slice(0, 5)
        results = results.map(item => {
            return {
                title: item.title,
                vote_average: item.vote_average,
                id: item.id
            }
        })
        return results
    }

    set = (prop, value) => {
        this.Data[prop] = value
    }

    get = (prop) => {
        return this.Data[prop]
    }
}

const myBar = new Bar()

export default myBar