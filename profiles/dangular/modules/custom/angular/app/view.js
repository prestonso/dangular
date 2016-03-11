System.register(['rxjs/Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var View;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            View = (function () {
                function View(entity) {
                    this.classes = new Subject_1.Subject();
                    this.entity = entity;
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
                    // Allow external code to react.
                    this.classes.next(classes);
                };
                return View;
            }());
            exports_1("View", View);
        }
    }
});
//# sourceMappingURL=view.js.map