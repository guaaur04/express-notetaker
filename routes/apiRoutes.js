// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources

const notes = require("../index.js");

//ROUTING

// API GET Requests

  module.exports = function(app) {

     app.get("api/notes", function(req,res) {
         res.json(notesData);
     });
  }

//API POST Requests

app.post("/api/notes", function(req,res) {
    
})