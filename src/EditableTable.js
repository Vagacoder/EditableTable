import React, { useState } from 'react';
import './EditableTable.css';


function Headers(props) {
	return (
		<div className="headers">
		 	{
				props.headers.map((header, i) => {
					return <HeaderItem 
						key={i}
						header={header} 
						index={i} 
						setShownItems={props.setShownItems}
						shownItems={props.shownItems}
					></HeaderItem>
				})
			}
		</div>
	);
}

function HeaderItem(props) {
	const style = props.shownItems[props.index] ? {} : {display: 'none'};
	const handleOnClick = () => {
		const shownItems = props.shownItems;
		const index = props.index;
		shownItems[index] = !shownItems[index];
		props.setShownItems(shownItems.slice());
	}

	return (
		<div onClick={handleOnClick} style={style} className="header-item">{props.header}</div>
	);
}

function Table(props) {
	return (
		<div className="table">
			{
				props.rowOrder.map((i, index) => {
					return <TableItem 
						index={index} 
						key={index}

						prevEndIndex={props.prevEndIndex}
						setPrevEndIndex={props.setPrevEndIndex}

						rowOrder={props.rowOrder}
						setRowOrder={props.setRowOrder}
						startIndex={props.startIndex}

						endIndex={props.endIndex}
						setStartIndex={props.setStartIndex}
						setEndIndex={props.setEndIndex}
						shownItems={props.shownItems} 
						rowItem={props.rowItems[i]}></TableItem>
				})
			}
		</div>
	);
}

function TableItem(props) {
	const [style, setStyle] = useState({});

	const handleDragStart = (e) => {
		const i = parseInt(e.nativeEvent.target.id);
		props.setStartIndex(i);
		props.setEndIndex(i);
	}

	const handleDragOver = (e) => {
		const targetId = parseInt(e.nativeEvent.target.id);

		if (isNaN(targetId))
			return;

		props.setEndIndex(targetId);

		if (props.endIndex !== null && 
			props.startIndex !== null &&
			props.prevEndIndex !== props.endIndex) {
			let rowOrder = props.rowOrder;
			let temp = rowOrder[props.startIndex];
			if (props.startIndex < props.endIndex) {
				for (let i = props.startIndex; i < props.endIndex; i++) {
					rowOrder[i] = rowOrder[i + 1]
				}
			} else {
				for (let i = props.startIndex; i > props.endIndex; i--) {
					rowOrder[i] = rowOrder[i - 1];
				}
			}
			rowOrder[props.endIndex] = temp;

			props.setRowOrder(rowOrder.slice());
			props.setPrevEndIndex(props.endIndex);
			props.setStartIndex(props.endIndex);
		}

		setStyle({ background: 'lightgrey '});
	}

	const handleDragLeave = () => {
		setStyle( {} );
	}

	return (
		<div id={`${props.index}`} 
			style={style}
			draggable="true" 
			className="table-item" 
			onDragStart={handleDragStart}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}>
			{
				props.rowItem.map((item, i) => {
					return <Item key={i} item={item} index={i} shownItems={props.shownItems}></Item>
				})
			}
		</div>
	);
}

function Item(props) {
	const style = props.shownItems[props.index] ? {} : { display: 'none'};
	return (
		<div className="item" style={style}>{props.item}</div>
	);
}

function EditableTable(props) {
	const [shownItems, setShownItems] = useState(props.shownItems);
	const [rowOrder, setRowOrder] = useState(() => {
		let result = [];
		for (let i = 0; i < props.rowItems.length; i++) {
			result.push(i);
		}
		return result;
	});

	const [startIndex, setStartIndex] = useState();
	const [endIndex, setEndIndex] = useState();
	const [prevEndIndex, setPrevEndIndex] = useState(endIndex);

	return (
		<div className="editable-table"> 
			<Headers headers={props.headers} shownItems={shownItems} setShownItems={setShownItems}></Headers>
			<Table 
				endIndex={endIndex}
				setEndIndex={setEndIndex}

				startIndex={startIndex}
				setStartIndex={setStartIndex}

				prevEndIndex={prevEndIndex}
				setPrevEndIndex={setPrevEndIndex}
				
				rowOrder={rowOrder} 
				setRowOrder={setRowOrder} 
				rowItems={props.rowItems} 
				shownItems={shownItems}></Table>
		</div>
	);
}

export default EditableTable;