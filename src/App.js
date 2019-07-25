import React from 'react';
import './App.css';

import EditableTable from './EditableTable';

const shownItems = [true, true, true];
const headers = ["Name", "Date", "Color"]
const rowsItems= [
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "Tom", "red"],
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "Undress", "green"],
  [<img className="tbl-itm-img" src="https://source.unsplash.com/random/100x100" alt="img"></img>, "Victor", "blue"],
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
