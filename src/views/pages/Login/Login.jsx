import styles from './Login.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ניסיון התחברות
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('התחברת בהצלחה!');
      navigate('/'); // לאחר ההתחברות – מעבר לדף הבית
    } catch (error) {
      console.error('שגיאת התחברות:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('המשתמש לא נמצא. ודא שכתובת הדוא"ל נכונה.');
          break;
        case 'auth/wrong-password':
          alert('סיסמה שגויה.');
          break;
        case 'auth/invalid-email':
          alert('כתובת אימייל לא חוקית.');
          break;
        default:
          alert('אירעה שגיאה. נסה שוב.');
      }
    }
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
