System.register(['angular2/core', 'angular2/http', './views.service'], function(exports_1, context_1) {
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
    var core_1, http_1, views_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (views_service_1_1) {
                views_service_1 = views_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(views) {
                    this.views = views;
                    this.classes = '';
                    this.submitted = false;
                    this.columnClass = /-block-grid-([0-9]+)/;
                    // Angular will take care of dependency injection here.
                }
                AppComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.views.load('dangular_image_grid').then(function (response) {
                        self.entity = response.json();
                        self.classes = self.entity.display['default'].display_options.style.options['class'];
                    });
                };
                AppComponent.prototype.getColumns = function () {
                    var match = this.classes.match(this.columnClass);
                    return match ? parseInt(match[1]) : 0;
                };
                AppComponent.prototype.setColumns = function (event) {
                    var columns = event.target.value;
                    if (this.columnClass.test(this.classes)) {
                        this.classes = this.classes.replace(this.columnClass, '-block-grid-' + columns);
                    }
                    else {
                        this.classes += ' small-block-grid-' + columns;
                    }
                    this.entity.display['default'].display_options.style.options['class'] = this.classes;
                };
                AppComponent.prototype.persist = function () {
                    var self = this;
                    self.submitted = true;
                    this.views.save(this.entity).then(function () {
                        self.submitted = false;
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'drupal-view',
                        template: document.getElementById('views-view').innerHTML,
                        providers: [
                            views_service_1.Views,
                            http_1.HTTP_PROVIDERS
                        ],
                    }), 
                    __metadata('design:paramtypes', [views_service_1.Views])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map