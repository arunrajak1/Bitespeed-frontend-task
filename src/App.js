import React from "react"; 

import DnDFlow from "./Components/DnDFlow/DnDFlow";
import './App.css';

const App = () => {
  // const error = useSelector((state) => state.error);
  // const dispatch = useDispatch();

  // const handleSaveFlow = () => {
  //   dispatch(saveFlow());
  // };

  return (
  <div style={{width:'100%',height:'100vh'}}>
    <DnDFlow/>
  </div>

  );
};

export default App;
