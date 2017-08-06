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
  var houses = characterByHouse(characters);
  barChart(houses);
};

var characterByHouse = function(characters){
  var Gryffindor = 0;
  var Slytherin = 0;
  var Hufflepuff = 0;
  var Ravenclaw = 0;
  characters.forEach(function(character){
    if(character.house === "Gryffindor"){
      Gryffindor++;
    }
    if (character.house === "Slytherin"){
      Slytherin++;
    }
    if(character.house === "Hufflepuff"){
      Hufflepuff++;
    }
    if(character.house === "Ravenclaw"){
      Ravenclaw++;
    }
  });
  var houses = [];
  houses.push(Gryffindor);
  houses.push(Slytherin);
  houses.push(Hufflepuff);
  houses.push(Ravenclaw);
  return houses;
}

var barChart = function(houses){
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
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              getCharacterDetails();
            }
          }
        }
      }
    },
    series: [{
      name: 'Houses',
      fillOpacity: 0,
      data: [{
       name: 'Gryffindor',
       color: {
        linearGradient: {
          x1: 0, x2: 0, y1: 0, y2: 1
        },
        stops: [
        [0, 'gold'],
        [1, '#7a030d']
        ]
       },
       y: houses[0]
     }, 
     {
       name: 'Slytherin',
       color: {
        linearGradient: {
          x1: 0, x2: 0, y1: 0, y2: 1
        },
        stops: [
        [0, '#c1c6c0'],
        [1, '#086603']
        ]
       },
       y: houses[1]
     },
     {
      name: 'Hufflepuff',
      color: {
        linearGradient: {
          x1: 0, x2: 0, y1: 0, y2: 1
        },
        stops: [
        [0, 'black'],
        [1, '#E9BF00']
        ]
       },
      y: houses[2]
    },
    {
      name: 'Ravenclaw',
      color: {
        linearGradient: {
          x1: 0, x2: 0, y1: 0, y2: 1
        },
        stops: [
        [0, '#cd7f32'],
        [1, 'blue']
        ]
       },
      y: houses[3]
    }]
  }],
  xAxis:{
    categories: ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']
  },
  yAxis:{
    title: {
      text: "Number of characters"
    }
  }
})
}

var getCharacterDetails = function(characters){
 var ul = document.getElementById('character-list');
 characters.forEach(function(char){
  var header = document.createElement('h2');
  header.textContent = "Characters of " + char.house;
})
 ul.appendChild(header);
 var name = document.createElement('li');
 name.innerText = char.name;
 ul.appendChild(name);
 var ancestry = document.createElement('li');
 ancestry.innerText = char.ancestry;
 ul.appendChild(ancestry);
 var wand = document.createElement('li');
 wand.innerText = char.wand;
 ul.appendChild(wand);
}
window.addEventListener('load', app);





















