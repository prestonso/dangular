System.register(['angular2/core', 'rxjs/Subject'], function(exports_1, context_1) {
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
    var core_1, Subject_1;
    var MessageQueue;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            MessageQueue = (function () {
                function MessageQueue() {
                    /**
                     * Notice queue source.
                     *
                     * @type {Subject<string>}
                     */
                    this.noticeSource = new Subject_1.Subject();
                    /**
                     * Warning queue source.
                     *
                     * @type {Subject<string>}
                     */
                    this.warningSource = new Subject_1.Subject();
                    /**
                     * Error queue source.
                     *
                     * @type {Subject<string>}
                     */
                    this.errorSource = new Subject_1.Subject();
                    /**
                     * Observable notice queue.
                     *
                     * @type {Observable<string>}
                     */
                    this.notices = this.noticeSource.asObservable();
                    /**
                     * Observable warning queue.
                     *
                     * @type {Observable<string>}
                     */
                    this.warnings = this.warningSource.asObservable();
                    /**
                     * Observable error queue.
                     *
                     * @type {Observable<string>}
                     */
                    this.errors = this.errorSource.asObservable();
                }
                /**
                 * Logs a notice.
                 *
                 * @param {string} message
                 */
                MessageQueue.prototype.notify = function (message) {
                    this.noticeSource.next(message);
                };
                /**
                 * Logs a warning.
                 *
                 * @param {string} message
                 */
                MessageQueue.prototype.warn = function (message) {
                    this.warningSource.next(message);
                };
                /**
                 * Logs an error.
                 *
                 * @param {string} message
                 */
                MessageQueue.prototype.err = function (message) {
                    this.errorSource.next(message);
                };
                MessageQueue = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MessageQueue);
                return MessageQueue;
            }());
            exports_1("MessageQueue", MessageQueue);
        }
    }
});
//# sourceMappingURL=message-queue.js.map