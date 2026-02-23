import { Route, Routes } from "react-router-dom"
import Articles from "./pages/Articles"
import Nav from "./Components/Nav"
import Home from "./pages/Home"
import LandSurveying from "./pages/LandSurveying"
import CoveringLetter from "./pages/CoveringLetter"
import CV from "./pages/CV"
import LSIntroduction from "./LandSurveying/LSIntroduction"
import Datum from "./LandSurveying/Datum"
import GeographicCoordinates from "./LandSurveying/GeographicCoordinates"
import Cartography from "./LandSurveying/Cartography"
import Photogrammetry from "./LandSurveying/Photogrammetry"
import Levelling from "./LandSurveying/Levelling"
import SurveyingInstruments from "./LandSurveying/SurveyingInstruments"
import GPS from "./LandSurveying/GPS"
import GIS from "./LandSurveying/GIS"
import Geoinformatics from "./LandSurveying/Geoinformatics"
import Modelling from "./LandSurveying/Modelling"
import PropertyValuation from "./LandSurveying/PropertyValuation"


function App() {

  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/articles/*" element={<Articles />}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/land_surveying" element={<LandSurveying></LandSurveying>}></Route>
        <Route path="/covering_letter" element={<CoveringLetter></CoveringLetter>}></Route>
        <Route path="/cv" element={<CV></CV>}></Route>
        <Route path="/land_surveying_introduction" element={<LSIntroduction></LSIntroduction>}></Route>
        <Route path="/Datum" element={<Datum></Datum>}></Route>
        <Route path="/GeographicCoordinates" element={<GeographicCoordinates></GeographicCoordinates>}></Route>
        <Route path="/Cartography" element={<Cartography></Cartography>}></Route>
        <Route path="/Photogrammetry" element={<Photogrammetry></Photogrammetry>}></Route>
        <Route path="/Levelling" element={<Levelling></Levelling>}></Route>
        <Route path="/SurveyingInstruments" element={<SurveyingInstruments></SurveyingInstruments>}></Route>
        <Route path="/GPS" element={<GPS></GPS>}></Route>
        <Route path="/GIS" element={<GIS></GIS>}></Route>
        <Route path="/Geoinformatics" element={<Geoinformatics></Geoinformatics>}></Route>
        <Route path="/Modelling" element={<Modelling></Modelling>}></Route>
        <Route path="/PropertyValuation" element={<PropertyValuation></PropertyValuation>}></Route>
      </Routes>
    </div >)

}

export default App
