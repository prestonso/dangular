import {
    Injectable
} from 'angular2/core';

import {
    Subject
} from 'rxjs/Subject';

@Injectable()
export class MessageQueue
{
    /**
     * Notice queue source.
     *
     * @type {Subject<string>}
     */
    private noticeSource = new Subject<string>();

    /**
     * Warning queue source.
     *
     * @type {Subject<string>}
     */
    private warningSource = new Subject<string>();

    /**
     * Error queue source.
     *
     * @type {Subject<string>}
     */
    private errorSource = new Subject<string>();

    /**
     * Observable notice queue.
     *
     * @type {Observable<string>}
     */
    notices = this.noticeSource.asObservable();

    /**
     * Observable warning queue.
     *
     * @type {Observable<string>}
     */
    warnings = this.warningSource.asObservable();

    /**
     * Observable error queue.
     *
     * @type {Observable<string>}
     */
    errors = this.errorSource.asObservable();

    /**
     * Logs a notice.
     *
     * @param {string} message
     */
    notify (message: string)
    {
        this.noticeSource.next(message);
    }

    /**
     * Logs a warning.
     *
     * @param {string} message
     */
    warn (message: string)
    {
        this.warningSource.next(message);
    }

    /**
     * Logs an error.
     *
     * @param {string} message
     */
    err (message: string)
    {
        this.errorSource.next(message);
    }
}
