import { makeAutoObservable } from "mobx"
import { Movie } from "."
import { IMovie, IShortMovie } from './types'

// =============== MobX Store =====================
class Store {
    isLoading = false
    movie: IMovie | undefined = undefined
    movies: IShortMovie[] = []
    search = ''
    error = ''

    constructor() {       
        makeAutoObservable(this)   // MobX -  
    }
    
    // ================================= public store API actions ===============================

    clear() {
        this.movie = new Movie()
        this.movies = []
        this.search = ''
        this.isLoading = false
    }

    getMovies() {
        this._fetchMovies()
    }
    
    getMovie(id:any) {
        this._fetchMovie(id)
    }

    // computed property - makeAutoObservable enables all getters as computed
    // https://mobx.js.org/computeds.html
    get clearDisabled() {
      return this.movies.length == 0
    }

    // ====================================== private methods ===================================
    // implementations that use either separate action methods or call action function in promise
    // https://mobx.js.org/actions.html#examples
   
    _fetchMovies() {
        this.isLoading = true 
        console.log(this._query())
        fetch(this._query(), this._getTokenObj())
            .then(response => response.json())
            .then(this._fetchMoviesSuccessAction)
            .catch(this._fetchFailureAction) 
    }

    _fetchMovie(id:any) {
        this.isLoading = true
        fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,images,videos`, this._getTokenObj())
          .then(response => response.json())
          .then(this._fetchMovieSuccessAction)
          .catch(this._fetchFailureAction)
    }

    // -------- action methods -----------
    _fetchMoviesSuccessAction = (json: {results: IShortMovie[]}) => {
        this.isLoading = false
        if (json.results) {  
            this.movie = undefined    
            this.movies = json.results   
            this.search = ''
        } 
    }
    _fetchMovieSuccessAction = (json: IMovie) => {
        this.isLoading = false
        if (json.title) {
            this.movie = json
        }
    }
    _fetchFailureAction = (error:any) => {
        this.isLoading = false
        this.error = error;
        console.log('error', this.error)
    }

 
    // configure query based on search value
    _query() {
        if (this.search === ':trending') {
          return 'https://api.themoviedb.org/3/trending/movie/week'
        } else if (this.search === ':popular') {
          return 'https://api.themoviedb.org/3/movie/popular'
        } else if (this.search === ':playing') {
          return 'https://api.themoviedb.org/3/movie/now_playing'
        } else if (this.search === ':upcoming') {
          return 'https://api.themoviedb.org/3/movie/upcoming'
        } else if (this.search === ':top') {
          return 'https://api.themoviedb.org/3/movie/top_rated'
        } else {
          return `https://api.themoviedb.org/3/search/movie?query="${this.search}"`
        }
      }

    // bearer token (stored in env. must be prefixed with VITE_ to be accessible in client )
    _getTokenObj() { 
        const TOKEN = import.meta.env.VITE_MOVIEDB_TOKEN
        return {
          method: 'GET',
          headers: new Headers(
            {
              'Authorization': `Bearer ${TOKEN}`, 
              'Content-Type': 'application/json'
            })
        } 
    }
}

export const store = new Store();
