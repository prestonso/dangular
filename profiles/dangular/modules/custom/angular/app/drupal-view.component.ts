import {
    Component,
    OnInit
} from 'angular2/core';

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
     * The CSS classes to apply to the view.
     *
     * @type {string}
     */
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
                self.classes = view.getClasses();
                view.classes$.subscribe(classes => self.classes = classes);
            }
        );
    }
}
