import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import getCaretCoordinates from "textarea-caret";
import DropdownList from "./DropdownList";

const FormulaPanel = () => {
    const [content, setContent] = useState("");

    const aggregators = ["SUM", "SUB"];
    const operands = ["NCA", "CA", "NCA", "TL", "CL"];
    const [options, setOptions] = useState(aggregators);

    const handleContentChange = (event) => {
        console.log(event);
        event.preventDefault();
        // event.target.innerHTML()
        setShowSuggestions(true);
        setContent(event.target.value);
        // setContent("secy") ;
        // const selection = window.getSelection();
        // const range = document.createRange();
        // range.setStart(inputRef.current.childNodes[0], content.length);
        // range.collapse(true);
        // selection.removeAllRanges();
        // selection.addRange(range);
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
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleKeyDown = (event) => {
        console.log(event);
        if (event.keyCode === 38) {
            // Up arrow key
            event.preventDefault();
            setSelectedIndex(Math.max(selectedIndex - 1, -1));
        } else if (event.keyCode === 40) {
            // Down arrow key
            event.preventDefault();
            setSelectedIndex(Math.min(selectedIndex + 1, options.length - 1));
        } else if (event.keyCode === 57) {
            // if opening bracket
            setOptions(operands);
        }
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13 && selectedIndex >= 0) {
            // Enter key

            let leftcnt = content.split("(").length - 1;
            let rightcnt = content.split(")").length - 1;
            if (leftcnt > rightcnt) {
                var cntnt = content;
                cntnt = cntnt + options[selectedIndex] + ")";
                setContent(cntnt);
                setOptions(aggregators);
            } else if (leftcnt == rightcnt) {
                if (leftcnt == 0) {
                    setContent(options[selectedIndex]);
                } else {
                    var cntnt = content;
                    cntnt = cntnt + options[selectedIndex] + "(";
                    setContent(cntnt);
                    setOptions(operands) ;
                    showSuggestions(false) ;
                }
            }
            console.log("On enter data is ", content);
            // setContent(options[selectedIndex]);
            setSelectedIndex(-1);
            setShowSuggestions(false);
        }
    };

    return (
        <>
            <div className="flex p-3 justify-between">
                <span className="text-center p-1">Formula Panel</span>
                <Button onClick={addFormulaBox}>+ Add </Button>
            </div>
            <hr></hr>
            <div className="p-3" id="FormulaContainer"></div>
            <div className="p-3 border border-gray-900 m-3">
            <div>Enter Formula</div>
            <input
                ref={inputRef}
                value={content}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                style={{height: 50, width: 500 }}
                className="p-2 mt-2 border border-gray-300"
                
            ></input>
            <ul>
                {content.length > 0 &&
                    showSuggestions &&
                    options.map((item, index) => (
                        <li
                            className={
                                selectedIndex === index
                                    ? "w-96 p-1 bg-cyan-300"
                                    : "w-96      p-1"
                            }
                            key={item}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
            </div>
            {/* <div contentEditable={true} value={content} ref={inputRef} onInput={handleContentChange} className="border border-gray-100">{content}</div>  */}
            {/* { <DropdownList
          options={options} 
          inputRef={inputRef}
          onSelect={setSelectedOption}
          content ={content}
          setContent={(val) => setContent(val)}
        ></DropdownList>} */}
        </>
    );
};
export default FormulaPanel;
