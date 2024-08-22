const unitOptions = {
    length: ['meters', 'kilometers', 'miles', 'yards'],
    mass: ['grams', 'kilograms', 'pounds', 'ounces'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    time: ['seconds', 'minutes', 'hours', 'days']
  };
  
  const conversionRates = {
    length: {
      meters: { meters: 1, kilometers: 0.001, miles: 0.000621371, yards: 1.09361 },
      kilometers: { meters: 1000, kilometers: 1, miles: 0.621371, yards: 1093.61 },
      miles: { meters: 1609.34, kilometers: 1.60934, miles: 1, yards: 1760 },
      yards: { meters: 0.9144, kilometers: 0.0009144, miles: 0.000568182, yards: 1 }
    },
    mass: {
      grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274 },
      kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274 },
      pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16 },
      ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1 }
    },
    temperature: {
      celsius: {
        celsius: (value) => value,
        fahrenheit: (value) => (value * 9/5) + 32,
        kelvin: (value) => value + 273.15
      },
      fahrenheit: {
        celsius: (value) => (value - 32) * 5/9,
        fahrenheit: (value) => value,
        kelvin: (value) => (value - 32) * 5/9 + 273.15
      },
      kelvin: {
        celsius: (value) => value - 273.15,
        fahrenheit: (value) => (value - 273.15) * 9/5 + 32,
        kelvin: (value) => value
      }
    },
    time: {
      seconds: { seconds: 1, minutes: 1/60, hours: 1/3600, days: 1/86400 },
      minutes: { seconds: 60, minutes: 1, hours: 1/60, days: 1/1440 },
      hours: { seconds: 3600, minutes: 60, hours: 1, days: 1/24 },
      days: { seconds: 86400, minutes: 1440, hours: 24, days: 1 }
    }
  };
  
  function populateUnits() {
    const category = document.getElementById('category').value;
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
  
    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';
  
    unitOptions[category].forEach(unit => {
      const option1 = document.createElement('option');
      option1.value = unit;
      option1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
      inputUnit.appendChild(option1);
  
      const option2 = document.createElement('option');
      option2.value = unit;
      option2.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
      outputUnit.appendChild(option2);
    });
  }

  document.getElementById('inputValue').addEventListener('input', function(event) {
    const invalidChars = ['e', 'E', '+', '-', '*', '/'];
  
    this.value = this.value.replace(/[eE+\-*/]/g, '');
  
    if (invalidChars.includes(event.data)) {
      alert('Invalid character detected!');
    }
  });
  
  
  document.getElementById('category').addEventListener('change', populateUnits);
  
  document.getElementById('convertButton').addEventListener('click', function() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const category = document.getElementById('category').value;
  
    let result;

    if (category === 'temperature') {
      result = conversionRates[category][inputUnit][outputUnit](inputValue);
    } else {
      result = inputValue * conversionRates[category][inputUnit][outputUnit];
    }

    if (category === 'temperature' || category === 'time') {
      document.getElementById('outputValue').value = result;
    } else {
      document.getElementById('outputValue').value = result.toFixed(0);
      document.getElementById('outputValueDetailed').textContent = `Detailed: ${result.toFixed(5)}`;
    }
  });
  
  populateUnits();
  