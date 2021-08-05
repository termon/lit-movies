import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { store, MovieBase }  from '.';

// Movie Parent Component
@customElement('movie-container')
export class MovieContainer extends MovieBase {
  
  render() {
    return html`
      <h4 class="mt-2">Search</h4>
      
      <!-- display selected movie details -->
      <movie-details .movie="${store.movie}"></movie-details>

      <!-- search bar / clear -->
      <movie-search .disabled="${store.clearDisabled}" .search="${store.search}" @clear="${() => store.clear()}" @search="${(e:any) => this._search(e) }"></movie-search>

      <!-- loading spinner -->
      <lit-spinner class="mt-4 mb-4" .loading="${store.isLoading}"></lit-spinner>

      <!-- display list of movies -->
      <!-- attribute @view is an event handler for custom event 'view' emitted by movie-list -->
      <!-- and provides a more decoupled relationship between movie-app and movie-list -->
      <movie-list .movies="${store.movies}" @view="${(e:any) => store.getMovie(e.detail.id)}"></movie-list> 
    `;
  }

  // ---------------- local method to react to search input ----------
  _search(e:any) {
    store.search = e.detail;
    store.getMovies();
  }
 
}

