
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [regularPay, setRegularPay] = useState(0);
  const [overtimePay, setOvertimePay] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [error, setError] = useState('');

  const calculatePay = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursWorked);

    if (isNaN(rate) || isNaN(hours)) {
      setError('Only numeric values are allowed.');
      setRegularPay(0);
      setOvertimePay(0);
      setTotalPay(0);
    } else {
      setError('');

      let regularPay = 0;
      let overtimePay = 0;
      let totalPay = 0;

      if (hours <= 40) {
        regularPay = hours * rate;
      } else if (hours <= 50) {
        regularPay = 40 * rate;
        overtimePay = (hours - 40) * (1.5 * rate);
      } else if (hours <= 60) {
        regularPay = 40 * rate;
        overtimePay = 10 * (1.5 * rate) + (hours - 50) * (2 * rate);
      } else {
        regularPay = 40 * rate;
        overtimePay = 10 * (1.5 * rate) + 10 * (2 * rate) + (hours - 60) * (2.5 * rate);
      }

      totalPay = regularPay + overtimePay;
      setRegularPay(regularPay);
      setOvertimePay(overtimePay);
      setTotalPay(totalPay);
    }
  };

  const handleCalculate = () => {
    setError('');
    calculatePay();
  };

  const handleClear = () => {
    setHourlyRate('');
    setHoursWorked('');
    setRegularPay(0);
    setOvertimePay(0);
    setTotalPay(0);
    setError('');
  };

  return (
    <div className="App">
      <h1>Wage Calculator</h1>
      <div className="input-container">
        <div className='coolinput'>
        <label for="input" class="text">
          Hourly Rate:
          </label>
          <input type="number" placeholder="Only Numbers" name="input" class="input" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
        
        </div>
        <div className='coolinput'>
        <label for="input" class="text">
          Hours Worked:
          </label>
          <input type="number" placeholder="Only Numbers" name="input" class="input" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} />
        
        </div>
        <button className='button' onClick={handleCalculate}>Calculate</button>
        <button className='button' onClick={handleClear}>Clear</button>
      </div>

      {error && <p className="error">{error}</p>}
      <div className="result-container">
      <div className="result-card">
  <p>Regular Pay: ${regularPay.toFixed(2)}</p>
</div>
<div className="result-card">
  <p>Overtime Pay: ${overtimePay.toFixed(2)}</p>
</div>
<div className="result-card">
  <p>Total Pay: ${totalPay.toFixed(2)}</p>
</div>

      </div>
    </div>
  );
};

export default App;
