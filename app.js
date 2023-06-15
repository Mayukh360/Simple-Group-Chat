const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Create a variable to store the messages
let messages = [];

app.use('/login', (req, res, next) => {
  res.send('<form method="POST" action="/chat" ><label>Name</label><input type="text" name="username"/><button type="submit">Login</button></form>');
});

app.use('/chat', (req, res, next) => {
  res.send('<form method="POST" action="/sent" ><label>Message</label><input type="text" name="message"/><button type="submit">Send</button></form>');
});

// Move the '/sent' route below the '/chat' route
app.use('/sent', (req, res, next) => {
  // Get the username and message from the request body
  const username = req.body.username;
  const message = req.body.message;
  
  // Create an object to store the username and message
  const chatEntry = {
    username,
    message
  };

  // Add the chat entry to the array
  messages.push(chatEntry);

  // Log the chat entry to the console
  console.log(chatEntry);

  // Save the messages to a text file
  saveMessagesToFile();

  res.redirect('/chat');
});

// Function to save messages to a text file
function saveMessagesToFile() {
  // Convert the array of chat entries to a string
  const chatEntriesString = messages.map(entry => `${entry.username}: ${entry.message}`).join('\n');

  // Write the chat entries to a text file
  fs.writeFile('messages.txt', chatEntriesString, (err) => {
    if (err) {
      console.error('Error saving messages:', err);
    } else {
      console.log('Messages saved to messages.txt');
    }
  });
}

app.listen(3000);
