const DBI_JS = require('../../Discord-Build-Info-JS');

const clientBuild = new DBI_JS.ClientBuild({ client: "canary" });

// General ways of parsing the data
clientBuild.getClientBuildInfo(`canary`).then(data => {
    // Mostly refined data
    console.log(data);

    // Convert to an array
    let result = [];
    for (let i in data) {
        if (data.hasOwnProperty(i))
            result.push([i, data[i]]);
    }
    console.log(result);

    // See object and value with conversion to array
    let resArray = [];
    for (let key in data) {
        if (data.hasOwnProperty(key))
            resArray.push([key, data[key]])
    }

    for (let i = 0; i < resArray.length; i++) {
        for (let j = 0; j < resArray[i].length - 1; j++) {
            console.log(resArray[i][j] + ":", resArray[i][resArray[i].length - 1]);
        }
    }

    // Full objects
    for (let [k, v] of Object.entries(data)) {
        console.log(k + ":", v);
    }
});