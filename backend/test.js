const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('⭐⭐ WOW IT WORKS ⭐⭐');
});

app.listen(5000, () => {
  console.log('Test server is running on port 5000!');
});