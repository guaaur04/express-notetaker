// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources
const fs = require("fs");
const express = require("express");
const path = require("path")
const router = express.Router()
const db = require("../db/db.json");
const uuidv4 = require('uuid');
const { response } = require("express");
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

    let notes = [];

    fs.readFile(path.join(_dirname, ".db/db.json"), "utf8", function (err, data) { 

      if(err) {
        console.log("Woops, there's something wrong here...")
        throw err 
      } else {

      notes(JSON.parse(data))
  }

  //Give me my notes, computer
  res.json(notes)


  //Each note is to be different
  let note = notes.length > 0 ? notes[notes.length -1].id + 1 : 0;
  notes.push( {id: note, title: req.body.title, text : req.body.text });    

  fs.readFile(path.join(_dirname, ".db/db.json"), JSON.stringify(notes), function (err, data) { 

    if(err) {
      console.log("Woops, there's something wrong here...")
      throw err 
    } else {

    notes(JSON.parse(data))
}

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