import React from 'react';
import './App.css';

import EditableTable from './EditableTable';

const shownItems = [true, true, true];
const headers = ["Name", "Date", "Color"]
const rowsItems= [
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "0", "red"],
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "1", "green"],
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "2", "blue"],
]

function App() {
  return (
    <EditableTable 
      shownItems={shownItems}
      headers={headers} 
      rowItems={rowsItems}></EditableTable>
  );
}

export default App;
