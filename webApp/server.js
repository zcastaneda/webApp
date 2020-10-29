const express = require('express');
const app = express();
const http = require('http');
const https = require('https')
const path = require('path');
const port = 8080;


// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(stylus.middleware(
//   { src: __dirname + '/public'
//   , compile: compile
//   }
// ));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render(index, {});
});

app.get('/html/output.html', (req, res) => {

  res.render('html/output.html', {});

  console.log('client side app running');
});
app.get('/getAction', function(req, res) {

  console.log('posted')
  
  // data = api('https://ppm0m1nwe9.execute-api.us-east-1.amazonaws.com/prod/allcontacts');
  https.get('https://ppm0m1nwe9.execute-api.us-east-1.amazonaws.com/prod/allcontacts', (resp) => {
    let data = '';
    console.log('getting data')
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(typeof(data));
      var html_string='<h1>Contacts Database</h1><body>';
      html_string += data;
      html_string += "</body>";
      res.send(html_string);
      
    });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });


  // res.render(data);
  // res.sendStatus(200);

})

// var api = function(apiUrl, callback){
//   https.get(apiUrl, (resp) => {
//   let data = '';
//   console.log('getting data')
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     // console.log(data);
//     // console.log(JSON.parse(data).explanation);
//     // data = JSON.parse(data);
//     // console.log(typeof(data));
//     // console.log(data);
    
//   });
//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });

// };

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});