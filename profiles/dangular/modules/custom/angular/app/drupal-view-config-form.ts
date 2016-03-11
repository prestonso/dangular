import {
    Component,
    OnInit
} from 'angular2/core';

import {
    Views
} from './views.service';

import { View } from './view';

@Component({
    selector: 'drupal-view-config-form',
    template: `
    <form template="ngIf:entity">
        <div>
            <label>Columns</label>
            <input type="number" min="1" max="8" [value]="getColumns()" (change)="setColumns($event)" />
        </div>
        <div>
            <button type="submit" class="button" (click)="persist()" [disabled]="submitted">Save Changes</button>
        </div>
    </form>
`
})
export class DrupalViewConfigForm implements OnInit
{
    /**
     * The view entity.
     *
     * @type {object}
     */
    entity: any;

    /**
     * Whether the form has been submitted.
     *
     * @type {boolean}
     */
    submitted = false;

    /**
     * Regular expression to find CSS classes with a column count.
     *
     * @type {RegExp}
     */
    private columnClass = /-block-grid-([0-9]+)/;

    constructor (private views: Views)
    {
        // Angular will take care of dependency injection here.
    }

    ngOnInit ()
    {
        var self = this;

        this.views.load('dangular_image_grid').then(
            function (view: View)
            {
                self.entity = view;
            }
        );
    }

    getColumns ()
    {
        var match = this.entity.getClasses().match(this.columnClass);

        return match ? parseInt(match[1]) : 0;
    }

    setColumns (event: any)
    {
        var columns = event.target.value;
        var classes = this.entity.getClasses();

        if (this.columnClass.test(classes))
        {
            classes = classes.replace(this.columnClass, '-block-grid-' + columns);
        }
        else
        {
            classes += ' small-block-grid-' + columns;
        }

        this.entity.setClasses(classes);
    }

    persist ()
    {
        this.submitted = true;
        this.views.save(this.entity).then(() => this.submitted = false);
    }
}
