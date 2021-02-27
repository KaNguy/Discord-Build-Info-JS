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
        release_channel = release_channel ? release_channel
            : this.options.client ? this.options.client
                : "";

        let baseDomain = `discord.com`;
        let abs_release_channel = release_channel ? release_channel.toLowerCase() : "";
        let resulting_domain = (abs_release_channel !== 'stable' && abs_release_channel) ? `https://${abs_release_channel}.${baseDomain}/app` : `https://${baseDomain}/app`;
        let request_data_domain = (abs_release_channel !== 'stable' && abs_release_channel) ? `https://${abs_release_channel}.${baseDomain}` : `https://${baseDomain}`;
        return [resulting_domain, request_data_domain];
    }

    /** Returns the URLs as an object based on the parameters
     *
     * @param release_channel - stable, canary, ptb; otherwise the default is stable
     * @returns {{REQUEST_DOMAIN: string, RESULTING_DOMAIN: string}}
     */
    formURLObj(release_channel) {
        const formedURLs = this.formURL(release_channel);
        return {
            RESULTING_DOMAIN: formedURLs[0],
            REQUEST_DOMAIN: formedURLs[1]
        };
    }
}

module.exports = FormURL;
