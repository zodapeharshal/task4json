import React, { Component, useState } from "react";
export const GridContext = React.createContext({
  // const [editingHeaderId, setEditingHeaderId] = useState(null) ;
  editingHeaderId: undefined,
  setEditingHeaderId : (id) => {},
});
