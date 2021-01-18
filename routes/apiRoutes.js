// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources
const fs = require("fs");
const express = require("express");
const path = require("path")
const router = express.Router()
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//ROUTING

// API GET Request

module.exports = function (app) {

  app.get("api/notes", function (req, res) {
    // fs.readfile(path.join(__dirname, "/db/db.json"));
    //    if(err) {
    //      throw err
    //    }

    //    else {
    //      const parseData =JSON.parse(data)
    res.send(db);
  });


  //API POST Request
  //Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    let newNote = {
      id : uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
    db.push(newNOte);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'))
    JSON.stringify(db), err => {if (err) throw err}}); 

    

//API DELETE Request
//API should recieve a query parameter containing the id of note to delete. 
app.delete("/api/notes/:id", function (req, res) {
  const notesId = req.params.id;
  app.db('notes').remove({
    id: id
  });

  return res.status(201).end();

});
};