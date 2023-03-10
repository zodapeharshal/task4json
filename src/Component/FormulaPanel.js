import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import getCaretCoordinates from "textarea-caret";
import DropdownList from "./DropdownList";

const FormulaPanel = () => {
  const [content, setContent] = useState("");
 
  const options = [
    "Mc Dowells",
    "Magic Momment",
    "Kingfisher strong",
    "Budweiser",
    "heinkein",
    "bira",
    "Corona Extra",
    "knockout",
    "GodFather",
  ];


  const handleContentChange = (event) => {
    console.log(event);
    // event.preventDefault() ;
    // event.target.innerHTML()
    setContent(event.target.textContent);
    // setContent("secy") ;
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(inputRef.current.childNodes[0], content.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const addFormulaBox = () => {
    const container = document.getElementById("FormulaContainer");
    const formulaBox = document.createElement("div");
    formulaBox.className = "flex border border-gray-500 p-2 mb-2";
    const label = document.createElement("label");
    const labelvalue = document.createTextNode("Formula :   ");
    label.appendChild(labelvalue);
    formulaBox.appendChild(label);
    const inputbox = document.createElement("div");
    inputbox.oninput = handleContentChange;
    inputbox.contentEditable = "true";
    inputbox.id = "autocomplete-list";
    inputbox.className = "p-1 h-10 w-96 border border-gray ml-2";
    formulaBox.appendChild(inputbox);
    container.appendChild(formulaBox);
  };

  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <div className="flex p-3 justify-between">
        <span className="text-center p-1">Formula Panel</span>
        <Button onClick={addFormulaBox}>+ Add </Button>
      </div>
      <hr></hr>
      <div className="p-3" id="FormulaContainer"></div>

      <div contentEditable={true} value={content} ref={inputRef} onInput={handleContentChange} className="border border-gray-100">{content}</div> 
       { <DropdownList
          options={options}
          inputRef={inputRef}
          onSelect={setSelectedOption}
          content ={content}
          setContent={(val) => setContent(val)}
        ></DropdownList>}
    </>
  );
};
export default FormulaPanel;
