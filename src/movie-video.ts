import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MovieBase } from './movie-base'

@customElement('movie-video')
export class MovieVideo extends MovieBase {
    @property({type:String})
    key: string = ''
    
    private url: string =  `https://www.youtube.com/embed/`

    render() {        
        return html`<iframe src="${this.url+this.key}"></iframe>`
    }

}
