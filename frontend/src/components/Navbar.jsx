import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to='/'><span>Speak</span>tacular</Link>
      <ul>
        <Link to='/'>Statistics</Link>
      </ul>
      <ul>
        <Link to='/'>Register</Link>
        <Link to='/'>Login</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
