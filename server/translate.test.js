import { expect } from 'chai';
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/translate', (req, res) => {
  const { text, selectedLang1, selectedLang2 } = req.body;
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${selectedLang1}|${selectedLang2}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.responseData && data.responseData.translatedText) {
        res.json({ translatedText: data.responseData.translatedText });
      } else {
        res.status(500).json({ error: 'Translation not found' });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Mock fetch for testing
const mockFetch = (url, options) => {
  const translatedText = 'Translated text';
  return Promise.resolve({
    json: () => Promise.resolve({ responseData: { translatedText } })
  });
};
global.fetch = mockFetch;

describe('Translation API', () => {
  it('should translate text from one language to another', (done) => {
    const requestBody = {
      text: 'Hello',
      selectedLang1: 'en',
      selectedLang2: 'fr'
    };

    const expectedResponse = {
      translatedText: 'Translated text'
    };

    app.post('/translate', (req, res) => {
      expect(req.body).to.deep.equal(requestBody);
      res.json(expectedResponse);
    });

    fetch('http://localhost:3000/translate', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      expect(data).to.deep.equal(expectedResponse);
      done();
    })
    .catch(err => done(err));
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
