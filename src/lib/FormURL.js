class FormURL {
    /**
     * There are two URLs used to get the data, the resulting domain and the request domain
     * Resulting domain: Used to make a request to the Discord client via the /app/ directory to get the needed file names
     * Request domain: This is a cut down version of the resulting domain and is made to be capable of appending /assets/ to the domain plus the newly fetch filenames.
     */

    /**
     * @param options - You may use the release channel for the constructor
     */
    constructor(options = {}) {
        this.options = options;
        if (options.client) {
            this.options.client = options.client;
        }
    }

    /** Returns the URLs as an array based on the parameters
     *
     * @param release_channel - Release channel can either be accessed via the options from the constructor or parameters
     * @returns {string[]} - Client data returned
     */
    formURL(release_channel) {
        if (!release_channel) {
            release_channel = this.options.client;
        }
        let baseDomain = `discord.com`;
        let resulting_domain = baseDomain;
        let request_data_domain = baseDomain;
        let abs_release_channel = release_channel.toLowerCase();
        if (abs_release_channel === `canary` || abs_release_channel === `ptb`) {
            resulting_domain = `https://${abs_release_channel}.${baseDomain}/app`;
            request_data_domain = `https://${abs_release_channel}.${baseDomain}`;
            return [resulting_domain, request_data_domain];
        } if (abs_release_channel === `stable`) {
            resulting_domain = `https://${baseDomain}/app`;
            request_data_domain = `https://${baseDomain}`;
            return [resulting_domain, request_data_domain];
        } else {
            resulting_domain = `https://${baseDomain}/app`;
            request_data_domain = `https://${baseDomain}`;
            return [resulting_domain, request_data_domain];
        }
    }

    /** Returns the URLs as an object based on the parameters
     *
     * @param release_channel - stable, canary, ptb; otherwise the default is stable
     * @returns {{REQUEST_DOMAIN: string, RESULTING_DOMAIN: string}}
     */
    formURLObj(release_channel) {
        const formedURLs = this.formURL(release_channel);
        const formedURLObjects = {
            RESULTING_DOMAIN: formedURLs[0],
            REQUEST_DOMAIN: formedURLs[1]
        };
        return formedURLObjects;
    }
}

module.exports = FormURL;
