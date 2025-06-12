import styles from './Signup.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('הסיסמאות לא תואמות!');
      return;
    }

    try {
      // יצירת משתמש חדש
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // שמירת נתונים נוספים במסד הנתונים
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date(),
      });

      alert('נרשמת בהצלחה!');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('כתובת האימייל כבר בשימוש.');
      } else {
        alert('אירעה שגיאה. אנא נסה שוב.');
      }
    }
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
