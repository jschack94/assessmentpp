import React from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import colors from "../theme/colors";
import ReactTooltip from 'react-tooltip';
import "./Routes.css";

const RoutesUl = styled.ul`
  && {
    color: ${colors.cta};
    border: 0.1rem solid ${colors.gray4};
    border-bottom: 0;
    display: block;
    margin-right: 1.5rem;
  }
`;


const RouteLI = styled.li`
  && {
    border-bottom: 0.1rem solid ${colors.gray4};
    padding: 0.5rem;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    max-width: 20rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none; 
    &:hover {
      color: ${colors.white};
      background-color: ${colors.cta};
    }
    &.active {
      color: ${colors.cta};
      background-color: ${colors.primary1};
    }
  }
`;



const Routes = ({ routes, routeClick, currentId }) => {

  const handleRouteClick = route => () => {
    routeClick(route.id);
  };

  if (!routes) {
    return null;
  }

  return (
    <div>
      <span className="heading">{`${routes.length} Route${
        routes.length === 1 ? "" : "s"
      }`}</span>
      <RoutesUl className="Routes">
        {routes.map(route => (
          <div key={route.id}>
          <RouteLI
            titel={route.attributes.long_name}
            className={classnames({ active: route.id === currentId }, 'tooltip')}
            onClick={handleRouteClick(route)}
            data-tip data-for={route.id}
          >{`${route.attributes.long_name}`}</RouteLI>
          <ReactTooltip id={route.id} type='info' place='right'>
          <span>{route.attributes.fare_class}</span>
          <p>{route.attributes.long_name}</p>
          <p>{route.attributes.short_name}</p>
        </ReactTooltip>
        </div>
        ))}
      </RoutesUl>
    </div>
  );
};

export default Routes;
