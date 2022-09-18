import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

import Dropdown from './Dropdown';
import Search from './Search';

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
        {/* <Search /> */}

        <Dropdown icon="fa-solid fa-gear" onClick>
          <button onClick={() => console.log('Theme Change')}>Theme</button>
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
