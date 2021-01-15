//DEPENDENCIES 

var path = require("path");

//ROUTING

module.exports =  function(app) {

//HTML GET requests
//GET /notes returns the notes.html file 

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});


//GET * returns index.html

}