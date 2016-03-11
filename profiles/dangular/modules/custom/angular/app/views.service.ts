import {
    Injectable
} from 'angular2/core';

import {
    Headers,
    Http,
    RequestOptions,
    Response
} from 'angular2/http';

import {
    MessageQueue
} from './services/message-queue';

import { View } from './view';

// We only need .toPromise(), so methinks we should only import that.
// Y'know, when I figure out how to do it.
import 'rxjs/Rx';

// The Drupal object is global.
declare var Drupal: any;

@Injectable()
export class Views
{
    /**
     * Base URL to the Views service endpoint.
     *
     * @type {string}
     */
    private baseUrl = Drupal.url('dangular-endpoint/view');

    /**
     * Base request options.
     *
     * @type {RequestOptions}
     */
    private options: RequestOptions;

    /**
     * Cache of view entities that have been loaded or are currently being
     * loaded asynchronously, keyed by view ID. Each view is wrapped by a
     * Promise.
     *
     * @type {{}}
     */
    private views = {};

    constructor (private http: Http, private messageQueue: MessageQueue)
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
     * @returns {Promise<View>}
     */
    load (id)
    {
        if (! (id in this.views))
        {
            this.views[id] = this.http.get(this.baseUrl + '/' + id, this.options)
                .toPromise()
                .then(
                    function (response: Response)
                    {
                        return new View(response.json());
                    }
                );
        }

        return this.views[id];
    }

    /**
     * Saves an existing view entity.
     *
     * @param {object} view
     *   The view entity.
     *
     * @returns {Promise<Response>}
     */
    save (view: View)
    {
        var self = this, id = view.id();

        return this.http.put(this.baseUrl + '/' + id, view.toJSON(), this.options)
            .toPromise()
            .then(
                function ()
                {
                    self.messageQueue.notify('The view has been saved!');

                    // Destroy the cached promise; the next load will go to the server.
                    delete self.views[id];
                }
            );
    }
}
