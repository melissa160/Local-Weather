
//var flickerAPI = "http://api.openweathermap.org/data/2.5/forecast/city?id=524901";

  $(document).ready(function(){

  var flickerAPI = "http://api.openweathermap.org/data/2.5/weather?";
  var lat = 0;
  var lon = 0;
  var celsius = true;
  var tempKelvin = 0;
  var conversion = 0;
  $('#conversionF').on('click', function(event) {
    if(celsius){
      celsius = false;
      conversion = Math.floor((tempKelvin - 273.15)* 1.8 + 32); 
      $('.temp').html(conversion);
      $( this ).css( "color", "#3496FA" );
      $( '#conversionC' ).css( "color", "black" );
    }
    /* Act on the event */
  });
  $('#conversionC').on('click', function(event) {
    if(!celsius){
      celsius = true;
      conversion = Math.floor(tempKelvin - 273.15);
      $('.temp').html(conversion);
      $( this ).css( "color", "#3496FA" );
      $( '#conversionF' ).css( "color", "black" );

    }
    /* Act on the event */
  });

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  latitude = crd.latitude;
  longitude = crd.longitude;


  $.getJSON(flickerAPI, 
    { lat: latitude,
      lon: longitude,
      APPID: 'dc5fcb0708911160fcf4cf954c82a2ca'
    }, 
    function(json){
      conversion = Math.floor(json.main.temp-273.15);
      tempKelvin = json.main.temp;

    console.log(conversion);
    var description = "Consider: " + json.weather[0].description;
    var humidity = json.main.humidity + " %";
    var press = json.main.pressure + " hpa";
    var imag = "<img src='img/"+json.weather[0].main;
    imag += ".jpg' alt='"+json.weather[0].main+"'";
    imag +=  "width='500'></img>";


    $('.temp').html(conversion);
    $('.description').html(description);
    $('.humidity').html(humidity);
    $('.press').html(press);
    $('.imag').html(imag);
  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

$.geolocation.get(success, error, options);


	});