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
