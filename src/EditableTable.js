import React, {useState, useEffect} from 'react';
import './EditableTable.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faMinusCircle} from '@fortawesome/free-solid-svg-icons';

function Header(props) {
    
    const [shownItems, setShownItems] = useState(props.shownItems);
    const [headerItems, setHeaderItems] = useState(props.headerItems);

    const handleHideColumnAction = (i) => {
        let newShownItemsState = shownItems;
        newShownItemsState[i] = false;
        setShownItems(newShownItemsState);
        setHeaderItems(headerItems.slice());
        props.hideColumnAction(i);
    }

    const handleExpandAllColumnAction = () => {
        let newShownItemsState = shownItems;
        for (let i = 0; i < newShownItemsState.length; i++) {
            newShownItemsState[i] = true;
        }
        setShownItems(newShownItemsState);
        setHeaderItems(headerItems.slice());
    }

    return (
        <div className="header">
            <div className="burger" onClick={() => handleExpandAllColumnAction()}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </div>
            <div className="header-list">
                {
                    headerItems.map((item, i) => {
                        let width = shownItems[i] ? '100px' : '0px';
                        let style = {width: width, overflow: 'hidden'};
                        return <div key={i} style={style} className="header-item">
                            <div className="name">
                                {item}
                            </div>
                            <div className="hide" onClick={() => handleHideColumnAction(i)}>
                                <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>
                            </div>
                        </div>;
                    })
                }
            </div>
        </div>
    );
}

function EditableTable(props) {


    const handleHideColumn = (i) => {
        console.log(`editable table: ${props.shownItems}`);
    }

    useEffect(() => {
        console.log('rendering');
    });

    return (
        <div className="editable-table">
            <Header 
                shownItems={props.shownItems} 
                headerItems={props.headerItems}
                hideColumnAction={handleHideColumn}>
            </Header>
        </div>
    );
}

export default EditableTable;