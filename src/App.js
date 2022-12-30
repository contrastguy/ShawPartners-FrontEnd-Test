import { Route, Router, Routes, useNavigate } from "react-router";
import UserList from "./Components/App/Main/App";
import UserDetails from "./Components/App/Details/details";

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route exact path="/" element={<UserList />} />
      <Route exact path={"/users/" + localStorage.getItem("LOGIN")} element={<UserDetails />} />
    </Routes>
  );
}

export default App;
