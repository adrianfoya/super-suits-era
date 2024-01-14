const ctx = document.getElementById("canvas");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023"],
    datasets: [
      {
        label: "masculino",
        data: [10.5, 18.7, 3, 5, 2, 3],
        backgroundcolor: "transparent",
        borderColor: "blue",
        borderWidth: 4,
      },
      {
        label: "femenino",
        data: [19, 12, 8, 1, 10, 7],
        backgroundcolor: "transparent",
        borderColor: "red",
        borderWidth: 4,
      },
    ],
  },
  options: {
    elements:{
        line:{
            tension:0
        }
    },
    scales: {
      yAxes: [{
        ticks:{ 
        beginAtZero: true
      }
    }]
  }
    }})
