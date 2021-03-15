import React from "react";
import { Route } from "react-router-dom";

import StopDetail from "../components/StopDetail";

const stopDetail = () => (
  <Route path="/stop-detail/:stopId" component={StopDetail} />
);

export default stopDetail;
