import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class View
{
    /**
     * The config entity.
     *
     * @type {object}
     */
    private entity: any;

    /**
     * Stream of changes to the view's CSS class list.
     *
     * @type {Observer<string>}
     */
    private _classes: Observer<string>;

    /**
     * Subscriber for changes to the view's CSS class list.
     *
     * @type {Observable<string>}
     */
    classes$: Observable<string>;

    /**
     * @param {object} entity
     *   The config entity.
     */
    constructor (entity: any)
    {
        this.entity = entity;

        // Set up a public subscriber for changes to the view's CSS class list.
        this.classes$ = new Observable<string>(observer => this._classes = observer).share();
    }

    id (): string
    {
        return this.entity.id;
    }

    toJSON (): string
    {
        return JSON.stringify(this.entity);
    }

    getClasses (): string
    {
        return this.entity.display['default'].display_options.style.options['class'];
    }

    setClasses (classes: string): void
    {
        this.entity.display['default'].display_options.style.options['class'] = classes;

        // Push the new class list to subscribers.
        this._classes.next(classes);
    }
}
