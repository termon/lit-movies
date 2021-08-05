import { customElement } from 'lit/decorators.js'
import { html } from 'lit';
import { MovieBase } from './movie-base';

@customElement('movie-list')
export class MovieList extends MovieBase {

  static get properties() {
    return { 
      movies: { type: Array },
      viewFn: { type: Object } /* optional callback function - use event instead */
    };
  }

  constructor() {
    super();
    this.movies = [];
  }

  _generateViewEvent(id:number) {
    this.dispatchEvent(new CustomEvent('view', {
      bubbles: true,
      composed: true,
      detail: { id }
    }));
  }

  render() {
    return html`
      <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>          
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        ${this.movies.map((m:any) => html`
            <tr>
              <td><a href="#" @click="${() => this._generateViewEvent(m.id)}">${ m.id }</a></td>
              <td>${ m.title }</td>
              <td>${ m.release_date }</td>    
            </tr>
          `
        )}     
      </tbody>
    </table>
    `
  }
  
}
