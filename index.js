let express = require("express");
let app = express();
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (req, res) => {
    let date = req.params.date;
    if(!date){
      let ok = new Date();
       return res.json({unix: ok.getTime(), utc: ok.toUTCString()});
    } 
    
    let ok = new Date(date)
    if(ok instanceof Date && ok.toString() !== "Invalid Date"){
      return res.json({unix: ok.getTime(), utc: ok.toUTCString()});
    }
    ok = new Date(Number(date))
    if(ok instanceof Date && ok.toString() !== "Invalid Date"){
      return res.json({unix: ok.getTime(), utc: ok.toUTCString()});
    }
    
    return res.json({ error: "Invalid Date"})
})


let listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});