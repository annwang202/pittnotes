// Initialize and add the map
function initMap() {
  // The location of Pittsburgh
  const pittsburgh = { lat: 40.4406, lng: 79.9959 };
  // The map, centered at Pittsburgh
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: pittsburgh,
  });
  // The marker, positioned at Pittsburgh
  const marker = new google.maps.Marker({
    position: pittsburgh,
    map: map,
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
