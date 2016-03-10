import {
    Injectable
} from 'angular2/core';

import {
    Headers,
    Http,
    RequestOptions,
    Response
} from 'angular2/http';

// We only need .toPromise(), so methinks we should only import that.
// Y'know, when I figure out how to do it.
import 'rxjs/Rx';

@Injectable()
export class Views
{
    /**
     * Base URL to the Views service endpoint.
     *
     * @type {string}
     */
    private baseUrl = '/dangular-endpoint/view';

    /**
     * Base request options.
     *
     * @type {RequestOptions}
     */
    private options: RequestOptions;

    constructor (private http: Http)
    {
        this.options = new RequestOptions({
            headers: new Headers({
                // We'll get internal server errors without the proper Accept
                // header.
                'Accept': 'application/json',
                // When sending data, we will always encode as JSON.
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * Loads a view entity.
     *
     * @param {string} id
     *   The view ID.
     *
     * @returns {Promise<Response>}
     */
    load (id)
    {
        return this.http.get(this.baseUrl + '/' + id, this.options).toPromise();
    }

    /**
     * Saves an existing view entity.
     *
     * @param {object} view
     *   The view entity.
     *
     * @returns {Promise<Response>}
     */
    save (view: any)
    {
        return this.http.put(this.baseUrl + '/' + view.id, JSON.stringify(view), this.options).toPromise();
    }
}
