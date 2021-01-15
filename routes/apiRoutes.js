// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of data sources

const notes = require("../index.js");

//ROUTING

// API GET Request

  module.exports = function(app) {

     app.get("api/notes", function(req,res) {
         res.json(notesData);
     });
  }

//API POST Request

app.post("/api/notes", function(req,res) {

});

//API DELETE Request
app.delete("/api/notes/:id", function(req,res) {
    res.send("")

});