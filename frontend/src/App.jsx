import { Route , Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {

  return (
    <>
       <Routes>
        <Route path="/" element= {<HomePage/>}/>
        <Route path="/LoginPage" element= {<LoginPage/>}/>
        <Route path="/SignUpPage" element= {<SignUpPage/>}/>
        <Route path="/transaction/:id" element= {<TransactionPage/>}/>
        <Route path="*" element= {<NotFoundPage/>}/>
       </Routes>
    </>
  );
}

export default App;
