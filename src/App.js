import React from 'react';
import './App.css';
import EditableTable from './lib/editabletable/js/EditableTable';


const biologyConference = {
  headers: ["image", "name", "date", 'end date'],
  data: [
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Gracehopper',
      date: '07/20/2015',
      endDate: '08/20/2015'
    },
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Beasely',
      date: '10/10/2012',
      endDate: '11/10/2012'
    },
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Starfish Conference',
      date: '10/12/2012',
      endDate: '11/12/2012'
    },
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Gracehopper',
      date: '07/20/2015',
      endDate: '08/20/2015'
    },
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Beasely',
      date: '10/10/2012',
      endDate: '11/10/2012'
    },
    {
      imgUrl: 'https://source.unsplash.com/random/100x100',
      name: 'Starfish Conference',
      date: '10/12/2012',
      endDate: '11/12/2012'
    }
  ]
};

function BiologyConferenceHeader(props) {

  return (
    <div className="bio-conf-header">
      <span className="bio-conf-item">{props[0]}</span>
      <span className="bio-conf-item">{props[1]}</span>
      <span className="bio-conf-item">{props[2]}</span>
      <span className="bio-conf-item">{props[3]}</span>
    </div>
  );
}

function BiologyConferenceData(props) {
  return (
    <div className="bio-conf-data">
      <span className="bio-conf-item">
        <img src={props.imgUrl} alt={props.name}></img>
      </span>
      <span className="bio-conf-item">{props.name}</span>
      <span className="bio-conf-item">{props.date}</span>
      <span className="bio-conf-item">{props.endDate}</span>
    </div>
  );
}

function App() {
  return (
    <div>
      <EditableTable 
        data={biologyConference.data} 
        headers={biologyConference.headers}
        headerRenderer={BiologyConferenceHeader}
        dataRenderer={BiologyConferenceData}
      ></EditableTable>
    </div>
  );
}

export default App;
