import { Routes, Route } from "react-router-dom";
import Acceuil from './pages/Acceuil';
import Evens from './pages/Events';
import Prestataires from "./pages/Prestataires";
import DashBordPrestOff from "./pages/DashBordPrestOff"
import About from "./pages/About";
import Login from "./pages/Login";
import ListEvents from "./pages/ListEvents";
import ProfileDashBord from "./components/Dashbord/ProfiledashBord";
import ServicePrestation from "./components/Dashbord/ServicePrestation";
import ClientLike from "./components/Dashbord/ClientLike";
import Notif from "./components/Dashbord/Notif";
import HomeDashBord from "./components/Dashbord/HomeDashBord";
import { AuthProvider } from "./components/AuthProvider";


function App() {
  return (
    <div className="App">  
     
      
        <Routes>
          <Route path = '/' element ={<Acceuil />} />
          <Route path = '/events' element ={<Evens />} />
          <Route path = '/prestataires' element ={<Prestataires />} />
          <Route path = '/dashbordprest' element ={<DashBordPrestOff/>} />          
          <Route path = '/about' element ={<About />} />
          <Route path = '/login' element ={<Login/>}/>
          <Route path = '/listEvents' element ={<ListEvents/>}/>   
          <Route path = '/homeDashBord' element={<HomeDashBord />} />
          <Route path = '/profileDashBord' element={<ProfileDashBord />} />
          <Route path = '/servicePrestation' element= {<ServicePrestation />} />
          <Route path = '/notif' element = {<Notif />}/>
          <Route path = '/clientlike' element={<ClientLike />} />
        </Routes>

      


      
    </div>
  );
}

export default App;
