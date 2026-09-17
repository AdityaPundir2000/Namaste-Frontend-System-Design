const express = require("express");
const app = express();
app.use((req, res, next) => {
 res.setHeader('Permissions-Policy', 'geolocation=()');
 next();
})
app.get("/page", (req, res) => {
  res.send(`
 <!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initia
l-scale=1.0">
 <title>Fetch geolocation permission Example</title>
</head>
<body>
 <h1>Fetch geolocation permission Example</h1>
 <button onclick="getGeolocation()">Fetch Data</button>
 <div id="result"></div>
<script>
 function getGeolocation() {
 // Check if the Geolocation API is supported by the
browser
 if (navigator.geolocation) {
 // Geolocation is supported
 navigator.geolocation.getCurrentPosition(
 function (position) {
 // Success callback - position object contain
s the user's location
 const latitude = position.coords.latitude;
 const longitude = position.coords.longitude;
 console.log('Latitude:', latitude);
 console.log('Longitude:', longitude);
 },
 function (error) {
 // Error callback - handle errors
 switch (error.code) {
 case error.PERMISSION_DENIED:
 console.error('User denied the request fo
r Geolocation.');
 break;
 case error.POSITION_UNAVAILABLE:
 console.error('Location information is un
available.');
 break;
 case error.TIMEOUT:
 console.error('The request to get user lo
cation timed out.');
 break;
 case error.UNKNOWN_ERROR:
 console.error('An unknown error occurre
d.');
 break;
 }
 }
 );
 } else {
 // Geolocation is not supported by the browser
 console.error('Geolocation is not supported by th
is browser.');
 }

 }
 </script>
</body>
</html>
 `);
});
const port = process.env.PORT || 5010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
