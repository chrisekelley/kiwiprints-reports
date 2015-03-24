if (typeof window.KiwiUtils === "undefined" || window.KiwiUtils === null) {
  window.KiwiUtils = {};
}

KiwiUtils.geocoderDelay = 500;

KiwiUtils.nextAddress = 0;

KiwiUtils.geocoder = new google.maps.Geocoder();

KiwiUtils.cache = {};

KiwiUtils.getCity = function(search, next) {
  var city, cityEl, geocoder, id, key, latitude, latlng, longitude;
  city = "";
  if (typeof search === 'undefined') {
    return console.log("Empty search");
  } else {
    latitude = search.latitude;
    longitude = search.longitude;
    id = search.id;
    geocoder = KiwiUtils.geocoder;
    key = latitude + '' + longitude;
    if (KiwiUtils.cache.hasOwnProperty(key)) {
      city = KiwiUtils.cache[key];
      console.log("cached city: " + city + " KiwiUtils.geocoderDelay: " + KiwiUtils.geocoderDelay + " KiwiUtils.nextAddress: " + KiwiUtils.nextAddress);
      cityEl = document.getElementById("city" + id);
      cityEl.innerHTML = city;
      return next();
    } else {
      latlng = new google.maps.LatLng(latitude, longitude);
      return geocoder.geocode({
        'latLng': latlng
      }, function(results, status) {
        var add;
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            add = results[0].formatted_address;
            city = add;
            KiwiUtils.cache[key] = city;
          } else {
            city = "address not found";
          }
        } else {
          console.log("Geocoder failed due to: " + status);
          if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            KiwiUtils.nextAddress = KiwiUtils.nextAddress - 1;
            KiwiUtils.geocoderDelay = KiwiUtils.geocoderDelay + 100;
            city = "Over Query Limit; retrying.";
          }
        }
        console.log("city: " + city + " KiwiUtils.geocoderDelay: " + KiwiUtils.geocoderDelay + " KiwiUtils.nextAddress: " + KiwiUtils.nextAddress);
        cityEl = document.getElementById("city" + id);
        cityEl.innerHTML = city;
        return next();
      });
    }
  }
};

KiwiUtils.initGPS = function(gpsList) {
  KiwiUtils.gpsList = gpsList;
  return KiwiUtils.processGPS();
};

KiwiUtils.processGPS = function() {
  var nextAddy;
  if (KiwiUtils.nextAddress < KiwiUtils.gpsList[0].length) {
    nextAddy = KiwiUtils.nextAddress;
    setTimeout(function() {
      return KiwiUtils.getCity(KiwiUtils.gpsList[0][nextAddy], KiwiUtils.processGPS);
    }, KiwiUtils.geocoderDelay);
    return KiwiUtils.nextAddress++;
  }
};
