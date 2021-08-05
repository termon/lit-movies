import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MovieBase } from './movie-base';

@customElement('movie-home')
export class MovieHome extends MovieBase {

  render() {
    return html`
          <h3 class="mt-4 mb-4">The Movie Database Browser</h3>
          <div class="card text-white bg-dark" >
          <div class="card-body">
            <h5 class="card-title">Web Components Using LitElement </h5>
            <p class="card-text">
              Built using
              <ul>
                <li>LitElement</li>
                <li>MobX</li>
                <li>lit-mobx</li>
                <li>vaadin router</li>
                <li>The Movie Database Web API</li>
                <li>ES Module imports (no npm or local bundler required)</li>
              </ul>
            </p>         
          </div>
        </div>
    `;
  }

}