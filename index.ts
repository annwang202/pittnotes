// Initialize and add the map
function initMap(): void {
  // The location of pittsburgh
  //40.440644181300755, -80.00708798118193
  const pitt = { lat: 40.44, lng: -80.007};
  // The map, centered at pittsburgh
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      center: pitt,
    }
  );

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: pitt,
    map: map,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
//try again
