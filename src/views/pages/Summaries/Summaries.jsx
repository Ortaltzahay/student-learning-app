import styles from "./Summaries.module.css";
import { Link } from "react-router-dom";

export default function Summaries() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>סיכומים לפי קורסים</h1>
      <p className={styles.subtitle}>
        כל הסיכומים במקום אחד – מאורגנים לפי קורסים ונושאים
      </p>

      <div className={styles.card}>
        <div className={styles.controls}>
          <button className={styles.addBtn}>+ הוסף סיכום</button>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="חיפוש לפי קורס, נושא או מחבר..."
          />

          <select className={styles.selectBox}>
            <option>סינון</option>
            <option>הכי חדשים</option>
            <option>הכי מדורגים</option>
          </select>

          <select className={styles.selectBox}>
            <option>ייצוא</option>
            <option>ייבוא</option>
          </select>
        </div>

        <div className={styles.categories}>
          <button className={`${styles.category} ${styles.active}`}>כללי</button>
          <button className={styles.category}>מדעי המחשב</button>
          <button className={styles.category}>סוציולוגיה</button>
          <button className={styles.category}>מתמטיקה</button>
          <button className={styles.category}>סטטיסטיקה</button>
          <button className={styles.category}>פסיכולוגיה</button>
        </div>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>שם הסיכום</th>
              <th>מחבר/ת</th>
              <th>תאריך העלאה</th>
              <th>דירוג</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => alert("מעבר לעמוד סיכום – מבוא לפסיכולוגיה")}>
              <td>מבוא לפסיכולוגיה</td>
              <td>דניאל כהן</td>
              <td>25/02/2025</td>
              <td>★★★★★</td>
            </tr>
            <tr onClick={() => alert("מעבר לעמוד סיכום – סטטיסטיקה")}>
              <td>סטטיסטיקה</td>
              <td>רונית לוי</td>
              <td>22/02/2025</td>
              <td>★★★★</td>
            </tr>
            <tr onClick={() => alert("מעבר לעמוד סיכום – מבוא למתמטיקה")}>
              <td>מבוא למתמטיקה</td>
              <td>יעקב רון</td>
              <td>20/02/2025</td>
              <td>★★★★</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
