import { Link } from "react-router-dom";

export default function Nav() {

  return (
    <nav>
      <div><Link to="/">Title Page</Link></div>
      <div><Link to="/land_surveying">Land Surveying</Link></div>
      <div><Link to="/covering_letter">Covering Letter</Link></div>
      <div><Link to="/cv">CV</Link></div>
    </nav>
  )

}

