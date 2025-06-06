import styles from './Profile.module.css';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileTop}>
        <div className={styles.avatar}>ש</div>
        <h2 className={styles.name}>שם המשתמש</h2>
        <p className={styles.subtitle}>סטודנט/ית</p>
        <button className={styles.editBtn}>עריכת פרופיל</button>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>מידע אקדמי</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>תואר</td>
                <td>תואר ראשון בכלכלה</td>
              </tr>
              <tr>
                <td>שנת לימודים</td>
                <td>שנה ב׳</td>
              </tr>
              <tr>
                <td>סטטוס</td>
                <td>סטודנט פעיל</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.courses}>
            <p>קורסים נרשמים:</p>
            <ul>
              <li><Link to="#">מיקרו כלכלה</Link></li>
              <li><Link to="#">סטטיסטיקה</Link></li>
              <li><Link to="#">חשבונאות</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>סיכום פעילויות</h3>
          <ul className={styles.activityList}>
            <li><input type="checkbox" /> סיכומים שהעלתי <span>5 סיכומים</span></li>
            <li><input type="checkbox" /> שאלות שנשאלו בפורום <span>12 שאלות</span></li>
            <li><input type="checkbox" /> תגובות שכתבתי <span>24 תגובות</span></li>
            <li><input type="checkbox" /> סיכומים שקראתי <span>15 סיכומים</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
