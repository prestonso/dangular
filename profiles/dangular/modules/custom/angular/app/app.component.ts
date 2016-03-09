import {
    Component
} from 'angular2/core';

import {
    Http,
    Response,
    HTTP_PROVIDERS
} from 'angular2/http';

@Component({
  selector: 'drupal-view',
  template: document.getElementById('views-view').innerHTML,
  providers: [
    HTTP_PROVIDERS
  ]
})
export class AppComponent {

  constructor (private http: Http) {
    // Now we can use this.http for HTTP transactions!
  }

  columns: number = 4;

  setColumns (event) {
    this.columns = event.target.value;
  }

  getClasses () {
    return 'clearing-thumbs small-block-grid-' + this.columns;
  }

  persist () {
    // Actually save the changes here.
  }

}
