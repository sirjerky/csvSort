# csvSort 
This is a TypeScript app and runs with nodeJS.
This is set up to dedupe a csv on three different scenarios: Phone, Email or Both.

To start, run `npm i` to install necessary packages

# Testing
This uses Mocha and assert to run the tests.
To run the tests, use `npm test`

# Operation
Drop your file into the 'resources' folder. Then, simply type `npm start` in the console, you will then be prompted for two different inputs, your filename and which type of sort you want. The code will run and drop the new csv into the dist folder.