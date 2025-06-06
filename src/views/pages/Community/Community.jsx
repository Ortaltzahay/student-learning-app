import styles from "./Community.module.css";
import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>קהילת שיתוף לימוד</h1>
      <p className={styles.subtitle}>תוצאות חיפוש לנושא: כלכלה</p>

      <input
        className={styles.searchBar}
        type="text"
        placeholder="חיפוש לפי נושא, שאלה או נושא לימודי"
      />

      <div className={styles.layout}>
        {/* אזור תוכן קהילתי */}
        <div className={styles.communityArea}>
          <div className={styles.communityCard}>
            <h2 className={styles.communityName}>קהילת כלכלה</h2>
            <ul className={styles.communityInfo}>
              <li>⚙️ 132 חברים</li>
              <li>📚 18 פורומים פעילים</li>
              <li>🗓️ הוקמה: 2023</li>
              <li>👤 מנהל: יעל דגן</li>
            </ul>

            <div className={styles.hotQuestions}>
              <h4>שאלות חמות:</h4>
              <ul>
                <li><Link to="#">מה ההבדל בין מיקרו למאקרו?</Link></li>
                <li><Link to="#">האם כדאי ללמוד ניתוח שווקים?</Link></li>
                <li><Link to="#">איך מחשבים אינפלציה?</Link></li>
              </ul>
            </div>

            <button className={styles.joinBtn}>הצטרף לקהילת כלכלה</button>
          </div>

          <div className={styles.forumTable}>
            <h4>פורומים בתחום:</h4>
            <ul>
              <li><Link to="#">פורום שוק ההון</Link></li>
              <li><Link to="#">פורום כלכלת ישראל</Link></li>
              <li><Link to="#">פורום תורת המשחקים</Link></li>
              <li><Link to="#">פורום תכנון כלכלי</Link></li>
            </ul>
          </div>

          <div className={styles.faqBox}>
            <h4>שאלות נפוצות בנושא:</h4>
            <ul>
              <li><Link to="#">מהם שלושת עקרונות הכלכלה?</Link></li>
              <li><Link to="#">כיצד משפיעה ריבית על שוק העבודה?</Link></li>
              <li><Link to="#">איך מתחילים ללמוד כלכלה?</Link></li>
            </ul>
          </div>
        </div>

        {/* אזור חברים */}
        <div className={styles.membersColumn}>
          <h4>חברי הקהילה:</h4>
          <div className={styles.memberList}>
            {[
              { name: "נועה כהן", uni: "אוניברסיטת ת״א", avatar: "נח" },
              { name: "אור בן חיים", uni: "אוניברסיטת חיפה", avatar: "אור" },
              { name: "רון ברק", uni: "בר אילן", avatar: "רב" },
            ].map((user, i) => (
              <div className={styles.memberCard} key={i}>
                <div className={styles.avatar}>{user.avatar}</div>
                <div className={styles.details}>
                  <h3>{user.name}</h3>
                  <p>{user.uni}</p>
                  <div className={styles.cardButtons}>
                    <Link to="#" className={styles.primary}>שלח הודעה</Link>
                    <Link to="#" className={styles.secondary}>צפה בפרופיל</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
