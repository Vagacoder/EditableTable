import React, {useState} from 'react';
import './App.css';

function EditableTable() {
  let cpListItems = ["row 1", "row 2", "row 3", "row 4", "row 5"];

  const [listItems, setListItems] = useState(cpListItems);
  let colors = ['red', 'green', 'blue', 'orange', 'lightblue'];
  const [a, setA] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [itemOnHoldStyle, setItemOnHoldStyle] = useState({
    position: 'absolute',
    background: 'yellow',
    opacity: 0.3,
    display: 'none',
    pointerEvents: 'none'
  });

  function getStyle(i) {
    return {
      background: colors[i]
    };
  }

  function mouseMoving(e) {
    if (mouseDown) {
      setItemOnHoldStyle({
        position: 'absolute',
        background: 'yellow',
        top: e.nativeEvent.clientY - e.nativeEvent.offsetY,
        left: e.nativeEvent.clientX - e.nativeEvent.offsetX,
        opacity: 0.3,
        display: 'block',
        pointerEvents: 'none'
      });
      updateRows(e);
    }
  }


  function updateRows(e) {
    const b = parseInt(e.nativeEvent.target.id.replace('row',''));
    const isDown = a < b;

    let start = a;
    let end = b;

    let temp = cpListItems[start];
    if (isDown) {
      for (let i = start; i < end; i++) {
        cpListItems[i] = cpListItems[i + 1];
      }
    } else {
      for (let i = start; i > end; i--) {
        cpListItems[i] = cpListItems[i - 1]
      }
    }

    cpListItems[end] = temp;
    setListItems(cpListItems);
  }

  function mousePressed(e) {
    setMouseDown(true);
    const value = e.nativeEvent.target.innerHTML;
    let itemOnHold = document.querySelector(".item-on-hold");
    itemOnHold.innerHTML = value;
    setA(parseInt(e.nativeEvent.target.id.replace("row","")));
  }

  function mouseUp() {
    setMouseDown(false);
    setItemOnHoldStyle({
      position: 'absolute',
      background: 'yellow',
      opacity: 0.3,
      display: 'none',
      pointerEvents: 'none'
    });
    console.log("Mouse up");
  }

  return (
    <div className="table">
      {
        listItems.map((item, i) => { 
          return <div 
            onMouseDown={mousePressed} 
            onMouseUp={mouseUp}
            onMouseMove={mouseMoving}
            key={i}
            id={`row${i}`}
            style={getStyle(i)}>{item}</div>; 
        })
      }
      <div className="item-on-hold" style={itemOnHoldStyle}></div>
    </div>
  );
}

function App() {
  return ( 
    <EditableTable></EditableTable>
  );
}

export default App;
