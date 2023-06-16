const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Create a variable to store the messages
let messages = [];

app.use("/login", (req, res, next) => {
  res.send(
    '<form method="POST" action="/chat" ><label>Name</label><input type="text" name="username"/><button type="submit">Login</button></form>'
  );
});

app.use("/chat", (req, res, next) => {
  // Display the chat
  let chatDisplay = "";
  const username = req.body.username;
  res.cookie("username", username);
  //save the username in session storage
  //   saveUsernameToFile(username); // Save username to a text file
  messages.forEach((entry) => {
    chatDisplay += `${entry.username}: ${entry.message}<br>`;
  });

  res.send(`
    <h1>Chat</h1>
    <div>${chatDisplay}</div>
    <form method="POST" action="/sent" >
      <label>Message</label>
      <input type="text" name="message"/>
      <input type="hidden" name="username" value="${req.body.username}"/>
      <button type="submit">Send</button>
    </form>
  `);
});

// function saveUsernameToFile(username) {
//     // Write the username to the username.txt file
//     fs.writeFile('username.txt', username, (err) => {
//       if (err) {
//         console.error('Error saving username:', err);
//       } else {
//         console.log('Username saved to username.txt');
//       }
//     });
//   }

app.use("/sent", (req, res, next) => {
  // Get the username and message from the request body
  const username = req.body.username;
  const message = req.body.message;

  

  // Save the username to the username.txt file
  // saveUsernameToFile(username);

  // Create an object to store the username and message
  const chatEntry = {
    username,
    message,
  };

  // Add the chat entry to the array
  messages.push(chatEntry);

  // Log the chat entry to the console
  console.log("CHAT", chatEntry);

  // Save the messages to a text file
  // saveMessagesToFile();

  res.redirect("/chat");
});

// Function to save the username to a text file

app.listen(3000);
