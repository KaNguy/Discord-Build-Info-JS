// Call the class
const { ClientBuild } = require('../../Discord-Build-Info-JS');
// Initialize it
const clientBuild = new ClientBuild();

// Without parameters, the return data will be stable since the domain doesn't need anything appended in front of it
clientBuild.getClientBuildInfo().then(r => console.log(r));
