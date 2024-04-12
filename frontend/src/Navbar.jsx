import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <>
        <nav>
            <ul>
                <li style={{border: "1px solid #000", padding: "5px"}}><Link to="/">Route : /</Link></li>
                <li style={{border: "1px solid #000", padding: "5px"}}><Link to="/login">Route : /login</Link></li>
                <li style={{border: "1px solid #000", padding: "5px"}}><Link to="/profile">Route : /profile</Link></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar