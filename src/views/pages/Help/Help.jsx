import styles from "./Help.module.css";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>מרכז עזרה</h1>

      <input
        type="text"
        placeholder="חפש שאלה או נושא..."
        className={styles.search}
      />

      <div className={styles.tags}>
        <Link to="/help/profile"><button>פרופיל</button></Link>
        <Link to="/help/community"><button>קהילה</button></Link>
        <Link to="/help/tasks"><button>משימות</button></Link>
        <Link to="/help"><button className={styles.active}>כללי</button></Link>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>משימות ולמידה – שאלות נפוצות</h2>
          <ul className={styles.faqList}>
            <li className={styles.faqItem}>
              <strong>איך ליצור משימה חדשה?</strong>
              <p>גש ללוח המשימות, לחץ על "הוסף משימה", מלא את הפרטים ובחר תאריך יעד.</p>
            </li>
            <li className={styles.faqItem}>
              <strong>איך לעדכן סטטוס משימה?</strong>
              <p>לחץ על המשימה ובחר את הסטטוס בין "בתכנון", "בתהליך" או "הושלם".</p>
            </li>
            <li className={styles.faqItem}>
              <strong>איך להעלות סיכום?</strong>
              <p>במסך הסיכומים, לחץ על "העלה סיכום", בחר קובץ, הוסף כותרת והעלה.</p>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>קהילה ושיתוף – שאלות נפוצות</h2>
          <ul className={styles.faqList}>
            <li className={styles.faqItem}>
              <strong>איך לחפש סטודנטים?</strong>
              <p>במסך הקהילה, השתמש בתגיות או בחיפוש חופשי כדי למצוא סטודנטים בתחום הרלוונטי.</p>
            </li>
            <li className={styles.faqItem}>
              <strong>איך לשאול שאלה בפורום?</strong>
              <p>גש לפורום, בחר את הקטגוריה המתאימה, כתוב את השאלה והוסף תגיות לשיתוף.</p>
            </li>
            <li className={styles.faqItem}>
              <strong>איך לנהל פרופיל?</strong>
              <p>בפרופיל אישי, תוכל לערוך תמונה, תגיות, ומידע אקדמי.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBox}>
        <h3>צריך עזרה נוספת?</h3>
        <p>אם לא מצאת את מה שחיפשת, אנחנו כאן לעזור</p>
        <div className={styles.actions}>
          <button className={styles.report}>דווח על בעיה</button>
          <button className={styles.message}>שלח הודעה</button>
        </div>
      </div>
    </div>
  );
}
