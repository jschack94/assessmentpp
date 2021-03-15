
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styled from "@emotion/styled";

import getStops from "../services/getStops";
import getAlerts from "../services/getAlerts";

import Stops from "./Stops";
import Alerts from "./Alerts";
import Routes from "./Routes";

import getRoutes from "../services/getRoutes";
import { setRoutes } from "../redux/actions";

const ContainerDiv = styled.div`
  display: flex;
`;

const Home = ({ routes, fetchData, location }) => {
  const [alerts, setAlerts] = useState([]);
  const [stops, setStops] = useState([]);
  const [currentId, setCurrentId] = useState('');



  const handleApiCall = async () => {
    const data = await getRoutes();
    return fetchData(data);
  }


  useEffect(() => {
    handleApiCall()
    location?.state?.params && handleRouteChange(location?.state?.params)
  }, []);


  const handleRouteChange = id => {
    setCurrentId(id);
    getStops(id).then(newStops => setStops(newStops));
    getAlerts(id).then(newAlerts => setAlerts(newAlerts));

  };

  const currentIdInfo = currentId || location?.state?.params
  return (
    <ContainerDiv>
      <Routes
        routes={routes}
        routeClick={handleRouteChange}
        currentId={currentIdInfo}
      />
      <Stops stops={stops} routeId={currentId} />
      
      <Alerts alerts={alerts} />
    </ContainerDiv>
  );
};

const mapStateToProps = state => {
  return {
    routes: state.routes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (data) => dispatch(setRoutes(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


