import React, {useState, useEffect} from 'react';
import './App.css';
import './RectHover.css';


function DraggableRow(props) {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <div 
      draggable="true" 
      id={props.index} 
      onDragOver={props.handleDragOver} 
      onDragStart={props.handleDragStart}
      className={props.className} 
      style={{background: color}}></div>
  );
}

function App() {
  const numRows = 6;
  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState();
  let currentRowOrder = [];
  for (let i = 0; i < numRows; i++) {
    currentRowOrder.push(i);
  }

  const handleDragStart = (e) => {
    const index = parseInt(e.nativeEvent.target.id);
    setStartIndex(index);
  }

  const handleDragOver = (e) => {
    let elem = e.nativeEvent.target;
    const index = parseInt(elem.id);
    setEndIndex(index);
  }

  useEffect(() => {
    if (!startIndex && !endIndex)
      return; 
    const start = startIndex;
    const end = endIndex;
    const temp = currentRowOrder[start];
    if (start < end) {
      for (let i = start; i < end; i++) {
        currentRowOrder[i] = currentRowOrder[i+1];
      }
    }
    else if (start > end) {
      for (let i = start; i > end; i--) {
        currentRowOrder[i] = currentRowOrder[i-1];
      }
    }
    currentRowOrder[end] = temp;

    let newRowOrder = [];
    currentRowOrder.forEach(id => {
      newRowOrder.push(document.getElementById(`${id}`));
    })

    let editableTable = document.querySelector(".editable-table");
    editableTable.innerHTML = "";
    newRowOrder.forEach(row => {
      editableTable.appendChild(row);
    });

    editableTable = document.querySelector(".editable-table");
    let newRows = editableTable.children;
    for (let i = 0; i < newRows.length; i++) {
      newRows[i].setAttribute("id", `${i}`);
    }
    currentRowOrder = [0, 1, 2];
    setStartIndex(endIndex);
  });

  const [rows, _] = useState(() => {
    let result = [];

    for (let i = 0; i < numRows; i++) {
      result.push(
        <DraggableRow 
          className={"row blue-background"} 
          index={i}
          key={i}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}>
          </DraggableRow>
      );
    }

    return result;
  })

  return (
    <div  className="editable-table">
      {rows}
    </div>
  );
}

export default App;
