// Class just to parse strings and decorate them
// Side note: It's all fancy stuff, don't plan on using this unless you want to see what the data generally looks like
const { release_channels } = require('../constants/Constants');


class ParseStrings {
    /**
     *
     * @param options - No options needed
     */
    constructor(options = {}) {
        this.options = options;
        this.release_channels = release_channels;
    }

    /**
     *
     * @param release_channel - Takes the release channel and capitalizes it to make things fancier, not really necessary but gives a visualization of the data.
     * @returns {string}
     */
    capitalizeReleaseChannel(release_channel) {
        if (this.release_channels.includes(release_channel)) {
            let rc = release_channel.toLowerCase();
            if (rc === 'canary' || rc === 'stable') {
                return (rc.substring(0, 1)).toUpperCase() + rc.substr(1);
            } else if (rc === 'ptb') {
                return rc.toUpperCase();
            } else {
                return rc;
            }
        }
    }

}

module.exports = ParseStrings;