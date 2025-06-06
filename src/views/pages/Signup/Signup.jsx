import styles from './Signup.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('הסיסמאות לא תואמות!');
      return;
    }
    alert('נרשמת בהצלחה 🎉');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          הצטרף ל־<span className={styles.brand}>SmartStudy</span>
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            שם מלא
            <input
              type="text"
              name="fullName"
              placeholder="הכנס את שמך המלא"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            דוא״ל אלקטרוני
            <input
              type="email"
              name="email"
              placeholder="example@domain.com"
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
              placeholder="בחר סיסמה חזקה"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ווידוי סיסמה
            <input
              type="password"
              name="confirmPassword"
              placeholder="הכנס שוב את הסיסמה"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          <p className={styles.note}>
            הסיסמה צריכה להכיל לפחות 8 תווים, אות גדולה, מספר ותו מיוחד
          </p>

          <button type="submit">הרשמה</button>
        </form>

        <p className={styles.bottomText}>
          כבר יש לך חשבון? <Link to="/login">התחבר כאן</Link>
        </p>
        <a href="#" className={styles.privacy}>
          מדיניות פרטיות
        </a>
      </div>
    </div>
  );
}
