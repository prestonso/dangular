import { Component } from 'angular2/core';

@Component({
  selector: 'drupal-view',
  template: document.getElementById('views-view').innerHTML
})
export class AppComponent {

  columns: number = 4;

  setColumns (event) {
    this.columns = event.target.value;
  }

  getClasses () {
    return 'clearing-thumbs small-block-grid-' + this.columns;
  }

}
