import React from 'react';
import { withRouter } from 'react-router-dom';

const Map = ({ history, match, linkUrl }) => (
  <div className="map" onClick={() => history.push(`${match}${linkUrl}`)}>
    Map
  </div>
);

export default withRouter(Map);
