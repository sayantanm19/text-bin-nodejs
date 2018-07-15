# store-dem-text
An implementation similar to that of Pastebin and other text storage websites, in Nodejs and Express.

### Tech Stack

 - node.js - evented I/O for the backend
 - Express - fast node.js network app framework
 - MongoDB - database for storing the jokes
 - Mongoosejs - ODM for interacting with the MongoDB
 
Other developer dependencies include:

- nodemon - to auto-reload the server after changes
- Request - used for populating the database for test use

### Installation

store-dem-text requires Node.js v4+ to run.

It requires MongoDB server(service like MLab or Local deployment) to store the pastes.

You also need to populate the server with some data. For this, I will be using this script given in MDN Docs Node.js Tutorial, to acquire placeholder data from Bacom Ipsum, which provides a free to use API to generate Lorem Ipsum random texts.

Change the MongoURl and port in the config.js file before running.

```sh
$ cd name
$ node populatepastes <mongourl> <texts>
```
Install the dependencies and devDependencies and start the server.


```sh
$ cd name
$ npm install -d
$ npm run devstart
```

### Todos
- Write a welcome page and present a graphical way to display the pastes(currently returns only JSON objects)
- Add proper MVC structure
- Implement private pastes feature
- Implement last few pastes board
- Implement security features and best-practices

### License
MIT License