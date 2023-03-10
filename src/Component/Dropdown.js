import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
  placeHolder,
  isMulti,
  isSearchable,
  isBlock,
  onChange,
  props,
  onTagChange,
}) => {
  const [searchValue, setSearchValue] = useState(props.value);
  const searchRef = useRef();
  const inputRef = useRef();
  console.log(props)

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        // setShowMenu(false);
      }
    };
    document.getElementById("dropdown").focus();
    props.api.refreshCells({ rowNodes: [props.node] });
    
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  },[]);

  const onItemClick = (option) => {
 
    isBlock ? onChange(option.blockName) : onTagChange(option.tagName);
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (isBlock) {
      return props.blockData.filter(
        (block) =>
          block.blockName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
    }
    let newTagVal = null;
    props.blockData.map((block) => {
      if (block.blockName === props.node.data.blockName) {
        newTagVal = block.tag;
      }
    });
    return newTagVal.filter(
      (tag) => tag.tagName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = event => {
    document.getElementById("dropdown").focus();
    if (event.keyCode === 38) { // Up arrow
      setSelectedIndex(prevIndex => prevIndex - 1);
    } else if (event.keyCode === 40) { // Down arrow
      setSelectedIndex(prevIndex => prevIndex + 1);
    } else if (event.key === 'Enter ') { // Enter key
        onChange(event.target.value) ;
    }
  };

  return (
    <div className="w-full">
      {
        <div className="overflow-auto">
          {isSearchable && (
            <div className="w-full">
              <input
                className=" h-8 py-1 px-2 border border-gray-500"
                onChange={onSearch}
                value={searchValue}
                // ref={searchRef}
                placeholder={props.value}
              />
            </div>
          )}
          <select
            className="w-full"
            multiple={true}
            id="dropdown"
            // onChange={selectChangeHandler}
            onKeyDown={handleKeyDown}
          >
            {getOptions().map((opt, i) => (
              <option
                onClick={() => onItemClick(opt)}
                key={isBlock ? opt.blockId : opt.tagId}
                className={`text-gray-700 block px-4 py-2 text-sm`}
                selected={i===selectedIndex}
              >
                {isBlock ? opt.blockName : opt.tagName}
              </option>
            ))}
          </select>
        </div>
      }
    </div>
  );
};

export default Dropdown;
