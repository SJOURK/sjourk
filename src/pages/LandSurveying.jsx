import { Link } from "react-router-dom"

function LandSurveying() {

  return (
    <div>
      <div><Link to="/lsintroduction">Land Surveying - Introduction</Link></div>
      <div><Link to="/datum">Datum</Link></div>
      <div><Link to="/geographiccoordinates">Geographic Coordinates</Link></div>
      <div><Link to="/cartography">Cartography</Link></div>
      <div><Link to="/articles/article_photogrammetry">Photogrammetry</Link></div>
      <div><Link to="/levelling">Levelling</Link></div>
      <div><Link to="/surveyinginstruments">Surveying Instruments</Link></div>
      <div><Link to="/gps">GPS</Link></div>
      <div><Link to="/gis">GIS</Link></div>
      <div><Link to="/geoinformatics">Geoinformatics</Link></div>
      <div><Link to="/modelling">3D Modelling</Link></div>
      <div><Link to="/propertyvaluation">Property Valuation</Link></div>
    </div>
  )

}

export default LandSurveying

