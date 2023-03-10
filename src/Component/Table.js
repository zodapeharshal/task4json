import React, {
  useEffect,
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import CustomHeader from "./CustomHeader";
import { GridContext } from "./GridContext";
import CustomeCellRendererWrapper from "./CustomCellRendererWrapper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Table = () => {
  const [headers, setHeaders] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState(null);
  const [editingHeaderId, setEditingHeaderId] = useState("useful");
  const gridref = useRef();
  const suppressEnter = (params) => {
    var KEY_ENTER = 'Enter';
    var event = params.event;
    var key = event.key;
    var suppress = key === KEY_ENTER;
    return suppress;
  };
  const getHeaders = () => {
    const hrs = [];
    data &&
      data.inputData.data[0].periods.map((item) => {
        if (item.cId === -1) {
          hrs.push({
            field: item.period,
            headerName: item.period,
            editable: true,
            headerComponent: CustomHeader,
            headerComponentParams: editingHeaderId,
            cellEditor: CustomeCellRendererWrapper,
            cellEditorParams: {
              blockData: data.inputData.data[0].blockData,
            },
            cellEditorPopup: true,
            suppressKeyboardEvent: (params) => {
              return suppressEnter(params)  
            },
            valueGetter:
              item.cId === -1
                ? (params) => (params.data ? params.data.blockName : "")
                : item.cId === 0
                ? (params) => (params.data ? params.data.tag : "")
                : (params) =>
                    params.data ? params.data.facts[item.cId].v : "",
            valueSetter:
              item.cId === -1
                ? (params) => (params.data.blockName = params.newValue)
                : item.cId === 0
                ? (params) => (params.data.tag = params.newValue)
                : (params) => (params.data.facts[item.cId].v = params.newValue),
            cellStyle: { textAlign: "start" },
          });
        } else if (item.cId === 0) {
          hrs.push({
            field: item.period,
            headerName: item.period,
            editable: true,
            headerComponent: CustomHeader,
            headerComponentParams: editingHeaderId,
            cellEditor: CustomeCellRendererWrapper,
            cellEditorParams: {
              blockData: data.inputData.data[0].blockData,
            },
            cellEditorPopup: true,
            valueGetter:
              item.cId === -1
                ? (params) => (params.data ? params.data.blockName : "")
                : item.cId === 0
                ? (params) => (params.data ? params.data.tag : "")
                : (params) =>
                    params.data ? params.data.facts[item.cId].v : "",
            valueSetter:
              item.cId === -1
                ? (params) => (params.data.blockName = params.newValue)
                : item.cId === 0
                ? (params) => (params.data.tag = params.newValue)
                : (params) => (params.data.facts[item.cId].v = params.newValue),
            cellStyle: { textAlign: "start" },
          });
        } else {
          hrs.push({
            field: item.period,
            headerName: item.period,
            editable: true,
            headerComponent: CustomHeader,

            headerComponentParams: editingHeaderId,
            valueGetter:
              item.cId === -1
                ? (params) => (params.data ? params.data.blockName : "")
                : item.cId === 0
                ? (params) => (params.data ? params.data.tag : "")
                : (params) =>
                    params.data ? params.data.facts[item.cId].v : "",
            valueSetter:
              item.cId === -1
                ? (params) => (params.data.blockName = params.newValue)
                : item.cId === 0
                ? (params) => (params.data.tag = params.newValue)
                : (params) => (params.data.facts[item.cId].v = params.newValue),
            cellStyle: { textAlign: "start" },
          });
        }
      });
    setHeaders(hrs);
  };

  const getRowData = () => {
    if (data) {
      setRowData(data.inputData.data[0].lineItmes);
    }
  };

  const getData = async () => {
    await fetch("task4json.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getHeaders();
    getRowData();
  }, [data]);

  const getDataPath = useMemo(() => {
    return (data) => {
      return data.filePath;
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const autoGroupColumnDef = {
    headerName: "Name",
    editable: true,
    width: 300,
    cellRendererParams: {
      suppressCount: true,
    },
    valueGetter: (params) => {
      if (params.data) return params.data.name;
      return "";
    },
    valueSetter: (params) => {
      params.data.name = params.newValue;
    },
  };

  const createId = () => {
    var hid = 0;
    gridref.current.api.forEachNode((rowNode, idx) => {
      if (hid < rowNode.data.id) hid = rowNode.data.id;
    });
    return hid + 1;
  };

  const createNewRowData = (obj) => {
    var newobj = {
      csUidText: null,
      id: 0,
      internalLid: 0,
      name: "",
      oldName: "",
      systemTag: null,
      tag: "",
      tagId: null,
      ptagId: 0,
      sTags: [],
      c: null,
      q: null,
      facts: {
        1196: {
          v: "",
          p: "",
          c: "",
          q: "",
          cid: 0,
          id: 0,
          documentId: null,
          a: {
            hid: null,
            hids: null,
            pagenumber: 0,
            BB: null,
            BBS: [],
          },
          modified: null,
          sValues: null,
          isCalculated: false,
          calculationFormula: null,
          isSumFromSplit: false,
          numericValue: null,
          convertedValue: null,
          asReportedValue: null,
          asReportedQuantum: null,
        },
        1201: {
          v: "",
          p: "",
          c: "",
          q: "",
          cid: 0,
          id: 0,
          documentId: null,
          a: {
            hid: null,
            hids: null,
            pagenumber: 0,
            BB: null,
            BBS: [],
          },
          modified: null,
          sValues: null,
          isCalculated: false,
          calculationFormula: null,
          isSumFromSplit: false,
          numericValue: null,
          convertedValue: null,
          asReportedValue: null,
          asReportedQuantum: null,
        },
      },
      filePath: [],
      newOrModified: "",
      lineItemId: 0,
      templateId: 0,
      lsMapId: 0,
      blockId: 101,
      blockName: "",
      blockChanged: false,
      isTotal: false,
      sBlocks: [],
      lineItemName: null,
      groupId: 0,
      appearedIn: null,
      isEssential: null,
      tagChanged: false,
      synonymsList: [],
      lAuditInfo: {
        hid: "",
        hids: null,
        pagenumber: 0,
        BB: [],
        BBS: [],
      },
      tableTypeId: 0,
      tableTypeName: null,
      subSetGroup: "",
      confidenceScore: null,
      divider: false,
      headerType: null,
      freeTextParagraph: null,
      matchWordsInParagraph: null,
      timeSeriesSource: null,
      isntaLinkage: false,
      source: "",
      isSplit: false,
      splitId: 0,
      isAdjusted: false,
      hasAdjusted: false,
      adjustTagId: 0,
      tableId: 0,
      isUserLineItem: false,
    };
    newobj["id"] = createId();
    newobj["name"] = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
    newobj.filePath = obj.filePath;
    newobj.filePath.pop();
    newobj.filePath.push(newobj["id"]);
    return newobj;
  };

  const [showModal, setShowModal] = useState(false);
  const [updateColTags, setUpdateColTags] = useState("");
  const handleTagValUpdate = (event) => {
    console.log(event);
    setUpdateColTags(event.target.value);
  };

  const updateSelectedTagCellsValue = () => {
    var cellRanges = gridref.current.api.getCellRanges() ;  
    if (cellRanges) {
      cellRanges.forEach(function (range) {
        var startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
 
        for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
          range.columns.forEach(function (column) {
            var rowModel = gridref.current.api.getModel();
            var rowNode = rowModel.getRow(rowIndex);
            rowNode.data.tag = updateColTags ;
            // console.log("this row node",rowNode) ;
          });
        }
      });
      gridref.current.api.refreshCells() ;
    }
    setShowModal(false);
  };
  const Modal = () => {
    return (
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-1 border-b border-solid border-slate-200 rounded-t">
                    <h6 className="text-base font-semibold">Modal Title</h6>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Box sx={{ minWidth: 720 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tag
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateColTags}
                          label="Age"
                          onChange={handleTagValUpdate}
                        >
                          {colTagList &&
                            colTagList.map((t) => {
                              return <MenuItem key={t} value={t}>{t}</MenuItem>;
                            })}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => updateSelectedTagCellsValue()}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  };
  const [colTagList, setColTagList] = useState([]);
  const getContextMenuItems = useCallback((params) => {
    var result = [
      {
        // custom item
        name: "+ Add Row Above",
        action: () => {
          var newRowData = createNewRowData(params.node.data);
          // console.log("oldRowData", params.node.rowIndex);
          gridref.current.api.applyTransaction({
            add: [newRowData],
            addIndex: params.node.rowIndex,
          });
        },
      },
      {
        // custom item
        name: "+ Add Row Below",
        action: () => {
          var newRowData = createNewRowData(params.node.data);
          // console.log("oldRowData", params.node.rowIndex);
          gridref.current.api.applyTransaction({
            add: [newRowData],
            addIndex: params.node.rowIndex + 1,
          });
        },
        cssClasses: ["redFont", "bold"],
      },
      {
        // custom item
        name: "- Delete Row",
        action: () => {
          // METHOD 1 : used applyTransation
          // gridref.current.api.applyTransaction({
          //   remove: gridref.current.api.getSelectedRows(),
          // });
          // console.log("gridapi", gridref.current.props.rowData) ;

          // METHOD 2 : updating ROW data state ;
          // console.log(params.node.data.id) ;
          var rdata = gridref.current.props.rowData.filter(
            (row) => row.id !== params.node.data.id
          );
          rdata.map((item) => {
            var fp = item.filePath;
            var itr = fp.indexOf(params.node.data.id);
            if (itr !== -1) fp.splice(itr, 1);
          });
          gridref.current.api.setRowData(rdata);
        },
        cssClasses: ["redFont", "bold"],
      },
      {
        // custom item
        name: " ^ Update Values",
        action: () => {
          var cellRanges = gridref.current.api.getCellRanges();
          if (cellRanges) {
            cellRanges.forEach(function (range) {
              var startRow = Math.min(
                range.startRow.rowIndex,
                range.endRow.rowIndex
              );
              var endRow = Math.max(
                range.startRow.rowIndex,
                range.endRow.rowIndex
              );
              var lst = [];
              for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                range.columns.forEach(function (column) {
                  var rowModel = gridref.current.api.getModel();
                  var rowNode = rowModel.getRow(rowIndex);
                  var value = gridref.current.api.getValue(column, rowNode);
                  if( ! lst.includes(value)) lst.push(value);
                });
              }
              setColTagList(lst);
            });
            setShowModal(true);
          }
        },
        cssClasses: ["redFont", "bold"],
      },
      "copy",
      "separator",
      "chartRange",
    ];
    return result;
  }, []);

  const getRowId = (params) => {
    console.log("params", params.data.id);
  };

  const addColumn = () => {
    const newCID = Math.floor(Math.random() * 90000) + 10000;
    const newColumn = {
      headerName: "New Column",
      field: newCID.toString(),
      editable: true,
      headerComponent: CustomHeader,
    };
    setHeaders([...gridref.current.props.columnDefs, newColumn]);
  };

  const getMainMenuItems = useCallback((params) => {
    var result = [
      {
        name: "Add Column > ",
        action: () => {
          addColumn();
        },
      },
      {
        name: "Rename ",
        action: () => {
          // TODO : start working from here : add feature to update columns header name;
          // console.log(params) ;
          setEditingHeaderId(params.column.getColId());
          // gridref.current.column.colDef.headerComponentParams = params.column.getColId() ;
          var col = gridref.current.columnApi.getColumn(
            params.column.colDef.headerName
          );
          col.colDef.headerName = "SEXY";
          gridref.current.api.refreshHeader();
        },
      },
      "copy",
      "separator",
      "chartRange",
    ];
    return result;
  }, []);

  const onCellEditingStopped = (event) => {
    setRowData(gridref.current.props.rowData);
  };

  // const onRangeSelectionChanged = (event) => {
  //   var cellRanges = gridref.current.api.getCellRanges();
  //   // console.log(cellRanges);
  // };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "95vh", width: "60vw" }}
    >
      {showModal ? <Modal /> : ""}
      <GridContext.Provider value={{ editingHeaderId, setEditingHeaderId }}>
        <AgGridReact
          ref={gridref}
          columnDefs={headers}
          rowData={rowData}
          treeData={true}
          getDataPath={getDataPath}
          defaultColDef={defaultColDef}
          groupDefaultExpanded={-1}
          autoGroupColumnDef={autoGroupColumnDef}
          getContextMenuItems={getContextMenuItems}
          // getRowId={getRowId}
          onCellEditingStopped={onCellEditingStopped}
          getMainMenuItems={getMainMenuItems}
          rowSelection={"multiple"}
          enableRangeSelection={true}
          // onRangeSelectionChanged={onRangeSelectionChanged}
        ></AgGridReact>
      </GridContext.Provider>
    </div>
  );
};
export default Table;
