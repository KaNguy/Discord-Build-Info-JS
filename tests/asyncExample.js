// Call the class
const { ClientBuild } = require('../../Discord-Build-Info-JS');
// Initialize it
const clientBuild = new ClientBuild();

async function displayData() {
    // Using await is fully possible in asynchronous calls
    const data = await clientBuild.getClientBuildInfo(`canary`);
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            console.log(`${i}: ${data[i]}`);
        }
    }
}

// Call the async function from here
displayData().then(() => {});