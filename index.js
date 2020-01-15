const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join('__dirname', '..', '/public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Send index.html for any other requests
app.listen(PORT, () => {
  console.log(`App is listening at localhost:${3000}`);
});
