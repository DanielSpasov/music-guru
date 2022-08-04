import styles from './Loader.module.css';

function Loader() {
  return (
    <>
      <div className={styles.backgroundDim}></div>
      <div className={styles.spinnerDiv}>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
