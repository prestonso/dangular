import {
    Component,
    OnInit,
    EventEmitter,
    Output
} from 'angular2/core';

import {
    HTTP_PROVIDERS,
    Response
} from 'angular2/http';

import {
    Views
} from './views.service';

import {
    DrupalMessages
} from './components/drupal-messages';

@Component({
    selector: 'drupal-view',
    template: document.getElementById('views-view').innerHTML,
    providers: [
        Views
    ],
    directives: [
        DrupalMessages
    ]
})
export class DrupalView implements OnInit
{
    /**
     * The view entity.
     *
     * @type {object}
     */
    entity: any;

    /**
     * CSS classes applied to the view.
     *
     * @type {string}
     */
    classes = '';

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
            function (response: Response)
            {
                self.entity = response.json();
                self.classes = self.entity.display['default'].display_options.style.options['class'];
            }
        );
    }

    getColumns ()
    {
        var match = this.classes.match(this.columnClass);

        return match ? parseInt(match[1]) : 0;
    }

    setColumns (event: any)
    {
        var columns = event.target.value;

        if (this.columnClass.test(this.classes))
        {
            this.classes = this.classes.replace(this.columnClass, '-block-grid-' + columns);
        }
        else
        {
            this.classes += ' small-block-grid-' + columns;
        }

        this.entity.display['default'].display_options.style.options['class'] = this.classes;
    }

    persist ()
    {
        this.views.save(this.entity).then(() => this.submitted = false);
    }

    @Output() openOffCanvas = new EventEmitter();

    onClickView (event: any)
    {
        this.openOffCanvas.emit(event);
        console.log('this.openOffCanvas.emit(event)');
        console.log(event);
    }
}
