var json = (function () {
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': "./evolution50free.json",
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json;
})(); 

let maleAverages = {};
let femaleAverages = {};

for (const year in json.male) {
  const yearData = json.male[year];
  let sum = 0;
  let count = 0;
  
  for (const key in yearData) {
    sum += yearData[key].swim_time;
    count++;
  }
  
  const average = sum / count;
  maleAverages[year] = average;
}

for (const year in json.female) {
  const yearData = json.female[year];
  let sum = 0;
  let count = 0;
  
  for (const key in yearData) {
    sum += yearData[key].swim_time;
    count++;
  }
  
  const average = sum / count;
  femaleAverages[year] = average;
}
const ctx = document.getElementById("canvas");

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: "masculino",
        data: maleAverages,
        backgroundcolor: "transparent",
        borderColor: "blue",
        borderWidth: 4,
      },
      {
        label: "femenino",
        data: femaleAverages,
        backgroundcolor: "transparent",
        borderColor: "hotpink",
        borderWidth: 4,
      },
    ],
  },
  options: {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var cty = document.getElementById('canvas2').getContext('2d');
var myChart = new Chart(cty, {
    type: 'doughnut',
    data: {
        labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          data: [1,7,0,1,1,0,1,1,2,3,2,2,0,2,3,14], // Replace with your data
          backgroundColor: ['#abc4ff','#ffc09f','#ffee93', '#a0ced9', '#adf7b6','#eac4d5','#d4afb9','#9cadce','#7ec4cf','#52b2cf','#d3ab9e','#fb6f92','#adf7b6','#79addc','#ff686b','#55d6c2' ], // Distinct colors
        }]
    },
});
