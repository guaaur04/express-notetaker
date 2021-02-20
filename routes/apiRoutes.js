// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources
const fs = require("fs");
// const express = require("express");
const path = require("path")
// const router = express.Router()
// const db = require("../db/db.json");
// const uuidv4 = require('uuid');
// const { response } = require("express");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


//ROUTING
// API GET Request
module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(_dirname, "/db/db.json", "utf8", function (err, data) {
      if (err) {
        console.log("No notes here 💜")
        throw err
      } else {
        res.json(JSON.parse(data))
      }
    }));
  });

  //API POST Request
  //Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client

  app.post("/api/notes", function (req, res) {

    let notes = [];

    fs.readFile(path.join(_dirname, "/db/db.json"), "utf8", function (err, data) {

      if (err) {
        console.log("Woops, there's something wrong here...")
        throw err
      } else {

        notes = JSON.parse(data)
      }

      //Give me my notes, computer
      res.json(notes)


      //Each note is to be different
      let noteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0;
      notes.push({ id: noteId, title: req.body.title, text: req.body.text });

      fs.readFile(path.join(_dirname, "/db/db.json"), JSON.stringify(notes), function (err, data) {

        if (err) {
          console.log("Woops, there's something wrong here...")
          throw err
        } else {

          res.json(data);
        }
      })
    });
  });

  //API DELETE Request
  //API should recieve a query parameter containing the id of note to delete. 
  app.delete("/api/notes/:id", function (req, res) {
    let notes = [];

    fs.readFile(path.join(__dirname, '/db/db.json', 'utf8', function (err, data) {
      if (err) {
        throw err
      } else {
        notes = JSON.parse(data);

        for (var i in notes) {
          if (notes[i].id === parseInt(req.params.id)) {
            notes.splice(i, 1);
          }
        }

        fs.writeFile(path.join(__dirname, '/db/db.json', JSON.stringify(notes), function (err, data) {
          if (err) {
            throw err
          } else {
            res.send(data)
          }
        }))
    }
    }))
  });

};
