import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Views/Home';
import Brewery from "./Views/Brewery";


function App() {

  return (
    <div>
      <Router>
          <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path="/detail/:id" element = { <Brewery/>} />
          

          
          </Routes>
      </Router>
    </div>
  );
}

export default App;
