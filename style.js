const citySelect = document.querySelector("#city");
citySelect.addEventListener("change", async function () {
  const selectedCity = citySelect.value;
  console.log("Selected city: " + selectedCity);

  const option = { method: "GET", headers: { accept: "application/xml" } };

  try {
    let response = await fetch(
      "https://us1.locationiq.com/v1/search?q=" +
        selectedCity +
        "&key=pk.f613aeb56fb08220166e9dc9f07fb47b",
      option
    );

 
    let responseText = await response.text();

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(responseText, "text/xml");

    // Extract some data from the XML (e.g., first place's lat and lon)
    let place = xmlDoc.getElementsByTagName("place")[0];
    let lat = place.getAttribute("lat");
    let lon = place.getAttribute("lon");
    let displayName = place.getAttribute("display_name");
    console.log("Latitude: ", lat);
    console.log("Longitude: ", lon);
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q='+lat+'%2C'+lon;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e7dd73642bmsh175a1f739f0cb3ap1150d0jsn513c9ba3aaff',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    

        let finalresponse =await  fetch(url, options)
        finalresponse=await finalresponse.json()
        console.log(finalresponse.current)
        document.querySelector(".humidity").innerText=finalresponse.current.humidity+"%"
        document.querySelector(".dtype").innerText=finalresponse.current.condition.text
        document.querySelector(".temp").innerText=finalresponse.current.temp_c+" °C"
        document.querySelector(".wspeed").innerText=finalresponse.current.wind_kph+" kmph"
        document.querySelector(".name").innerText=displayName






  } catch (error) {
    console.error("Error fetching data: ", error);
  }
});
