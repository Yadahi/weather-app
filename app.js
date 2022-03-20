// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=f2324a53860760e1531fad760dae662f
window.addEventListener('load', ()=>{
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description")
  const temperatureDegree = document.querySelector(".temperature-degree")
  const temperatureTimezone = document.querySelector(".location-timezone")
  const temperatureIcon = document.querySelector(".location-icon")
  const temperatureSection = document.querySelector(".degree-section")
  const temperatureSpan = document.querySelector(".degree-section span")

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position=>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f2324a53860760e1531fad760dae662f`

      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temp} = data.main;
        const {name} = data
        const {description, icon} = data.weather[0];



        temperatureDescription.textContent = description;
        temperatureTimezone.textContent = name;
        let celsius = Math.round(temp - 273.15);
        let fahrenheit = Math.round(((temp - 273.15)*1.8)+32);

        temperatureDegree.textContent = fahrenheit;

        setIcons(icon);
        temperatureSection.addEventListener('click', () => {
          if(temperatureSpan.textContent === "F") {
            temperatureDegree.textContent = celsius;
            temperatureSpan.textContent = "C";

          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = fahrenheit;
          }
        });

      })
    });

    function setIcons(icon) {
      temperatureIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
    }

  } else {
    h1.textContent = "not working"
  }
});
