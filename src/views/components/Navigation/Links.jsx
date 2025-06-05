import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Links.module.css';

function Links() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/login">התחברות</Link></li>
        <li><Link to="/signup">הרשמה</Link></li>
        <li><Link to="/tasks">משימות</Link></li>
        <li><Link to="/summaries">סיכומים</Link></li>
        <li><Link to="/community">קהילה</Link></li>
        <li><Link to="/profile">פרופיל אישי</Link></li>
        <li><Link to="/help">עזרה</Link></li>
        <li><Link to="/settings">הגדרות</Link></li>
        <li><Link to="/admin">אדמין</Link></li>
      </ul>
    </nav>
  );
}

export default Links;
