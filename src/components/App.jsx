import React from "react";
import { BrowserRouter as Router, Routes, Route}
    from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main";
import {IdProvider} from "./IdContext";

function App() {
  return(
    <IdProvider>
     <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Login type="register" />}/>
          <Route path="/login" element={<Login type="login"/>}/>
       </Routes>
    </Router>
    </IdProvider>
  );
}
 

export default App;
