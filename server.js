const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Serve static files (optional, for the front-end)
app.use(express.static('public'));

// Endpoint to handle date
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  let date;
  if (!dateInput) {
    // If no date is provided, use the current date
    date = new Date();
  } else {
    // Check if the input is a number (Unix timestamp)
    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      date = new Date(dateInput);
    }
  }

  // Validate the date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
