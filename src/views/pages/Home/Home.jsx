import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import FeatureCard from '../../components/FeatureCard/FeatureCard';

export default function Home() {
  const features = [
    {
      icon: 'TASK',
      title: 'ניהול משימות',
      text: 'ארגן את המשימות שלך ועקוב אחרי ההתקדמות בלמידה',
    },
    {
      icon: 'DOC',
      title: 'ספריית סיכומים',
      text: 'גש לסיכומים איכותיים בכל תחום',
    },
    {
      icon: 'TEAM',
      title: 'קהילת לומדים',
      text: 'התחבר לסטודנטים אחרים ושיתוף ידע וניסיון',
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.textBlock}>
            <h1>סיכומים מקצועיים וחומרי למידה מרוכזים במקום אחד</h1>
            <p>
              הצטרף לקהילת הלמידה של <strong>SmartStudy</strong> וקבל גישה לסיכומים איכותיים
              שנכתבו על ידי סטודנטים מהארץ ומהעולם.
            </p>
            <div className={styles.buttons}>
              <Link to="/signup" className={styles.primaryBtn}>התחל עכשיו</Link>
              <Link to="/summaries" className={styles.secondaryBtn}>צפייה בסיכומים</Link>
            </div>
          </div>

          <div className={styles.callToAction}>
            <Link to="/" className={styles.joinBtn}>HOME</Link>
            <p>הצטרף לקהילת הלמידה</p>
          </div>
        </section>

        <section className={styles.features}>
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
