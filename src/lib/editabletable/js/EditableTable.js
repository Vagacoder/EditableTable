import React, { useState, useEffect } from 'react';
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
            {props.dataRenderer(props.data)}
        </div>
    );
}

function EditableTable(props) {
    const numRows = props.data.length;
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


    const [rows, _] = useState(() => {
        let result = [];

        for (let i = 0; i < numRows; i++) {
            result.push(
                <DraggableRow
                    index={i}
                    key={i}
                    data={props.data[i]}
                    dataRenderer={props.dataRenderer}
                    handleDragEnd={handleDragEnd}
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}>
                </DraggableRow>
            );
        }

        return result;
    });

    return (
        <div>
            {props.headerRenderer(props.headers)}
            <div className="editable-table">
                {rows}
            </div>
        </div>

    );
}

export default EditableTable;