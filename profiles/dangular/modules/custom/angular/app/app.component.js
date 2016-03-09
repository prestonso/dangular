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
                    this.columns = 0;
                    this.classes = [];
                    // Angular will take care of dependency injection here.
                }
                AppComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.views.load('dangular_image_grid')
                        .then(function (response) {
                        self.entity = response.json();
                        self.entity.display.default.display_options.style.options.class.split(' ').forEach(function (c) {
                            if (/^small-block-grid-[0-9]+$/.test(c)) {
                                this.columns = parseInt(c.split('-')[3]);
                            }
                            else {
                                this.classes.push(c);
                            }
                        }, self);
                    });
                };
                AppComponent.prototype.getClasses = function () {
                    return this.classes.concat('small-block-grid-' + this.columns).join(' ');
                };
                AppComponent.prototype.getColumns = function () {
                    return this.columns;
                };
                AppComponent.prototype.setColumns = function (event) {
                    this.columns = event.target.value;
                };
                AppComponent.prototype.persist = function () {
                    this.entity.display.default.display_options.style.options.class = this.getClasses();
                    this.views.save(this.entity)
                        .then(function () {
                        alert('Saved!');
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