import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const fullName = snap.data().fullName || '';
          const firstName = fullName.split(' ')[0];
          setUserName(firstName);
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserName('');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className={styles.navBar}>
      <nav className={styles.navWrapper}>
        <ul className={styles.navList}>
          <li><Link to="/">דף הבית</Link></li>
          <li><Link to="/login">התחברות</Link></li>
          <li><Link to="/signup">הרשמה</Link></li>
          <li><Link to="/tasks">משימות</Link></li>
          <li><Link to="/summaries">סיכומים</Link></li>
          <li><Link to="/community">הקהילה</Link></li>
          <li><Link to="/profile">פרופיל אישי</Link></li>
          <li><Link to="/help">עזרה</Link></li>
          <li><Link to="/settings">הגדרות</Link></li>
          <li><Link to="/admin">אדמין</Link></li>
        </ul>

        {isLoggedIn && (
          <div className={styles.userSection}>
            <span className={styles.userText}>שלום {userName} 👋</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>התנתקות</button>
          </div>
        )}
      </nav>
    </header>
  );
}
