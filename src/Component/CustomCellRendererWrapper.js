import Dropdown from "./Dropdown";
import { useMemo, useEffect, useState } from "react";
const CustomeCellRendererWrapper = (props) => {

  const updateTagName = (val) => {
    props.data.tag = val ;
    // props.api.refreshCells({ rowNodes: [props.node] });
    props.stopEditing();

  };

  const updateBlockName = (val) => {
    props.data.blockName = val;
    var newTagVal = null;
    props.blockData.map((block) => {
      if (block.blockName === val) newTagVal = block.tag;
    });
    props.data.tag = newTagVal[0].tagName;
    props.api.refreshCells({ rowNodes: [props.node] });
    props.stopEditing();
  };
 
  return (
    <Dropdown
      isSearchable
      placeHolder={props.value}
      onTagChange={(val)=>updateTagName(val)}
      isBlock={props.colDef.field === "block" ? true : false}
      onChange={(value) => updateBlockName(value)}
      props = {props}
    />
  );
};
export default CustomeCellRendererWrapper;
