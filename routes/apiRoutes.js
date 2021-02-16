// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources
const fs = require("fs");
const express = require("express");
const path = require("path")
const router = express.Router()
const db = require("../db/db.json");
const uuidv4 = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//ROUTING

// API GET Request

module.exports = function (app) {

  app.get ('/', function (req, res) {
    res.sendFile(path.join(_dirname, '/public/index.html'))
  })

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  
  })

  app.get("api/notes", function (req, res) {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) throw err 
      res.json(JSON.parse(data))
    })
  })


  //API POST Request
  //Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    let newNote = {
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    };

    db.push(newNOte);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), 
    JSON.stringify(db), err => {
      if (err) throw err
    });

    res.json(newNote);

  });


  //API DELETE Request
  //API should recieve a query parameter containing the id of note to delete. 
  app.delete("/api/notes/:id", function (req, res) {
    const notesId = req.params.id;
    const notesIndex = db.findIndex(note => note.id === noteID);
    const deletedNote = db.splice(index, 1);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db), err => {
      if (err) throw err

    });

    // app.db('notes').remove({
    //   id: id
    // });

    // return res.status(201).end();

    res.json(deletedNote);

  });

};