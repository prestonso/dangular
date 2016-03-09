import {
    Component,
    OnInit
} from 'angular2/core';

import {
    HTTP_PROVIDERS
} from 'angular2/http';

import {
    Views
} from './views.service';

@Component({
  selector: 'drupal-view',
  template: document.getElementById('views-view').innerHTML,
  providers: [
      Views,
      HTTP_PROVIDERS
  ],
})
export class AppComponent implements OnInit
{
    private entity: any;

    constructor (private views: Views)
    {
        // Angular will take care of dependency injection here.
    }

    columns = 0;

    classes: string[] = [];

    ngOnInit () {
        var self = this;

        this.views.load('dangular_image_grid')
            .then(function (response) {
                self.entity = response.json();

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

    getClasses ()
    {
        return this.classes.concat('small-block-grid-' + this.columns).join(' ');
    }

    getColumns ()
    {
        return this.columns;
    }

    setColumns (event)
    {
        this.columns = event.target.value;
    }

    persist ()
    {
        this.entity.display.default.display_options.style.options.class = this.getClasses();

        this.views.save(this.entity)
            .then(function () {
                alert('Saved!');
            });
    }
}
