System.register(['angular2/core', './views.service', './components/drupal-messages', './drupal-view-config-form'], function(exports_1, context_1) {
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
    var core_1, views_service_1, drupal_messages_1, drupal_view_config_form_1;
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
            },
            function (drupal_view_config_form_1_1) {
                drupal_view_config_form_1 = drupal_view_config_form_1_1;
            }],
        execute: function() {
            DrupalView = (function () {
                function DrupalView(views) {
                    this.views = views;
                    /**
                     * The CSS classes to apply to the view.
                     *
                     * @type {string}
                     */
                    this.classes = '';
                    // Angular will take care of dependency injection here.
                }
                DrupalView.prototype.ngOnInit = function () {
                    var self = this;
                    this.views.load('dangular_image_grid').then(function (view) {
                        self.classes = view.getClasses();
                        view.classes$.subscribe(function (classes) { return self.classes = classes; });
                    });
                };
                DrupalView = __decorate([
                    core_1.Component({
                        selector: 'drupal-view',
                        template: document.getElementById('views-view').innerHTML,
                        directives: [
                            drupal_messages_1.DrupalMessages,
                            drupal_view_config_form_1.DrupalViewConfigForm
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