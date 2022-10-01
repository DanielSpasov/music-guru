import styles from './styles.module.css';

export default function Loader() {
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
