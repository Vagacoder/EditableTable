import React, { Component, useState } from 'react';
import './App.css';

function EditableTable(){
  const [dragging, setDragging] = useState(false);
  const [listItems, setListItems] = useState([0, 1, 2]);

  const colors = ['red', 'green', 'blue'];

  function onDrag(){
    setDragging(true);

  }

  function onDrop(){
    setDragging(false);
  }

  function whileDragging(){

  }

  function getStyle(i) {
    return {
      background: colors[i]
    };
  }

  function startDragging(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className="table">
      {listItems.map(listItem => {
       return <div key={listItem} onDragStart={startDragging} draggable="true" id={`row${listItem}`} style={getStyle(listItem)}></div>;
      })}
    </div>
  );

}

class App extends Component {



  render() {
    return (
      <div className="App">
        <EditableTable />
      </div>
    );
  }
}

export default App;
