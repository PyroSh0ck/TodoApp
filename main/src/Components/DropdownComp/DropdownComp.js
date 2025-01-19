import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function DropdownComp({ wdata, windex }) {
    const [caretRotation, setCaretRotation] = useState(270);
    const [toggled, setToggled] = useState(false)

    const dropdownHandler = () => {
        if (toggled) {
            setCaretRotation(0);
            setToggled(false);
        } else {
            setCaretRotation(270);
            setToggled(true);
        }
    }
    return (
        <div key={windex} className="dropdown-holder">
            <div className="dropdown-header-holder" onClick={dropdownHandler}>
                <div className="dropdown-header-div">
                    <h5 className="dropdown-header-text"> {wdata.name} </h5>
                    <div className="dropdown-header-favicons">
                        <FontAwesomeIcon icon={faPlus} className="ddHeaderPlus"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faCaretDown} className={`ddHeaderCaret fa-rotate-${caretRotation}`} ></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropdownComp