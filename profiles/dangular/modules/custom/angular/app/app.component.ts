import {
    Component
} from 'angular2/core';

import {
    HTTP_PROVIDERS
} from 'angular2/http';

import {
    Views
} from './views.service';

import {
    DrupalView
} from './drupal-view.component';

@Component({
    selector: 'body',
    template: document.body.innerHTML,
    providers: [
        Views,
        HTTP_PROVIDERS
    ],
    directives: [
        DrupalView
    ]
})
export class AppComponent
{
}
