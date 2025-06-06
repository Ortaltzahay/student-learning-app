import styles from './Tasks.module.css';

export default function Tasks() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>לוח המשימות שלי</h1>
      <p className={styles.subtitle}>נהל את המשימות הלימודיות שלך במקום אחד</p>

      <div className={styles.controls}>
        <button className={styles.addBtn}>+ הוסף משימה</button>

        <div className={styles.filters}>
          <button className={styles.filter}>הכל</button>
          <button className={styles.filter}>בהמתנה</button>
          <button className={styles.filter}>בתהליך</button>
          <button className={styles.filter}>בוצע</button>
        </div>

        <div className={styles.sorting}>
          <select>
            <option>ייבוא</option>
            <option>ייצוא</option>
          </select>
          <input type="date" defaultValue="2025-12-30" />
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>סטטוס</th>
            <th>שם משימה</th>
            <th>קורס</th>
            <th>תאריך יעד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className={`${styles.status} ${styles.inProgress}`}>בתהליך</span></td>
            <td className={styles.taskName}>להכין פרק 3</td>
            <td>מבוא לפסיכולוגיה</td>
            <td>30/12/2025</td>
            <td className={styles.actions}>
              <button className={styles.edit}>ערוך</button>
              <button className={styles.delete}>מחק</button>
            </td>
          </tr>
          <tr>
            <td><span className={`${styles.status} ${styles.inProgressYellow}`}>בביצוע</span></td>
            <td className={styles.taskName}>להגיש עבודה</td>
            <td>סטטיסטיקה</td>
            <td>30/12/2025</td>
            <td className={styles.actions}>
              <button className={styles.edit}>ערוך</button>
              <button className={styles.delete}>מחק</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
