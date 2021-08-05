import { property } from '@lit/reactive-element/decorators/property';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MovieBase } from './movie-base';

@customElement('movie-search')
export class MovieSearch extends MovieBase {
    
    @property({type:String})
    private search: string = ''
    
    @property({type:Boolean})
    private disabled: boolean = false

    render() {
        return html`
        <form id="searchForm">
            <div class="row">
                <input class="col-10 form-input" .value="${this.search}" @keydown="${ (e:any) => this._search(e) }" placeholder="search....">
                <button type="reset" ?disabled="${this.disabled}" class="btn btn-warning btn-rounded col-1 mx-3" @click="${(e:any)=> this._dispatchClear(e)}">Clear</button>
            </div> 
            <div class="row mt-2"> 
                <div class="col-2">
                    <input type="radio" name="customSearch" value="popular" @click="${(e:any) => this._customSearch(e)}"/>
                    <label for="customSearch">Popular</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="top" @click="${(e:any) => this._customSearch(e)}"/>
                    <label for="customSearch">Top Rated</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="trending" @click="${(e:any) => this._customSearch(e)}"/>
                    <label for="customSearch">Trending</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="playing" @click="${(e:any) => this._customSearch(e)}"/>
                    <label for="customSearch">Now Playing</label>
                </div>
                <div class="col-2">
                    <input type="radio" name="customSearch" value="upcoming" @click="${(e:any) => this._customSearch(e)}"/>
                    <label for="customSearch">Upcoming</label>
                </div>
            </div>  
        </form>
        `;
    }

    _search(e:any) {
        if (e.key === 'Enter') {
            e.preventDefault(); // prevent form from submitting           
            this._dispatchSearch(e.target.value)
            e.target.form.reset(); // reset form (radio button reset - may be better way to do this)
        }
    }
    _customSearch(e:any) {
        this._dispatchSearch(`:${e.target.value}`)
    }

    _dispatchSearch(search:string) {
        this.dispatchEvent(new CustomEvent('search', {
            bubbles: true,
            composed: true,
            detail: search
        }));        
    }
    _dispatchClear(e:any) {
        this.dispatchEvent(new CustomEvent('clear', {
            bubbles: true,
            composed: true
        }));
        // reset form containing target (resets radio inputs - may be better way to do this)
        e.target.form.reset();
    }
}
