import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class View
{
    private entity: any;

    _classesObserver: Observer<string>;

    classes$: Observable<string>;

    constructor (entity: any)
    {
        var self = this;

        this.entity = entity;

        this.classes$ = new Observable<string>(
            function (observer)
            {
                self._classesObserver = observer;
            }
        ).share();
    }

    id ()
    {
        return this.entity.id;
    }

    toJSON ()
    {
        return JSON.stringify(this.entity);
    }

    getClasses ()
    {
        return this.entity.display['default'].display_options.style.options['class'];
    }

    setClasses (classes: string)
    {
        this.entity.display['default'].display_options.style.options['class'] = classes;

        // Allow external code to react.
        this._classesObserver.next(classes);
    }
}
