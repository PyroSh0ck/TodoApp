import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import DropdownMenuItem from "./DropdownMenuItem/DropdownMenuItem";
import { useBaseContexts } from "../../Context/BaseContexts";

const CDropdown = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const DropdownBody = styled.div`
  overflow-x: scroll;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #ead5e6;
  border: 0.2rem solid #ead5e6;
  border-radius: 10px;

  max-height: ${({ $toggled }) => {
    if ($toggled) {
      return `10rem;`;
    } else {
      return `0px;`;
    }
  }}

  visibility: ${({ $toggled }) => {
    if ($toggled) {
      return `visible;`;
    } else {
      return `hidden;`;
    }
  }}
  
  opacity: ${({ $toggled }) => {
    if ($toggled) {
      return `100%;`;
    } else {
      return `0%;`;
    }
  }}

  transition: .3s opacity;
`;
const DropdownText = styled.h5`
  background-color: transparent;
  padding: 0rem;
  margin: 0rem;
`;
const FaviconHolder = styled.div`
  background-color: transparent;
`;
const Icon = styled(FontAwesomeIcon)`
  background-color: transparent;
  transition: 0.3s all;
`;
const Plus = styled(Icon)`
    visibility: ${({ $includePlus }) => {
      if ($includePlus) {
        return `visible;`;
      } else {
        return `hidden;`;
      }
    }}
    &:hover {
      font-size: 1.1rem;
    }
    padding: 0 .5rem 0 .5rem;
`;
const Caret = styled(Icon)`
  transform: ${({ $rotation }) => `rotate(${$rotation}deg)`};
`;
const CDropdownTitleDiv = styled(CDropdown)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  &:hover {
    background-color: #ead5e6;
  }
  border: 0.2rem solid #ead5e6;
  border-radius: 10px;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;
function DropdownComp({ Dtitle, Did, Ddata, Dmodifiers }) {
  // Title should be self-explanatory, its just going to be a string
  // Data is an array that contains all the stuff I want it to contain
  // Modifiers is an object that contains some modifiers. If I do not
  // want said modifiers, I shall modify the modifiers accordingly

  /*
        Data should be in this format:
        data = [
            {item 1}, {item 2}, ...
        ]
        
        and

        Modifiers should be in this format:
        modifiers = {
            includePlus: true
        }
    */

  /*
        Format for the dropdown menu
        <main div that holds everything> - dropdownwrapper
            <div that holds the title and stuff> -dropdownTitleWrapper
                <div that holds the text for title>
                <div that holds the favicons>
                    <favicon dropdown>
                    <plus icon (optional)>
            <div that drops down>
  */

  const [caretRotation, setCaretRotation] = useState(-90);
  const [toggled, setToggled] = useState(false);
  const [ddText, setddText] = useState(undefined);

  const baseVals = useBaseContexts();

  const [wptInfo, setWptInfo] = baseVals.wptInfo;
  const [modalArgs, setModalArgs] = baseVals.modalArgs;
  const [selected, setSelected] = baseVals.selected;

  if (Dmodifiers === undefined) {
    Dmodifiers = {
      includePlus: true,
    };
  }

  if (Dtitle === undefined) {
    Dtitle = "";
  }

  if (Ddata === undefined || Ddata == []) {
    Ddata = [
      {
        name: "",
        id: 0,
      },
    ];
  }

  if (ddText === undefined) {
    setddText(Dtitle);
    setToggled(false);
  }

  /* Functions */

  const projectAddHandler = () => {
    setSelected({
      ...selected,
      workspace: {
        ...selected.workspace,
        id: Did,
        // I could search through the workspaces to find the attrs of the workspace with the same id as we're given
        // However, this is unnecessary, and I think that if I ever do need to access that,
        // Then I will look to see if the name is an empty string, then search when I need to
        // This will probably save on computation time?
      },
    });

    setModalArgs({
      toggled: true,
      type: "project",
      modalInfo: {
        heading: "Add a new Project!",
        inputTitle: "Project Name:",
        secondInput: false,
        secondTitle: "",
        showDate: false,
      },
    });
  };

  const menuHandler = (e, sname, sid) => {
    console.log("button pressed? Maybe wrong button");
    if (modalArgs.type === "project") {
      setSelected({
        ...selected,
        workspace: {
          ...selected.workspace,
          id: sid,
        },
      });
    } else if (modalArgs.type === "task") {
      setSelected({
        ...selected,
        project: {
          ...selected.project,
          id: sid,
        },
      });
      console.log(sid);
      setddText(sname);
      setToggled(false);
    }
  };

  const dropdownHandler = () => {
    if (toggled) {
      setCaretRotation(-90);
    } else {
      setCaretRotation(0);
    }
    setToggled(!toggled);
  };
  return (
    <CDropdown>
      <CDropdownTitleDiv onClick={dropdownHandler}>
        <DropdownText>{ddText}</DropdownText>
        <FaviconHolder>
          <Plus
            $includePlus={Dmodifiers.includePlus}
            icon={faPlus}
            onClick={projectAddHandler}
          />
          <Caret icon={faCaretDown} $rotation={caretRotation} />
        </FaviconHolder>
      </CDropdownTitleDiv>
      <DropdownBody $toggled={toggled}>
        {Ddata.map((subData, subIndex) => (
          <DropdownMenuItem
            name={subData.name}
            key={subIndex}
            id={subData.id}
            passedClickFunc={menuHandler}
          />
        ))}
      </DropdownBody>
    </CDropdown>
  );
}

export default DropdownComp;
