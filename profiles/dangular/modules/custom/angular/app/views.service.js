System.register(['angular2/core', 'angular2/http', './services/message-queue', './view', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, message_queue_1, view_1;
    var Views;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (message_queue_1_1) {
                message_queue_1 = message_queue_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (_1) {}],
        execute: function() {
            Views = (function () {
                function Views(http, messageQueue) {
                    this.http = http;
                    this.messageQueue = messageQueue;
                    /**
                     * Base URL to the Views service endpoint.
                     *
                     * @type {string}
                     */
                    this.baseUrl = Drupal.url('dangular-endpoint/view');
                    this.views = {};
                    this.options = new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            // We'll get internal server errors without the proper Accept
                            // header.
                            'Accept': 'application/json',
                            // When sending data, we will always encode as JSON.
                            'Content-Type': 'application/json'
                        })
                    });
                }
                /**
                 * Loads a view entity.
                 *
                 * @param {string} id
                 *   The view ID.
                 *
                 * @returns {Promise<Response>}
                 */
                Views.prototype.load = function (id) {
                    if (!(id in this.views)) {
                        this.views[id] = this.http.get(this.baseUrl + '/' + id, this.options)
                            .toPromise()
                            .then(function (response) {
                            return new view_1.View(response.json());
                        });
                    }
                    return this.views[id];
                };
                /**
                 * Saves an existing view entity.
                 *
                 * @param {object} view
                 *   The view entity.
                 *
                 * @returns {Promise<Response>}
                 */
                Views.prototype.save = function (view) {
                    var self = this, id = view.id();
                    return this.http.put(this.baseUrl + '/' + id(), view.toJSON(), this.options)
                        .toPromise()
                        .then(function () {
                        self.messageQueue.notify('The view has been saved!');
                        // Destroy the cached promise; the next load will go to the server.
                        delete self.views[id];
                    });
                };
                Views = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, message_queue_1.MessageQueue])
                ], Views);
                return Views;
            }());
            exports_1("Views", Views);
        }
    }
});
//# sourceMappingURL=views.service.js.map