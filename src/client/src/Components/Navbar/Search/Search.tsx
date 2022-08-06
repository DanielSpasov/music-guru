import styles from './Search.module.css';

function Search() {
  return (
    <article className={styles.searchBox}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input type="text" placeholder="Search..." />
    </article>
  );
}

export default Search;
