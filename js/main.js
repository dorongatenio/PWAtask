window.addEventListener("DOMContentLoaded", function () {


document.getElementById("find-me").addEventListener('click', geoFindMe)

document.getElementById("shareBtn").addEventListener('click', share)

this.document.getElementById("shareBtn").style.display="none";

})


let GoogleURL = '';

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
        iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
        iframe.classList.remove("d-none")

        GoogleURL = `https://maps.google.com/?q=${latitude},${longitude}`;
    }
    
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'מאתר את מיקומך';
      navigator.geolocation.getCurrentPosition(success, error);

      this.document.getElementById("shareBtn").style.display="block";
    }
  }
  
function share() 
{
    const shareData = {
        title: 'CurrectLocation',
        url: GoogleURL
      }
      
      const btn = document.querySelector('#shareBtn');
      //const resultPara = document.querySelector('.result');

      // Share must be triggered by "user activation"
      btn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData);
          resultPara.textContent = 'CurrectLocation shared successfully';
        } catch (err) {
          resultPara.textContent = `Error: ${err}`;
        }
      });
}