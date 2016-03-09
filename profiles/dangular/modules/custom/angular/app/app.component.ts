import {
    Component,
    OnInit
} from 'angular2/core';

import {
    Headers,
    Http,
    RequestOptions,
    Response,
    HTTP_PROVIDERS
} from 'angular2/http';

import 'rxjs/Rx';

@Component({
  selector: 'drupal-view',
  template: document.getElementById('views-view').innerHTML,
  providers: [
    HTTP_PROVIDERS
  ],
})
export class AppComponent implements OnInit {

  constructor (private http: Http) {
    // Now we can use this.http for HTTP transactions!
  }

    entity: any = null;

    columns = 0;

    classes: string[] = [];

    ngOnInit () {
        var headers = new Headers({
            Accept: 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var self = this;
        this.http.get('/dangular-endpoint/view/dangular_image_grid', options)
            .toPromise()
            .then(function (result) {
               self.entity = result.json();
                self.entity.display.default.display_options.style.options.class.split(' ').forEach(function (c: string) {
                   if (/^small-block-grid-[0-9]+$/.test(c)) {
                       this.columns = parseInt(c.split('-')[3]);
                   }
                    else {
                       this.classes.push(c);
                   }
                }, self);
            });
    }

    getClasses () {
        return this.classes.concat('small-block-grid-' + this.columns).join(' ');
    }

    getColumns () {
        return this.columns;
    }

  setColumns (event) {
      this.columns = event.target.value;
  }

  persist () {
      this.entity.display.default.display_options.style.options.class = this.getClasses();
      var headers = new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
      });
      var options = new RequestOptions({
          headers: headers
      });
      this.http.put('/dangular-endpoint/view/dangular_image_grid', JSON.stringify(this.entity), options)
          .toPromise()
          .then(function () {
              alert('saved!');
          });
  }

}
