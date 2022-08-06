import { NavLink } from 'react-router-dom';

import Dropdown from './Dropdown';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <section className={styles.logoNav}>
        <NavLink to="/">
          <img src="images/logo/blue-logo192.png" alt="Music Nerd" />
        </NavLink>
      </section>

      <section className={styles.mainNav}>
        <NavLink to="artists">Artists</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <NavLink to="mixtapes">Mixtapes</NavLink>
        <NavLink to="singles">Singles</NavLink>
      </section>

      <section className={styles.userNav}>
        <article>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </article>

        <Dropdown icon="fa-solid fa-gear" onClick>
          <button>Theme</button>
        </Dropdown>

        <Dropdown icon="fa-solid fa-user" onClick disableAnimations>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="sign-in">Sign In</NavLink>
          <NavLink to="sign-up">Sign Up</NavLink>
          <NavLink to="sign-out">Sign Out</NavLink>
        </Dropdown>
      </section>
    </nav>
  );
}

export default Navbar;
