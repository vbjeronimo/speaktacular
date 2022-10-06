import { Link } from "react-router-dom";

import styles from '../css/Navbar.module.css';

const Navbar = ({ user }) => {
  return (
    <nav className={styles.Navbar}>
      <Link to='/' className={styles.Logo}><span>Speak</span>tacular</Link>
      <ul>
        <Link to='/' className={styles.Link}>About</Link>
        <Link to='/' className={styles.Link}>Contact Us</Link>
        <Link to='/' className={styles.Link}>Statistics</Link>
      </ul>
      <ul>
        {user.isAuthenticated 
          ?
          <>
            <Link to='/' className={styles.Link}>Account</Link>
            <Link to='/' className={styles.Link}>Logout</Link>
          </>
          :
          <>
            <Link to='/' className={styles.Link}>Register</Link>
            <Link to='/' className={styles.Link}>Login</Link>
          </>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
