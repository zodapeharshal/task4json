import { useRef, useState, useEffect, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GridContext } from "./GridContext";


const CustomHeader = (props) => {

  const refButton = useRef(null);
  const [displayName, setDisplayName] = useState(props.displayName) ;
  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  // const [editingHeaderId, setEditingHeaderId] = useState(null);
  // const editingHeaderId = useContext(GridContext) ;
  const {editingHeaderId, setEditingHeaderId} = useContext(GridContext) ;

  useEffect(() => {
    props.column.addEventListener("rename", () => {
      console.log("sjdfkjdhfasdkjlfhasdkj");
    });
  }, []);

  const handleChange = (event) =>  {
    console.log("handleChange");
    setDisplayName(event.target.value) ;
    // this.setState({ value: event.target.value });
  }

  const  handleKeyPress = (event) => {
    if (event.key == "Enter") {
      let cols = props.api.getColumnDefs();

      let currentColumnId = props.column.getColId();

      let newCols = [];

      cols.forEach(colDef => {
        if (colDef.colId == currentColumnId) {
          newCols.push({ ...colDef, headerName: displayName });
        } else {
          newCols.push({ ...colDef });
        }
      });
      console.log("props", props.columnApi.getColumn(currentColumnId)) ;
      var editcol = props.columnApi.getColumn(currentColumnId) ; 
      editcol.colDef.headerName = displayName ; 
      props.api.refreshHeader() ; 
      setEditingHeaderId(null) ;    
      editingHeaderId = null ; 
    }
  }

  return (
    <>
      {/* <GridContext.Consumer>
        {({ editingHeaderId }) => {
        //   console.log(editingHeaderId);
          console.log(props)
          setEditingHeaderId(editingHeaderId);
        }}
      </GridContext.Consumer> */}
      
      <div id="divid" className="flex justify-end"> 
        {(editingHeaderId === props.column.getColId()) ? (
          <input
            type="text"
            value={displayName}
            onChange={handleChange}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        ) : (
          <span
            ref={refButton}
          >
            {props.displayName}
          </span>
        )}

        <div onClick={() => onMenuClicked()}>
          <MenuIcon></MenuIcon>
        </div>


      </div>
    </>
  );
};
export default CustomHeader;
