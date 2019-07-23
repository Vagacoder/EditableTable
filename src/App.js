import React from 'react';
import './App.css';

import EditableTable from './EditableTable';


const biologyConference = {
  show: [true, true, true, true],
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

function App() {
  return (
    <div>
      <EditableTable shownItems={biologyConference.show} headerItems={biologyConference.headers}></EditableTable>
    </div>
  );
}

export default App;
