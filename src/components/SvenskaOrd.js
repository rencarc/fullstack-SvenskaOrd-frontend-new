import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const SvenskaOrd = ({ swedish, english, example, updateMode, deleteSvenskaOrd }) => {
  return (
    <div className="svenska-ord">
      <div className="text">
        <strong>{swedish}</strong> - {english} <br />
        <em>{example}</em>
      </div>
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteSvenskaOrd} />
      </div>
    </div>
  );
};

export default SvenskaOrd;
