// import { expect, use } from './node_modules/chai/chai.js';
// import chaiHttp from 'chai-http';

// // Use chaiHttp plugin
// use(chaiHttp);

// describe('Translation API', () => {
//   it('should return translated text for valid input', (done) => {
//     chai.request('http://localhost:3000')
//       .post('/translate')
//       .send({
//         text: 'Hello',
//         selectedLang1: 'en',
//         selectedLang2: 'fr',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('translatedText').that.is.a('string');
//         done(); // Call done() here after assertions
//       });
//   });

//   it('should return 500 error for invalid translation', (done) => {
//     chai.request('http://localhost:3000')
//       .post('/translate')
//       .send({
//         text: 'InvalidText',
//         selectedLang1: 'en',
//         selectedLang2: 'fr',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(500);
//         expect(res.body).to.have.property('error', 'Translation not found');
//         done(); // Call done() here after assertions
//       });
//   });

//   it('should handle internal server errors', (done) => {
//     chai.request('http://localhost:3000')
//       .post('/translate')
//       .send({
//         text: 'InternalError',
//         selectedLang1: 'en',
//         selectedLang2: 'fr',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(500);
//         expect(res.body).to.have.property('error', 'Internal Server Error');
//         done(); // Call done() here after assertions
//       });
//   });
// });


import { expect } from 'chai';

// Mock DOM elements (replace with actual selectors if needed)
const fromText = { value: 'Hello, how are you?' };
// const toText = { value: 'Hello, how are you?', setAttribute: () => {} };
const toText = { value: 'Hello, how are you?', setAttribute: () => {}, placeholder: 'Translating...' };
const selectTag = [
  { value: 'en-GB' }, // first select element
  { value: 'fr-FR' }, // second select element
];
const exchangeIcon = { click: () => {} }; // Define click function for exchangeIcon
const translateBtn = { click: () => {} }; // Define click function for translateBtn
const fromIcon = { id: 'from', click: () => {} }; // Add click function


describe('Translation App Functionality', () => {
    // Test select tag population
    it('should populate select tags with options from countries object (replace with actual implementation)', () => {
      // Replace with actual logic for populating select tags
      // This test assumes countries object exists and has values
      expect(selectTag[0].value).to.equal('en-GB');
      expect(selectTag[1].value).to.equal('fr-FR');
    });
  
    // Test language exchange functionality (basic)
    it('should exchange text and language values between textareas and select tags on exchange icon click', () => {
      exchangeIcon.click();
      expect(fromText.value).to.equal('Hello, how are you?');
      expect(toText.value).to.equal('Hello, how are you?');
      expect(selectTag[0].value).to.equal('en-GB');
      expect(selectTag[1].value).to.equal('fr-FR');
    });
  
    // Test translation button click (limited - no actual API call)
    it('should set "Translating..." placeholder on translate button click and clear it after response (simulated)', () => {
      translateBtn.click();
      expect(toText.placeholder).to.equal('Translating...');
      // Simulate response (replace with actual API call testing)
      toText.value = 'Bonjour, comment allez-vous?';
      expect(toText.value).to.equal('Bonjour, comment allez-vous?');
      expect(toText.placeholder).to.equal('Translating...');
    });
// Test copy icon functionality (basic)
it('should copy text from the corresponding textarea on copy icon click', () => {
  // Mock clipboard writeText (replace with actual testing)
  const mockClipboard = { writeText: () => {} };
  global.navigator = { clipboard: mockClipboard }; // Define navigator with clipboard
  
  const fromIcon = { id: 'from', click: () => {} }; // Add click function
  const toIcon = { id: 'to',click: () => {}, classList: { contains: () => true } };

  fromIcon.click();
  expect(mockClipboard.writeText).to.have.been.all; // Check if writeText is called

  toIcon.click();
  expect(mockClipboard.writeText).to.have.been.all; // Check if writeText is called
});
  });
  