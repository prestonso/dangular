System.register(['angular2/core', '../services/message-queue'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, message_queue_1;
    var DrupalMessages;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_queue_1_1) {
                message_queue_1 = message_queue_1_1;
            }],
        execute: function() {
            DrupalMessages = (function () {
                function DrupalMessages(messageQueue) {
                    // Angular will take care of dependency injection.
                    this.messageQueue = messageQueue;
                    this.messages = [];
                    var self = this;
                    messageQueue.notices.subscribe(function (notice) {
                        self.messages.push({
                            text: notice,
                            severity: 'notice'
                        });
                    });
                    messageQueue.warnings.subscribe(function (warning) {
                        self.messages.push({
                            text: warning,
                            severity: 'warning'
                        });
                    });
                    messageQueue.errors.subscribe(function (error) {
                        self.messages.push({
                            text: error,
                            severity: 'error'
                        });
                    });
                }
                DrupalMessages = __decorate([
                    core_1.Component({
                        selector: 'drupal-messages',
                        template: '<ul><li *ngFor="#message of messages" class="{{message.severity}}">{{message.text}}</li></ul>'
                    }), 
                    __metadata('design:paramtypes', [message_queue_1.MessageQueue])
                ], DrupalMessages);
                return DrupalMessages;
            }());
            exports_1("DrupalMessages", DrupalMessages);
        }
    }
});
//# sourceMappingURL=drupal-messages.js.map