let currentPosition = 1;
setInterval(() => {
  const inner = document.querySelector("#galeria .inner");

  let size = inner.children.length;
  console.log(size);
  inner.style.left = currentPosition * -100 + "%";
  currentPosition++;

  if (currentPosition === size) {
    currentPosition = 0;
  }
  console.log(currentPosition);
}, 3500);

// envio con ajax
window.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("form");
  var button = document.getElementById("send");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Enviamos su correo, pronto nos comunicaremos :)";
  }

  function error() {
    status.innerHTML = "Oops! ocurrio un problema";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

// google maps
(function () {

  class UserLocation {
    static get (cb) {
      navigator.geolocation.getCurrentPosition( location => {
        cb({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      })
    }
  }

  const my_place = {
    lat: -7.3015786,
    lng: -79.4801747
  }

  google.maps.event.addDomListener(window, 'load',()  => {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        center: my_place,
        zoom: 15
      }
    )
    const marker = new google.maps.Marker({
      map: map,
      position:  my_place,
      title: "RestaurantFacilito",
      visible: true
    })
    })

    UserLocation.get(coords => {
      let origen = new google.maps.LatLng(coords.lat, coords.lng)
      let destino = new google.maps.LatLng(my_place.lat, my_place.lng)
      let service = new google.maps.DistanceMatrixService()

      service.getDistanceMatrix({
        origins: [origen],
        destinations: [destino],
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        // [[origen-destino, origen-destino2], [origen2-destino, origen2-destino2]]
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const duration_element = response.rows[0].elements[0]
          const duration_viaje = duration_element.duration.text
          document.querySelector('#message').innerHTML = `
            Estas a ${duration_viaje} de una noche inolvidable en <span class="dancing-script">Restaurante Facilito</span>
          `
        }
    })
  })
})()