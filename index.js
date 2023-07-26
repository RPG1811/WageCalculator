
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


app.post('/calculate', (req, res) => {
  const hourlyRate = parseFloat(req.body.hourlyRate);
  const hoursWorked = parseFloat(req.body.hoursWorked);

  if (isNaN(hourlyRate) || isNaN(hoursWorked)) {
    res.status(400).json({ error: 'Only numeric values are allowed.' });
    return;
  }

  let regularPay = 0;
  let overtimePay = 0;
  let totalPay = 0;

  if (hoursWorked <= 40) {
    regularPay = hoursWorked * hourlyRate;
  } else if (hoursWorked <= 50) {
    regularPay = 40 * hourlyRate;
    overtimePay = (hoursWorked - 40) * (1.5 * hourlyRate);
  } else if (hoursWorked <= 60) {
    regularPay = 40 * hourlyRate;
    overtimePay = 10 * (1.5 * hourlyRate) + (hoursWorked - 50) * (2 * hourlyRate);
  } else {
    regularPay = 40 * hourlyRate;
    overtimePay = 10 * (1.5 * hourlyRate) + 10 * (2 * hourlyRate) + (hoursWorked - 60) * (2.5 * hourlyRate);
  }

  totalPay = regularPay + overtimePay;

  res.json({
    regularPay,
    overtimePay,
    totalPay,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
