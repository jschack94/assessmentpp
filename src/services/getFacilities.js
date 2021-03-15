const getFacilities = id => {
    const url = `https://api-v3.mbta.com/facilities?filter[place]=${id}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(json => json.data);
  };
  
  export default getFacilities;
  