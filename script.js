//1ra grafica
//Coger los datos del json del 50libre
var json = (function () {
  var json = null;
  $.ajax({
    async: false,
    global: false,
    url: "./evolution50free.json",
    dataType: "json",
    success: function (data) {
      json = data;
    },
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

////////////////////////////////////////////////////////////////////////////////
//2da Grafica
var cty = document.getElementById("canvas2").getContext("2d");
var myChart = new Chart(cty, {
  type: "doughnut",
  data: {
    labels: [
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
        data: [1, 7, 0, 1, 1, 0, 1, 1, 2, 3, 2, 2, 0, 2, 3, 14], // Cantidad de records por anno
        backgroundColor: [
          "#abc4ff",
          "#ffc09f",
          "#ffee93",
          "#a0ced9",
          "#adf7b6",
          "#eac4d5",
          "#d4afb9",
          "#9cadce",
          "#7ec4cf",
          "#52b2cf",
          "#d3ab9e",
          "#fb6f92",
          "#adf7b6",
          "#79addc",
          "#ff686b",
          "#55d6c2",
        ], // Distinct colors
      },
    ],
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Codigo 3ra grafica

var records = (function () {
  var records = null;
  $.ajax({
    async: false,
    global: false,
    url: "./data.json",
    dataType: "json",
    success: function (data) {
      records = data;
    },
  });
  return records;
})();

let maleCounts = new Array(17).fill(0);
let femaleCounts = new Array(17).fill(0);

let index = 0;
for (const key in records.event) {
  const eventData = records.event[key];
  for (const swim in eventData.male) {
    const swimData = eventData.male[swim];
    if (swimData.swim_date === 2008 || swimData.swim_date === 2009) {
      maleCounts[index]++;
    }
  }
  for (const swim in eventData.female) {
    const swimData = eventData.female[swim];
    if (swimData.swim_date === 2008 || swimData.swim_date === 2009) {
      femaleCounts[index]++;
    }
  }
  index++;
}

const data = {
  labels: [
    "50free",
    "100free",
    "200free",
    "400free",
    "800free",
    "1500free",
    "50back",
    "100back",
    "200back",
    "50breast",
    "100breast",
    "200breast",
    "50fly",
    "100fly",
    "200fly",
    "200im",
    "400im",
  ], // Etiquetas de ejemplo para el eje X
  datasets: [
    {
      label: "masculino",
      data: maleCounts, // Datos para el dataset 1
      backgroundColor: "blue", // Color de fondo para las barras del dataset 1
      stack: "Stack 1", // Agrupa este dataset en un stack
    },
    {
      label: "femenino",
      data: femaleCounts, // Datos para el dataset 2
      backgroundColor: "hotpink", // Color de fondo para las barras del dataset 2
      stack: "Stack 2", // Agrupa este dataset en otro stack
    }
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      x: {
        stacked: true, // Habilita el apilamiento en el eje X
      },
      y: {
        stacked: true, // Habilita el apilamiento en el eje Y
      },
    },
  },
};

const myChart2 = new Chart(document.getElementById("canvas3"), config);
