import {
    Component
} from 'angular2/core';

import {
    MessageQueue
} from '../services/message-queue';

@Component({
    selector: 'drupal-messages',
    template: '<ul><li *ngFor="#message of messages" class="{{message.severity}}">{{message.text}}</li></ul>'
})
export class DrupalMessages
{
    messages: any[] = [];

    constructor (private messageQueue: MessageQueue)
    {
        // Angular will take care of dependency injection.

        var self = this;

        messageQueue.notices.subscribe(
            function (notice)
            {
                self.messages.push({
                    text: notice,
                    severity: 'notice'
                });
            }
        );

        messageQueue.warnings.subscribe(
            function (warning)
            {
                self.messages.push({
                    text: warning,
                    severity: 'warning'
                });
            }
        );

        messageQueue.errors.subscribe(
            function (error)
            {
                self.messages.push({
                    text: error,
                    severity: 'error'
                })
            }
        );
    }
}
