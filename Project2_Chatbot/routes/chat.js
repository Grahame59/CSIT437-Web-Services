const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const Tokenizer = require('../logic/tokenizer');
const IntentRecognizer = require('../logic/intentRecognizer');
const ResponseGenerator = require('../logic/responseGenerator');

let intents = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/intent_mappings.json')));
let responses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/response_mappings.json')));

const tokenizer = new Tokenizer();
let intentRecognizer = new IntentRecognizer(intents, tokenizer);
let responseGenerator = new ResponseGenerator(responses);

router.post('/', (req, res) => 
{
    const userInput = req.body.input;
    const matchedIntent = intentRecognizer.recognize(userInput);

    const botResponse = responseGenerator.getResponse(matchedIntent);
    res.json({ intent: matchedIntent, response: botResponse });
});

router.post('/reload', (req, res) => 
{
    try 
    {
        intents = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/intent_mappings.json')));
        responses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/response_mappings.json')));

        intentRecognizer = new IntentRecognizer(intents, tokenizer);
        responseGenerator = new ResponseGenerator(responses);

        res.json({ success: true, message: 'Mappings reloaded successfully.' });
    } catch (err) 
    {
        res.status(500).json({ success: false, message: 'Failed to reload mappings.', error: err.message });
    }
});

module.exports = router;
