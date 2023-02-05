 const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

var numMarkers = 0;
var markers = [];

window.addEventListener("load", function (evt) {
  //get number of markers
  if (localStorage.getItem("numMarkers") == null) {
    localStorage.setItem("numMarkers", 0);
  } else {
    numMarkers = Number(JSON.parse(localStorage.getItem("numMarkers")));
  }

  //get markers
  if (localStorage.getItem("markers") == null) {
    console.log("markers is empty");
    //markers = [];
    //localStorage.setItem("markers", JSON.stringify(markers));
    var newMarker = new google.maps.Marker({
    position: { lat: 40.4406, lng: -79.9959 },
    map: map,
  });
    
    console.log(newMarker);
    
    var stringified = JSON.stringify(newMarker);
    
    console.log(stringified);
    
    localStorage.setItem("markers", stringified);
  } else {
    console.log("markers is not empty");
    console.log(localStorage.getItem("markers"));
    localStorage.setItem("markers", JSON.stringify(new google.maps.Marker({
    position: pittsburgh,
    map: map,
  })))
    //markers = JSON.parse(localStorage.getItem("markers"));
 
  }
  
  console.log("numMarkers: " + numMarkers);
  console.log("markers.length: " + markers.length);
  console.log(markers);
  console.log(JSON.stringify([1,2,3]));


});

window.addEventListener('beforeunload', function (evt) {
  localStorage.setItem("numMarkers", numMarkers);
  //localStorage.setItem("markers", JSON.stringify(new google.maps.Marker({
    //position: pittsburgh,
    //map: map,
  //})));
});


// Initialize and add the map
function initMap() {
  // The location of Pittsburgh
  const pittsburgh = { lat: 40.4406, lng: -79.9959 };
  // The map, centered at Pittsburgh
  const map = new google.maps.Map(document.getElementById("map"), {
    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    zoom: 100,
    center: pittsburgh,
    disableDoubleClickZoom: true,
  });
  
  //info box at top
  var infoBoxDiv = document.createElement('div');
  var infoBox = new makeInfoBox(infoBoxDiv, map);
    infoBoxDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
  
  // The marker, positioned at Pittsburgh
  const marker = new google.maps.Marker({
    position: pittsburgh,
    map: map,
  });
  
  if (markers.length > 0){
    console.log(markers.length);
    markers.forEach(mark => addMarker(mark.position,mark.label,map,mark.title));
  }
    
// This event listener calls addMarker() when the map is clicked and prompts user to add note.
  google.maps.event.addListener(map, 'dblclick', function(event) {
    console.log("dblclick detected");
    var category = prompt("Please enter the corresponding category number (1: Entertainment  2: Educational  3: Food  4: Other):");
    var eventName = prompt("Please enter the name of your event:");
    var time = prompt("Please enter the date and time of your event:")
    var place = prompt("Please enter the location of your event: ")
    var eventNote = prompt("Enter a description of your event:")
    if (category == "1")
     category = "Entertainment";
    if (category == "2")
     category = "Educational";
    if (category == "3")
     category = "Food";
    if (category == "4")
     category = "Other";
    var labelContent = "Category: " + category + "\nTitle: " + eventName + "\nDate: " + time + "\nPlace: " + place + "\nDescription: " + eventNote;
    var newMarker = addMarker(event.latLng, category, map, labelContent);
    numMarkers++;
    console.log(numMarkers);
    console.log(markers);
    var tableInf = {Category: category, Event: eventName, Date: time, Where: place, About: eventNote};
    tableobjects.push(tableInf);
    addToSection(category,labelContent);
    //addToTable(labelContent);
  });
  
  //add marker
function addMarker(location, category, map, note) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: category,
    map: map,
    title: note,
    optimized: false,
  });
  
  //delete marker on click:
  google.maps.event.addListener(marker, 'click', function() {
  marker.setMap(null);
  numMarkers--;
});
  markers.push(marker);
  console.log("markers.length: " + markers.length);
  console.log("numMarkers: " + ++numMarkers);
   
  return marker;
  
//   function setMapOnAll(map) {
//   for (let i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }

// // Deletes all markers in the array by removing references to them.
// function deleteMarkers() {
//   setMapOnAll(null);
//   markers = [];
// }
  
//    document
//     .getElementById("delete-markers")
//     .addEventListener("click", deleteMarkers());
  

/*
   marker.addListener('click', function() {
       infowindow.open(marker.get('map'), marker);
   });
  }

  marker.addListener("click", () => {
    infoWindow.close();
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(marker.getMap(), marker);
  });
*/
}

function addToSection(section,content) {
  var table = document.getElementById(section);
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = content;
}
  
//add to table
  // if section==food, then set id to food
  //use id to replace mytable

 function addToTable(section, id){
   if(section== "Entertainment"){
     id = "fun";
   }
   if(section=="Educational"){
     id= "stud";
   }
   if (section=="Food"){
     id= "dinner";
   }
   if(section=="Other"){
     id= "extra";
   }
   addToSection(id, marker.data);
 }

//}

window.initMap = initMap;


function makeInfoBox(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '2px';
  controlUI.style.marginBottom = '22px';
  controlUI.style.marginTop = '10px';
  controlUI.style.textAlign = 'center';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '100%';
  controlText.style.padding = '6px';
  controlText.innerText = 'The map shows all clicks made in the last 10 minutes.';
  controlUI.appendChild(controlText);
}
{



function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(tableobjects[0]);
generateTableHead(table, data);
generateTable(table, tableobjects);


}
