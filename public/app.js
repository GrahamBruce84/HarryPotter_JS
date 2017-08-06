var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters";
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var characters = JSON.parse(jsonString);
 barChart(characters);
};

var characterByHouse = function(characters){
  var Gryffindor = 0;
  var Slytherin = 0;
  var HufflePuff = 0;
  var Ravenclaw = 0;
  characters.forEach(function(character){
    if(character.house === "Gryffindor"){
      return Gryffindor++;
    }
    if (character.house === "Slytherin"){
      return Slytherin++;
    }
    if(character.house === "Hufflepuff"){
      return HufflePuff++;
    }
    if(character.house === "Ravenclaw"){
      return Ravenclaw++;
    }
  })
}

var barChart = function(){
  var container = document.getElementById('bar-chart');
  var chart = new Highcharts.Chart({
    chart:{
      type: 'column',
      renderTo: container
    },
    title: {
      text: "Harry Potter characters"
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      }
    },
    series: [{
      fillOpacity: 0,
     data: [{
       name: 'Gryffindor',
       color: 'red',
       y: characterByHouse.Gryffindor
     }, 
     {
       name: 'Slytherin',
       color: 'green',
       y: characterByHouse.Slytherin
     },
     {
      name: 'Hufflepuff',
      color: 'yellow',
      y: characterByHouse.HufflePuff
     },
     {
      name: 'Ravenclaw',
      color: 'blue',
      y: characterByHouse.Ravenclaw
     }]
   }],
   xAxis:{
    categories: ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw']
  },
  Yaxis:{
    title: {
      text: "Number of characters"
    }
  }
})
}

window.addEventListener('load', app);





















