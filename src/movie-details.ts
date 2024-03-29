import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { IMovie } from './types'
import { router, MovieBase, Movie } from '.';

@customElement('movie-details')
export class MovieDetails extends MovieBase {
  
  @property({type:Object})
  movie: IMovie = new Movie()

  @property({type:Object})
  location = router.location  /* vaadin router location */  
  

  render() { 
    if (!this.movie || !this.movie.id) return html``;
   
    return html`
      <div class="card shadow-lg p-3 mb-5">
        <!-- carousel -->
        <div class="row g-0 mb-4">
           <movie-carousel count="5" .posters=${this.movie.images.backdrops}></movie-carousel> 
        </div>
        <!-- card body -->
        <div class="row g-0">
          <div class="col-md-4">
           ${ this.movie.videos.results.length > 0 
            ? 
              html`<movie-video .key="${this.movie.videos.results[0].key}"></movie-video>` 
            :
              html`<img src="${this.posterUrl(this.movie.poster_path)}" class="card-img-top img-fluid" alt="..."></img>`
            } 
          </div> 
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title">${ this.movie.title} <span class="badge bg-info fs-6">${this.movie.vote_average}</span></h4>
              <h5 class="fs-5">Released <span class="fs-6 text-muted">${ this.movie.release_date }</span></h5> 
              <h5 class="card-subtitle mb-2 text-muted">${ this.movie.credits.cast.slice(0,4).map(a => html`<span>${a.name} </span>`) }</h5>              
              <h6 class="card-subtitle mb-2 text-muted">${ this.movie.credits.crew.slice(0,2).map(a => html`<span>${a.name} </span>`) }</h6>
              <p class="card-text">${ this.movie.overview }</p>
              <p> Runtime <span class="badge rounded-pill bg-primary">${this.movie.runtime}</span></p>      
            </div>
          </div>
        </div>
      </div> <!-- card -->
    `
  }

}


