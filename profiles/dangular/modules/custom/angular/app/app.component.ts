import { Component } from 'angular2/core';

@Component({
  selector: 'drupal-view',
  template: document.getElementById('views-view').innerHTML
})
export class AppComponent {

  getClasses () {
    return 'clearing-thumbs small-block-grid-5';
  }

}
