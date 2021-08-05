import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MovieBase } from './movie-base';

@customElement('not-found')
export class NotFound extends MovieBase {

  render() {
      return html`
        <h3 class="mt-4">404 - Route not found</h3>
      `;
  }
}