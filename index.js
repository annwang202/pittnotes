const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

// Initialize and add the map
function initMap() {
  // The location of Pittsburgh
  const pittsburgh = { lat: 40.4406, lng: -79.9959 };
  // The map, centered at Pittsburgh
  var map = new google.maps.Map(document.getElementById("map"), {
    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    zoom: 200,
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
    
// This event listener calls addMarker() when the map is clicked and prompts user to add note.
  google.maps.event.addListener(map, 'click', function(event) {
    var note= prompt("Please add your note!");
    addMarker(event.latLng, map, note);
    var card = new map.card();
            card.getBody().innerHTML = note;
            var naparsovane = JSON.parse(localStorage.getItem('map'));
            if(a == []){
                var index = 0;
            }
            else{
                var index = a.length;
            }
  });
  
  //get user location
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    title: "Note",
    optimized: false,
  });

  marker.addListener("click", () => {
    infoWindow.close();
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(marker.getMap(), marker);
  });
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
