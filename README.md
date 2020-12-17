<div align="center">
  <p>
    <img src="https://github.com/KaNguy/Discord-Build-Info-JS/workflows/discord-build-info-js/badge.svg" alt="Build Status" /></a>
    <a href="LICENSE.md"><img src="https://img.shields.io/github/license/KaNguy/discord-build-info-js?color=007ace" alt="License" /></a>
  </p>
</div>

# Discord Build Info JS

`Discord Build Info JS` is a concise and efficient module which asynchronously retrieves the build number, hash, and ID of the talk & text app, Discord. The three clients which are Stable, Canary, and PTB have the retrievable information.  

Contributing [here](https://github.com/KaNguy/Discord-Build-Info-JS/blob/master/README.md#contributing).



## Reasons for Usage
- Gets the build number, hash, and ID with ease
- Flexible 
- Versatile
- Only uses built-in Node modules
- Object-Oriented and easy-to-call
- Written in JavaScript

## Installation
`npm i discord-build-info-js`

# Documentation
## Overview
This is the full documentation for `Discord Build Info JS`. Please do read the documentation as it will be extremely useful. Thank you!

## Using the module
To use the module in general, the module needs to be required and `ClientBuild()` is the main focus of using it.  

#### Prolonged method
```js
const DBIJS = require('discord-build-info-js'); 
const clientBuild = new DBIJS.ClientBuild();
```  
#### Simple method
```js
const { ClientBuild } = require('discord-build-info-js');
const clientBuild = new ClientBuild();
```  
## Acquiring the Data
Now that the class has been called, its method(s) can be used to acquire the build number, hash, and ID. To do this, call the class and method with the necessary release channel (this can be stable, canary, or PTB) asynchronously and use the results. Assuming that you have required the module and did the set-up from earlier. These examples will be printing out all of the data that the method considers "raw".  

**Note:** These examples are using the [Simple Method](https://github.com/KaNguy/Discord-Build-Info-JS/blob/master/README.md#simple-method)


#### Argumentative Approach
```js
// Calls the ClientBuild() class
const clientBuild = new ClientBuild();
// Uses the class' method(s) to retrieve the data
clientBuild.getClientBuildInfo(`canary`).then(data => {
    console.log(data);
});
```  
 
#### Optional Approach
```js
// Calls the ClientBuild() class but passes options into it 
// This defines the release channel for one class call
const clientBuild = new ClientBuild({ 
    client: "canary"
});
// Uses the class' method(s) to retrieve the data without the need for arguments
clientBuild.getClientBuildInfo().then(data => {
    console.log(data);
});
```

## Resulting Data
The resulting data can vary and often changes as the Discord app frequently gets updated and so will the build information. However, since the data has been retrieved, it can be used in a flexible fashion. This data returned by `getClientBuildInfo()` is returned as a JSON object.

**Note:** This is not real data and is only an example of what it will look like upon being resolved by the method.
#### Example of Resulting Data 
```json
{
  "releaseChannel": "canary",
  "buildNumber": 77777,
  "buildHash": "9a9b9c9d9e9f9g9h9i9j9k9l9m9n9o9p9q9r9s9t",
  "buildID": "9a9b9c9"
}
```
### Calling the JSON data
Assuming you have retrieved the data, the documentation right here has all the available ways to get each of part of the object. The variable `data` will be used assuming it contains the retrieved data.
#### Release Channel
##### Example 1
```js
const release_channel = data.releaseChannel;
```
##### Example 2
```js
const release_channel = data['releaseChannel'];
```  
--- 
#### Build Number
##### Example 1
```js
const build_number = data.buildNumber;
```
##### Example 2
```js
const build_number = data['buildNumber'];
```  
---
#### Build Hash
##### Example 1
```js
const build_hash = data.buildHash;
```
##### Example 2
```js
const build_hash = data['buildHash'];
```  
---
#### Build ID
##### Example 1
```js
const build_ID = data.buildID;
```
##### Example 2
```js
const build_ID = data['buildID'];
```


## Miscellaneous Ways of Using the Data
Here is a concise list of ways to use the data with examples. Assuming the method has been called [previously](https://github.com/KaNguy/Discord-Build-Info-JS/blob/master/README.md#acquiring-the-data).

#### Converting the data into an object array
```js
clientBuild.getClientBuildInfo().then(data => {
    let result = [];
    for (let i in data) {
        if (data.hasOwnProperty(i))
            result.push([i, data[i]]);
    }
    // Prints out the result which should show an object array
    console.log(result);
});
```  

#### Converting the data into a nested array
```js
clientBuild.getClientBuildInfo().then(data => {
    let result = [];
    for (let key in data) {
        if (data.hasOwnProperty(key))
            result.push([key, data[key]])
    }

    // Prints out the result which should return a nested array
    console.log(result);
});
```  

#### Separating data into two parts
```js
clientBuild.getClientBuildInfo().then(data => {
    for (let [k, v] of Object.entries(data)) {
        // Can technically print it like a JSON variable
        // k is the name of the object returned
        // v is the value of the object returned 
        console.log(k + ":", v);
    }
});
```

# Contributing 
If you would like to contribute to this repository and module, please feel free to make a Pull Request and it will be reviewed. However, there are a few conditions and rules to that.
- The Pull Request needs to be a useful alteration to the code.
- Grammar and language feedback goes into issues.
- Only request typo fixes if it directly affects the code.
- Make the changes small and readable.
- Follow platform guidelines and good luck contributing!

# License 
[Apache 2.0 License](https://github.com/KaNguy/Discord-Build-Info-JS/blob/master/LICENSE.md)
