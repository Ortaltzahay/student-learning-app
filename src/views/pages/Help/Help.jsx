import styles from "./Help.module.css";
import { useState } from "react";

export default function Help() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReportForm, setShowReportForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [reportText, setReportText] = useState("");
  const [messageData, setMessageData] = useState({ name: "", email: "", message: "" });

  const helpData = {
    tasks: [
      { question: "איך ליצור משימה חדשה?", answer: "גש ללוח המשימות, לחץ על 'הוסף משימה', מלא את הפרטים ובחר תאריך יעד." },
      { question: "איך לעדכן סטטוס משימה?", answer: "לחץ על המשימה ובחר את הסטטוס בין 'בתכנון', 'בתהליך' או 'הושלם'." },
      { question: "איך להעלות סיכום?", answer: "במסך הסיכומים, לחץ על 'העלה סיכום', בחר קובץ, הוסף כותרת והעלה." }
    ],
    community: [
      { question: "איך לחפש סטודנטים?", answer: "במסך הקהילה, השתמש בתגיות או בחיפוש חופשי כדי למצוא סטודנטים בתחום הרלוונטי." },
      { question: "איך לשאול שאלה בפורום?", answer: "גש לפורום, בחר את הקטגוריה המתאימה, כתוב את השאלה והוסף תגיות לשיתוף." },
      { question: "איך להצטרף לקהילת קורס מסוימת?", answer: "היכנס למסך הקהילה, חפש את הקורס והצטרף דרך כפתור 'הצטרף לקהילה'." },
      { question: "איך לשלוח הודעה לסטודנט אחר?", answer: "מצא את הסטודנט ברשימת הקהילה ולחץ על 'שלח הודעה'." }
    ],
    profile: [
      { question: "איך לנהל פרופיל?", answer: "בפרופיל אישי, תוכל לערוך תמונה, תגיות, ומידע אקדמי." },
      { question: "איך לשנות סיסמה או כתובת דוא\"ל?", answer: "גש להגדרות בפרופיל שלך ובחר באפשרות 'ערוך פרטים אישיים'." },
      { question: "איך להוסיף קורסים שנלמדים לפרופיל?", answer: "גש לעריכת פרופיל, חפש את רשימת הקורסים וסמן את אלו שאתה לומד." }
    ]
  };

  const getFilteredData = () => {
    let allData = [];
    if (activeCategory === "all") {
      allData = [...helpData.tasks, ...helpData.community, ...helpData.profile];
    } else {
      allData = helpData[activeCategory] || [];
    }
    if (searchQuery.trim()) {
      return allData.filter(item =>
        item.question.includes(searchQuery) || item.answer.includes(searchQuery)
      );
    }
    return allData;
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    alert("תודה! הדיווח נשלח: " + reportText);
    setReportText("");
    setShowReportForm(false);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    alert("תודה! הפנייה נשלחה:\n" + JSON.stringify(messageData, null, 2));
    setMessageData({ name: "", email: "", message: "" });
    setShowMessageForm(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>מרכז עזרה</h1>
      <input
        type="text"
        placeholder="חפש שאלה או נושא..."
        className={styles.search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className={styles.tags}>
        <button onClick={() => setActiveCategory("profile")} className={activeCategory === "profile" ? styles.active : ""}>פרופיל</button>
        <button onClick={() => setActiveCategory("community")} className={activeCategory === "community" ? styles.active : ""}>קהילה</button>
        <button onClick={() => setActiveCategory("tasks")} className={activeCategory === "tasks" ? styles.active : ""}>משימות</button>
        <button onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? styles.active : ""}>כללי</button>
      </div>

      <div className={styles.sections}>        
        {Object.entries(helpData).map(([key, group]) => {
          if (activeCategory !== "all" && activeCategory !== key) return null;
          const filteredGroup = group.filter(item =>
            item.question.includes(searchQuery) || item.answer.includes(searchQuery)
          );
          if (filteredGroup.length === 0) return null;
          const title = key === "tasks" ? "משימות ולמידה" : key === "community" ? "קהילה ושיתוף" : "פרופיל אישי";
          return (
            <div key={key} className={styles.section}>
              <h2 className={styles.sectionTitle}>{title} – שאלות נפוצות</h2>
              <ul className={styles.faqList}>
                {filteredGroup.map((item, index) => (
                  <li key={index} className={styles.faqItem}>
                    <strong>{item.question}</strong>
                    <p>{item.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={styles.footerBox}>
        <h3>צריך עזרה נוספת?</h3>
        <p>אם לא מצאת את מה שחיפשת, אנחנו כאן לעזור</p>
        <div className={styles.actions}>
          <button className={styles.report} onClick={() => setShowReportForm(!showReportForm)}>דווח על בעיה</button>
          <button className={styles.message} onClick={() => setShowMessageForm(!showMessageForm)}>פנה לצוות התמיכה</button>
        </div>

        {showReportForm && (
          <form onSubmit={handleSubmitReport} className={styles.formBox}>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="פרט את הבעיה..."
              required
            ></textarea>
            <button type="submit">שלח</button>
          </form>
        )}

        {showMessageForm && (
          <form onSubmit={handleSubmitMessage} className={styles.formBox}>
            <input
              type="text"
              placeholder="שם מלא"
              value={messageData.name}
              onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="אימייל"
              value={messageData.email}
              onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
              required
            />
            <textarea
              placeholder="תוכן ההודעה"
              value={messageData.message}
              onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
              required
            ></textarea>
            <button type="submit">שלח</button>
          </form>
        )}
      </div>
    </div>
  );
}