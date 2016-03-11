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

import {
    DrupalMessages
} from './components/drupal-messages';

import {
    MessageQueue
} from './services/message-queue';

import { DrupalViewConfigForm } from './drupal-view-config-form';

@Component({
    selector: 'body',
    template: document.body.innerHTML,
    providers: [
        HTTP_PROVIDERS,
        MessageQueue,
        Views
    ],
    directives: [
        DrupalMessages,
        DrupalView,
        DrupalViewConfigForm
    ]
})
export class AppComponent
{
}
