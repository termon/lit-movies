import {html} from 'lit';
import { property, customElement } from 'lit/decorators.js'
import { MovieBase } from '.';
import { IImage } from './types';

@customElement('movie-carousel')
export class MovieCarousel extends MovieBase {
    
    @property()
    public posters: IImage[] = []   
    @property()
    count: number = 3       

    render() {
        return html`
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${this.posters.slice(0,this.count).map((p,i) => html`
                        <div class="carousel-item ${i==0?'active':''}">
                            <img src="${this.posterUrl(p.file_path)}" class="d-block w-100" alt="...">
                        </div>`
                    )}                       
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </a>
            </div>
        `;
    }

}
