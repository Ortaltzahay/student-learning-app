import styles from './Login.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('התחברת בהצלחה!');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          התחברות ל־<span className={styles.brand}>SmartStudy</span>
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            דואר אלקטרוני
            <input
              type="email"
              name="email"
              placeholder="הזן את הדואר האלקטרוני שלך"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            סיסמה
            <input
              type="password"
              name="password"
              placeholder="הזן את הסיסמה שלך"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">התחברות</button>
        </form>

        <div className={styles.links}>
          <a href="#">שכחת סיסמה?</a>
          <p>
            עדיין אין לך חשבון? <Link to="/signup">הירשם עכשיו</Link>
          </p>
          <Link to="/" className={styles.backLink}>← חזור לדף הבית</Link>
        </div>
      </div>
    </div>
  );
}
