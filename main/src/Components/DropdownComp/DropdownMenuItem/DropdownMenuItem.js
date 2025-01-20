import React from "react";
import styled from "styled-components";
import { useBaseContexts } from "../../../Context/BaseContexts";

const MenuItem = styled.div`
  background-color: #ead5e6;
  padding: 0 1.2rem 0 1.2rem;

  &:hover {
    background-color: #f3e0ec;
  }
`;

function DropdownMenuItem({ name, id }) {
  const baseVals = useBaseContexts();

  const [project, setProject] = baseVals.project;

  const clickHandler = () => {
    setProject(id);
  };
  if (name == "") {
    return (
      <MenuItem>
        Testin testin, dw delete when done and replace with null
      </MenuItem>
    );
  } else {
    return <MenuItem onClick={clickHandler}>{name}</MenuItem>;
  }
}

export default DropdownMenuItem;
