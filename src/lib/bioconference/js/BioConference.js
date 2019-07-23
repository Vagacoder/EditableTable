
import React from 'react';
import '../css/BioConference.css';


function BiologyConferenceHeader(props, actions = []) {

  return (
    <div className="bio-conf-header">
      {
        actions.map(action=> {
          return action;
        })
      }
      <span className="bio-conf-item">{props[0]}</span>
      <span className="bio-conf-item">{props[1]}</span>
      <span className="bio-conf-item">{props[2]}</span>
      <span className="bio-conf-item">{props[3]}</span>
    </div>
  );
}

function BiologyConferenceData(props, actions = []) {
  return (
    <div className="bio-conf-data">
      {
        actions.map(action=> {
          return action;
        })
      }
      <span className="bio-conf-item">
        <img src={props.imgUrl} alt={props.name}></img>
      </span>
      <span className="bio-conf-item">{props.name}</span>
      <span className="bio-conf-item">{props.date}</span>
      <span className="bio-conf-item">{props.endDate}</span>
    </div>
  );
}

export const DataRenderer = BiologyConferenceData;
export const HeaderRenderer = BiologyConferenceHeader;