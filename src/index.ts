import { Router } from '@vaadin/router';
import { store } from './store'
import { LitSpinner } from './lit-spinner'
import { MovieBase } from './movie-base'
import { MovieHome } from './movie-home'
import { MovieContainer } from './movie-container'
import { MovieDetails } from './movie-details'
import { NotFound } from './not-found'
import { MovieList } from './movie-list'
import { MovieCarousel } from './movie-carousel'
import { MovieVideo } from './movie-video'
import { MovieSearch } from './movie-search'
import { IShortMovie, IVideo, IMovie, ICredit } from './types'

class ShortMovie implements IShortMovie {
  id: number = 0
  release_date: string = ""
  title: string = ""
  vote_average: number = 0
}

class Video implements IVideo {
  id: string = ""
  key: string = ""
  name: string = ""
  site: string = ""
  size: number = 0
  type: string = ""
}

class Movie implements IMovie {
  budget = 0
  credits = { cast:[], crew: [] }
  genres = []
  id = 0
  images = { backdrops: [], posters: [] }
  original_language = ""
  original_title = ""
  overview = ""
  popularity = 0
  poster_path = ""
  release_date = ""
  revenue = 0
  runtime = 0
  title = ""
  video = false
  videos = { results: [] }
  vote_average = 0
  vote_count = 0
}

// router
const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
  { path: '/', component: 'movie-home' },
  { path: '/search', component: 'movie-container' },
  { path: '(.*)', component: 'not-found' },

]);

export {
  router,
  store,
  MovieBase,
  MovieHome,
  MovieContainer,
  MovieList,
  MovieDetails,
  MovieCarousel,
  MovieVideo,
  LitSpinner,
  MovieSearch,
  NotFound,
  Movie,
  ShortMovie,
  Video
};