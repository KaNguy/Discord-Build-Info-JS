const FormURL = require('./FormURL.js');

const https = require('https');

class ClientBuild {
    constructor(options = {}) {
        this.options = options;
        if (options.client) {
            this.options.client = options.client;
        }
    }

    /** Gets and returns the requested build information using the built-in @module https
     *
     * @param release_channel - Async method will use the stable client if the release channel that is provided does not exist. There are 3 supported release channels: Canary, Stable, PTB.
     * @returns {Promise<JSON>} - Will return the obtained data as a JSON object which can be called upon, remember to parse it if it does not let you call the objects
     */
    async getClientBuildInfo(release_channel) {
        if (!release_channel) {
            release_channel = release_channel ? this : this.options.client;
        }

        // Gets the URLs based on the release channel
        const [resulting_domain, request_data_domain] = new FormURL().formURL(release_channel);

        // Finds the asset files and returns the asset file names
        const assetFileRegex = /\/assets\/([a-zA-z0-9]+).js/g;

        // Needs to use a promise in order to asynchronously return the asset file URL
        return new Promise((resolve, reject) => {
            https.get(resulting_domain, callback => {
                // Listens for data and stringifies it
                callback.on('data', rawData => {
                    // Parses the data as a String
                    const data = String(rawData);

                    // Gets the asset files via regex
                    let rawFileSearchResults = String(data).match(assetFileRegex);

                    // Removes all null results
                    let reqAssetFile = String(rawFileSearchResults).replace(/null/g, '').split(" ").join("").split(",");

                    // Get's the asset file that contains the needed information
                    let targetAsset = reqAssetFile[reqAssetFile.length - 1];

                    if (targetAsset.match(assetFileRegex) && String(targetAsset.match(assetFileRegex)).endsWith(".js")) {
                        // Pieces the base domain with the asset file directory
                        let newURL = request_data_domain + targetAsset;

                        // Resolves the final URL so null results aren't returned
                        if (newURL.match(assetFileRegex)) {
                            // Gets the build information for the build number and hash
                            //const buildInfoRegex = new RegExp(/Build Number: [0-9]+, Version Hash: [A-Za-z0-9]+/);
                            const buildInfoRegex = /Build Number: [0-9]+, Version Hash: [A-Za-z0-9]+/;
                            const releaseChannel = release_channel ? release_channel.toLowerCase() : 'stable';
                            /**
                             * Using @Promise<T> to resolve the data
                             */
                            // newURL is simply the URL fetched from earlier
                            https.get(String(newURL), callback => {
                                // Event listener for the data
                                callback.on('data', raw_data => {
                                    // Parses data as a String
                                    const data = String(raw_data);

                                    // Executes the data with the regex
                                    const regexBuildInfoResults = buildInfoRegex.exec(data);

                                    // Only returns the data if it isn't null
                                    if (regexBuildInfoResults !== null && String(regexBuildInfoResults).match(buildInfoRegex) !== null) {
                                        // Parsed build strings that need separation
                                        let build_strings = regexBuildInfoResults ? regexBuildInfoResults[0].replace(" ", "").split(",") : [];
                                        if (!build_strings[0]) {
                                            reject({
                                                "error": "No data"
                                            });
                                            throw new Error('No data was found.');
                                        }

                                        // Gets the buildNumber as a parsed Integer
                                        const buildNumber = parseInt(build_strings[0].split(":")[1].replace(" ", ""), 10);

                                        // Gets the build hash
                                        const buildHash = build_strings[1].split(":")[1].replace(" ", "");

                                        // Gets the build ID, couldn't do it via headers unless another domain is used.
                                        const buildID = build_strings[1].split(":")[1].replace(" ", "").substring(0, 7);

                                        // Final client / build data resolved as an Object
                                        const clientData = {
                                            releaseChannel,
                                            buildNumber,
                                            buildHash,
                                            buildID,
                                        };

                                        // Resolves the final, returns the {clientData} which is the data that is wanted.
                                        resolve(clientData);
                                    }
                                });
                            });
                        }
                    }
                });
            }).on('error', error => {
                if (error.code === "ENOTFOUND") {
                    reject(new Error(`There is no such host as ${error.hostname} (${error.code})`));
                }
            });
        });
    }
}

module.exports = ClientBuild;