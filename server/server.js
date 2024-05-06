import('node-fetch').then(fetch => {
    const express = require('express');
    const bodyParser = require('body-parser');
  
    const app = express();
    const port = 3000;
  
    app.use(bodyParser.json());
  
    app.post('/translate', (req, res) => {
      const { text, selectedLang1, selectedLang2 } = req.body;
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${selectedLang1}|${selectedLang2}`;
  
      fetch.default(apiUrl) // Используйте fetch.default для доступа к функции fetch
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
  
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  }).catch(err => {
    console.error('Ошибка при загрузке node-fetch:', err);
  });
  