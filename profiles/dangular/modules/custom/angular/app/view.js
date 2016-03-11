System.register(['rxjs/Observable', 'rxjs/add/operator/share'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1;
    var View;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            View = (function () {
                /**
                 * @param {object} entity
                 *   The config entity.
                 */
                function View(entity) {
                    var _this = this;
                    this.entity = entity;
                    // Set up a public subscriber for changes to the view's CSS class list.
                    this.classes$ = new Observable_1.Observable(function (observer) { return _this._classes = observer; }).share();
                }
                View.prototype.id = function () {
                    return this.entity.id;
                };
                View.prototype.toJSON = function () {
                    return JSON.stringify(this.entity);
                };
                View.prototype.getClasses = function () {
                    return this.entity.display['default'].display_options.style.options['class'];
                };
                View.prototype.setClasses = function (classes) {
                    this.entity.display['default'].display_options.style.options['class'] = classes;
                    // Push the new class list to subscribers.
                    this._classes.next(classes);
                };
                return View;
            }());
            exports_1("View", View);
        }
    }
});
//# sourceMappingURL=view.js.map