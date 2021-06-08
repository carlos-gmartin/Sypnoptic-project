const express = require('express');
const app = express();
const pug = require('pug');
const fs = require('fs');
const { body, validationResult } = require('express-validator');

app.use(express.static('public'));

app.use(express.urlencoded({
	extended: true
}));

async function appendToFile(string) {
    string = '\n' + string;
    await fs.appendFile('testfile.txt', string, function(err) {
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

app.get('/', function(req, res) {
    console.log('GET REQUEST');
    let sendAndRecieve = new Promise(function(resolve, reject) {
		var appendResult = appendToFile("Test Line 4")
        resolve(appendResult);
        /*console.log('Appending to File!');
        var appendResult = appendToFile("Test Line 1");
        console.log(appendResult);
        if (appendResult == true) {
            resolve("Append OK");
        } else {
            reject("Append Error");
        }
        */
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