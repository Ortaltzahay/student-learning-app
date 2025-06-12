import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { auth, db } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fullName = docSnap.data().fullName;
          const firstName = fullName.split(' ')[0];
          setUserName(firstName);
        }
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

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
            {userName && <p className={styles.welcome}>שלום {userName} 👋!</p>}
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
