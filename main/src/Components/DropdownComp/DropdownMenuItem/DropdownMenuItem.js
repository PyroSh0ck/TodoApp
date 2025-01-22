import React from "react";
import styled from "styled-components";

const MenuItem = styled.div`
  background-color: #ead5e6;
  padding: 0 1.2rem 0 1.2rem;

  &:hover {
    background-color: #f3e0ec;
  }
`;

function DropdownMenuItem({ name, id, passedClickFunc }) {
  if (name == "") {
    return (
      <MenuItem>
        Testin testin, dw delete when done and replace with null
      </MenuItem>
    );
  } else {
    return (
      <MenuItem
        className="click here bruh"
        onClick={(e) => {
          passedClickFunc(e, name, id);
        }}
      >
        {name}
      </MenuItem>
    );
  }
}

export default DropdownMenuItem;
