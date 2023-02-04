const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

var numMarkers;
var markers = [];

window.addEventListener("load", function (evt) {
  //get number of markers
  if (localStorage.getItem("labelIndex") == null) {
    localStorage.setItem("labelIndex", JSON.stringify({number: Number(0)}));
  } else {
    numMarkers = Number(JSON.parse(localStorage.getItem("labelIndex")));
  }

  //get markers
  if (!JSON.parse(localStorage.getItem("markers"))) {
    markers = [];
    localStorage.setItem("markers", JSON.stringify(markers));
  } else {
    markers = JSON.parse(localStorage.getItem("markers"));
  }


});

window.addEventListener('beforeunload', function (evt) {
  localStorage.setItem("labelIndex", numMarkers);
  localStorage.setItem("markers", JSON.stringify(markers));
});


// Initialize and add the map
function initMap() {
  document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);
  // The location of Pittsburgh
  const pittsburgh = { lat: 40.4406, lng: -79.9959 };
  // The map, centered at Pittsburgh
  const map = new google.maps.Map(document.getElementById("map"), {
    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    zoom: 4,
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
    console.log("double click detected");
    var category = prompt("Please enter the category of your event (entertainment/education/food/other):");
    var eventName = prompt("Please add the name of your event:");
    var timeAndPlace = prompt("Please add the time and location of your event:")
    var eventNote = prompt("Add a description of your event:")
    var labelContent = "Category: " + category + "\nTitle: " + eventName + "\nTime and Place: " + timeAndPlace + "\nDescription: " + eventNote;
    addMarker(event.latLng, category, map, labelContent);
    //addToTable(labelContent);
  });

  // Adds a marker to the map.
function addMarker(location, category, map, note) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  const marker = new google.maps.Marker({
    position: location,
    label: category,
    map: map,
    title: note,
    optimized: false,
  });
  
  markers.push(marker);
  numMarkers++;
  
  function setMap(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
  function deleteMarkers() {
  setMap(null);
  markers = [];
}

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

function addToTable(content) {
  var table = document.getElementById("myTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = content;
}
  

}

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
