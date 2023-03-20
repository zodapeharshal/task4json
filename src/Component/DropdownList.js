import React, { useState, useEffect, useRef } from "react";

function DropdownList({options, inputRef, onSelect, content, setContent}) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      } else if (
        event.key === "ArrowDown" &&
        highlightedIndex < options.length - 1
      ) {
        setHighlightedIndex(highlightedIndex + 1);
      }
      else if ( event.key === "Enter"){
        event.preventDefault() ;
        setContent("SECY") ;
        console.log('sec C')
      }
    };
    

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex, options.length]);

  useEffect(() => {
    var selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      let rect = range.getClientRects()[0];
      const left = rect ? rect.left : 2000 ; 
      const top = rect ? rect.top + 10   : 2000; 
      setPosition({left, top}) ;
    }
  }, [content]);

  const listItems = options.map((option, index) => (
    <li
      key={index}
      className={highlightedIndex === index ? "p-1 bg-cyan-300" : "p-1"}
      onClick={() => onSelect(option)}
    >       
      {option}
    </li>
  ));

  return (
    <ul
      ref={dropdownRef}
      className="dropdown-list"
      style={{ left: position.left, top: position.top + 20, position: "absolute" }}
    >
      {listItems}
    </ul>
  );
}

export default DropdownList;
