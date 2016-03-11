import { Subject } from 'rxjs/Subject';

export class View
{
    private entity: any;

    classes = new Subject<string>();

    constructor (entity: any)
    {
        this.entity = entity;
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

    setClasses (classes)
    {
        this.entity.display['default'].display_options.style.options['class'] = classes;

        // Allow external code to react.
        this.classes.next(classes);
    }
}
