import { Link } from "react-router-dom"

function Home() {

  return (
    <div>
      <h1>Skrypty do nauki języka angielskiego dla studentów</h1>
      <h2>Studium Języków Obcych Uniwersytetu Rolniczego w Krakowie</h2>
      <div className="table-of-contents"><h3>Contents</h3>
        <div><Link to="/land_surveying">Land Surveying</Link></div>
        <div><Link to="/covering_letter">Covering Letter</Link></div>
        <div><Link to="/cv">CV</Link></div>
      </div>
    </div>
  )

}

export default Home