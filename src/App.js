import "./App.css";
import Table from "./Component/Table";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import FormulaPanel from "./Component/FormulaPanel";

function App() {
  const [showFormulaPanel, setShowFormulaPanel] = useState(false);

  return (
    <>
      <div className="flex h-[90%] ">
        <div className="h-[85%] ">
          <Table fullWidth={showFormulaPanel}></Table>
        </div>

        <div className="h-[85%] w-[40%]">{showFormulaPanel && <FormulaPanel />}</div>
      </div>
      <div>
        <Fab
          onClick={(e) => setShowFormulaPanel(!showFormulaPanel)}
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Formula
        </Fab>
      </div>
    </>
  );
}

export default App;
