import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoNav}>
        <NavLink to="/">
          <img
            height="60px"
            src="images/logo/blue-logo192.png"
            alt="Music Nerd"
          />
        </NavLink>
      </div>

      <div className={styles.mainNav}>
        <NavLink to="artists">Artists</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <NavLink to="mixtapes">Mixtapes</NavLink>
        <NavLink to="singles">Singles</NavLink>
      </div>

      <div className={styles.userNav}>
        <div>Search</div>
        <div>
          <i className="fa-solid fa-gear"></i>
          <div>content</div>
        </div>
        <div>
          User
          <div>content</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
