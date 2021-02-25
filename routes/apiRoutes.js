// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources
const fs = require("fs");
// const express = require("express");
const path = require("path");

// const db = require("../db/db.json");
// const uuidv4 = require('uuid');
// const { response } = require("express");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


//ROUTING
//GET
module.exports = function (app) {

  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json",  function (err, data) {
      if (err) throw err;
      var newNoteId = 1;
      const dataId = JSON.parse(data);
      dataId.forEach((element) => {
        element.id = newNoteId++;
      });

      fs.writeFile("db/db.json", JSON.stringify(dataId), function (err, data) {
        if (err) throw err;
      });
      res.json(dataId);
    })
  });


  
  //POST

  app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json', function (err, data) {
      if(err) throw err;
      const newNote =JSON.parse(data);
      newNote.push(req.body);
      fs.writeFile('../db.json', JSON.stringify(newNote), function (err, data) {
        if(err) throw err;
      });

      res.json(newNote);
    }));
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
