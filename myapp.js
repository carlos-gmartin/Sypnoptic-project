/* 
Name: myapp.js
Author: Daniel Wright

Description: 
	Back end code used to run the website to port 3000.
	This also includes server validation to make sure the data inputted into the server is valid.

	All running via express and Node.js modules.

	Once the user has sent the data it will be validated and stored into the output.txt file.

Version: Final.
*/

const express = require('express');
const app = express();
const fs = require('fs');
const { body, validationResult } = require('express-validator');

app.use(express.static('public'));

app.use(express.urlencoded({
	extended: true
}));

async function appendToFile(string) {
    string = '\n' + string;
    await fs.appendFile('output.txt', string, function(err) {
        if (err) {
            console.log("Error appending to file!");
			return false;
        } else {
			return true;
		}
    });
	return true;
}

async function readFromFile() {
	result = await fs.readFileSync('testfile.txt');
	result = result.toString();
	lines = result.split(/\r?\n/);
	await lines.forEach((line) => {
		console.log(line);
		lastLine = line;
	});
	console.log('Second result');
	console.log(result);
	return lastLine;
}

async function appendAndRead() {
	await appendToFile("New Line7");
	setTimeout(() => console.log('Final Result = ' + readFromFile(), 5000));
}

app.get('/test', function(req, res) {
    console.log('GET REQUEST');
    let sendAndRecieve = new Promise(function(resolve, reject) {
		var appendResult = appendToFile("Test Line 4")
        resolve(appendResult);
    });
    sendAndRecieve.then(function(value) {
		console.log(value);
		if (value == true) {
			setTimeout(() => console.log('Final Result = ' + readFromFile()), 5000)
		} else {
			console.log('Error Appending File!');
		}
	});
});

app.get('/', function(req, res) {
	res.redirect('/home.html');
});

app.post('/signup-form', [
	body('moving', 'Not an int').isInt().escape(),
	body('question2', 'Not an int').isInt().escape(),
	body('question4', 'Not an int').isInt().escape(),
	body('question5', 'Not an int').isInt().escape(),
	body('comment', 'Not a String').isLength({ min: 0, max: 500}).escape()
	], function(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			res.redirect('back');
		} else {
			console.log(JSON.stringify(req.body));
			appendToFile(JSON.stringify(req.body));
			res.redirect('back');
		}
		
});

app.listen(3000, function() {
	console.log('Express app listening on port ', 3000);
});