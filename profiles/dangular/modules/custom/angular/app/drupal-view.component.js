System.register(['angular2/core', './views.service', './components/drupal-messages'], function(exports_1, context_1) {
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
    var core_1, views_service_1, drupal_messages_1;
    var DrupalView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (views_service_1_1) {
                views_service_1 = views_service_1_1;
            },
            function (drupal_messages_1_1) {
                drupal_messages_1 = drupal_messages_1_1;
            }],
        execute: function() {
            DrupalView = (function () {
                function DrupalView(views) {
                    this.views = views;
                    /**
                     * Whether the form has been submitted.
                     *
                     * @type {boolean}
                     */
                    this.submitted = false;
                    /**
                     * Regular expression to find CSS classes with a column count.
                     *
                     * @type {RegExp}
                     */
                    this.columnClass = /-block-grid-([0-9]+)/;
                    // Angular will take care of dependency injection here.
                }
                DrupalView.prototype.ngOnInit = function () {
                    var self = this;
                    this.views.load('dangular_image_grid').then(function (view) {
                        self.entity = view;
                    });
                };
                DrupalView.prototype.getColumns = function () {
                    var match = this.entity.getClasses().match(this.columnClass);
                    return match ? parseInt(match[1]) : 0;
                };
                DrupalView.prototype.setColumns = function (event) {
                    var columns = event.target.value;
                    var classes = this.entity.getClasses();
                    if (this.columnClass.test(classes)) {
                        classes = classes.replace(this.columnClass, '-block-grid-' + columns);
                    }
                    else {
                        classes += ' small-block-grid-' + columns;
                    }
                    this.entity.setClasses(classes);
                };
                DrupalView.prototype.persist = function () {
                    var _this = this;
                    this.views.save(this.entity).then(function () { return _this.submitted = false; });
                };
                DrupalView = __decorate([
                    core_1.Component({
                        selector: 'drupal-view',
                        template: document.getElementById('views-view').innerHTML,
                        providers: [
                            views_service_1.Views
                        ],
                        directives: [
                            drupal_messages_1.DrupalMessages
                        ]
                    }), 
                    __metadata('design:paramtypes', [views_service_1.Views])
                ], DrupalView);
                return DrupalView;
            }());
            exports_1("DrupalView", DrupalView);
        }
    }
});
//# sourceMappingURL=drupal-view.component.js.map