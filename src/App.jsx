import DashBoard from "./component/dashboard/index"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Globe from "./component/Globe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/globe' element={ <Globe/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
