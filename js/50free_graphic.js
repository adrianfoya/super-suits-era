function generateBarChartFromJson(jsonData) {
    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);
  
    // Create a dictionary to hold sum of times and count for each year
    let timesByYear = {};
  
    // Process each swimmer's time
    parsedData.forEach(swim => {
      const year = swim.year; // Assuming the JSON has a 'year' key
      const time = swim.time; // Assuming the JSON has a 'time' key
  
      if (!timesByYear[year]) {
        timesByYear[year] = { sum: 0, count: 0 };
      }
  
      // Add the time to the sum and increment the count
      timesByYear[year].sum += time;
      timesByYear[year].count++;
    });
  
    // Calculate the average times per year
    let labels = [];
    let averages = [];
  
    for (const [year, data] of Object.entries(timesByYear)) {
      labels.push(year);
      averages.push(data.sum / data.count);
    }
  
    // Sort by year
    labels = labels.sort((a, b) => a - b);
    averages = labels.map(year => timesByYear[year].sum / timesByYear[year].count);
  
    // Get the canvas context
    const ctx = document.getElementById('myChart').getContext('2d');
  
    // Generate the bar chart
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average 50m Freestyle Time (in seconds)',
          data: averages,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  