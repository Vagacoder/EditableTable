/*

Author: Lester
Description: This is a editable table implementation

Supports:
1. Dragging and moving rows in different order
2. Deleting and inserting rows
3. Show/Hide columns

How to use:

Editable table has 4 propersties.
    - data: Array of objects
    - headers: Array of Strings
    - headerRenderer: React component to render the header
    - dataRenderer: React component to render the each data item

Example Use:

******* Example Start *******
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

******* Example End *******
*/

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/EditableTable.css';


function DraggableRow(props) {
    const [currentStyle, setCurrentStyle] = useState({
        background: 'white',
        boxShadow: '2px 2px 5px grey'
    });

    const handleDragStart = (e) => {
        setCurrentStyle({
            background: 'lightgrey',
            boxShadow: '2px 2px 5px grey'
        });
        props.handleDragStart(e);
    }

    const handleDragEnd = (e) => {
        setCurrentStyle({
            background: 'white',
            boxShadow: '2px 2px 5px grey'
        });
        props.handleDragEnd(e);
    }

    return (
        <div
            draggable="true"
            id={props.index}
            onDragOver={props.handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={props.className}
            style={currentStyle}>
            {props.dataRenderer(props.data, props.actions)}
        </div>
    );
}

function EditableTable(props) {
    const numRows = props.data.length;
    const [data, setData] = useState(props.data);
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
        let elem = e.nativeEvent.target.parentElement;
        const index = parseInt(elem.id);
        setEndIndex(index);
    }

    const handleDragEnd = (e) => {
        setStartIndex();
        setEndIndex();
    }

    useEffect(() => {
        if (!startIndex && !endIndex)
            return;
        const start = startIndex;
        const end = endIndex;
        const temp = currentRowOrder[start];
        if (start < end) {
            for (let i = start; i < end; i++) {
                currentRowOrder[i] = currentRowOrder[i + 1];
            }
        }
        else if (start > end) {
            for (let i = start; i > end; i--) {
                currentRowOrder[i] = currentRowOrder[i - 1];
            }
        }
        currentRowOrder[end] = temp;
        let newRowOrder = [];
        currentRowOrder.forEach(id => {
            newRowOrder.push(document.getElementById(`${id}`));
        });

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
        setStartIndex(endIndex ? endIndex : startIndex);
    });

    const deleteItem = (i) => {
        data.splice(i, 1);
        setData(data.slice());
    }
    
    return (
        <div>
            {props.headerRenderer(props.headers, [<div key={0} style={{width: '56px'}}></div>])}
            <div className="editable-table">
                {data.map((row, i) => {
                    return <DraggableRow
                        index={i}
                        key={i}
                        data={row}
                        actions={
                            [<div onClick={() => deleteItem(i)}  key={i} className="et-action-btn">
                                <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>
                            </div>]}
                        dataRenderer={props.dataRenderer}
                        handleDragEnd={handleDragEnd}
                        handleDragOver={handleDragOver}
                        handleDragStart={handleDragStart}>
                    </DraggableRow>
                })}
            </div>
        </div>

    );
}

export default EditableTable;