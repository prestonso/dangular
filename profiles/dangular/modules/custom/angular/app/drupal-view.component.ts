import {
    Component,
    OnInit
} from 'angular2/core';

import {
    HTTP_PROVIDERS,
    Response
} from 'angular2/http';

import {
    Views
} from './views.service';

import {
    DrupalMessages
} from './components/drupal-messages';

import { View } from './view';
import { DrupalViewConfigForm } from './drupal-view-config-form';

@Component({
    selector: 'drupal-view',
    template: document.getElementById('views-view').innerHTML,
    directives: [
        DrupalMessages,
        DrupalViewConfigForm
    ]
})
export class DrupalView implements OnInit
{
    /**
     * The view entity.
     *
     * @type {object}
     */
    entity: any;

    classes = '';

    constructor (private views: Views)
    {
        // Angular will take care of dependency injection here.
    }

    ngOnInit ()
    {
        var self = this;

        this.views.load('dangular_image_grid').then(
            function (view: View)
            {
                self.entity = view;
                self.classes = view.getClasses();
                view.classes$.subscribe(
                    function (the_classes) {
                        self.classes = the_classes;
                    }
                );
            }
        );
    }
}
