import React, { useEffect, useState } from "react";
import getFacilities from "../services/getFacilities";

const ShowDetails = ({
  match: {
    params: { stopId },
  },
}) => {
  const [facilities, setFacilities] = useState([]);
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    getFacilities().then((newFacilities) => {
      setFacilities(newFacilities);
      const filtered = newFacilities.filter(
        (facility) => facility?.relationships?.stop?.data?.id === stopId
      ); //stopId= "place-alfcl"
      console.log("filtered", filtered);
      setFacility(filtered);
    });
  }, [stopId]);

  return (
    <div>
      <strong>Facilities for {stopId}</strong>
      <p></p>
      {console.log(facilities)}
      {console.log("facility is", facility)}
      {facilities.map((fac) => (
        <div>**{fac.attributes.short_name}**</div>
      ))}
    </div>
  );
};

export default ShowDetails;
