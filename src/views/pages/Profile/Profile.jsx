import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [fullName, setFullName] = useState('');
  const [degree, setDegree] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [status, setStatus] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          setFullName(data.fullName || '');
          setDegree(data.degree || '');
          setStudyYear(data.studyYear || '');
          setStatus(data.status || '');
          setInterests(data.interests || '');
        }
      } else {
        if (window.location.hostname === 'localhost') {
          const demoData = {
            fullName: 'דנה ישראלי',
            degree: 'כלכלה',
            studyYear: 'שנה ב',
            status: 'סטודנט פעיל',
            interests: 'ניהול עסקים, טכנולוגיה',
            uploadedSummaries: 4,
            questions: 6,
            comments: 10,
            readSummaries: 9,
          };
          setUserData(demoData);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!auth.currentUser) return;

    const updatedData = {
      fullName,
      degree,
      studyYear,
      status,
      interests,
    };

    await updateDoc(doc(db, 'users', auth.currentUser.uid), updatedData);
    setUserData((prev) => ({ ...prev, ...updatedData }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFullName(userData.fullName || '');
    setDegree(userData.degree || '');
    setStudyYear(userData.studyYear || '');
    setStatus(userData.status || '');
    setInterests(userData.interests || '');
  };

  if (isLoading) return <p style={{ textAlign: 'center' }}>טוען פרופיל...</p>;
  if (!userData) return <p style={{ textAlign: 'center' }}>לא נמצא משתמש.</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileTop}>
        <div className={styles.avatar}>
          {userData.fullName?.charAt(0) || '?'}
        </div>
        {isEditing ? (
          <>
            <input
              className={styles.editField}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className={styles.subtitle}>סטודנט/ית</p>
            <div>
              <button className={styles.cancelBtn} onClick={handleCancel}>ביטול</button>
              <button className={styles.editBtn} onClick={handleSave}>שמור שינויים</button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.name}>{userData.fullName}</h2>
            <p className={styles.subtitle}>סטודנט/ית</p>
            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>עריכת פרופיל</button>
          </>
        )}
      </div>

      <div className={styles.cards}>
        {/* מידע אקדמי מימין */}
        <div className={`${styles.card} ${isEditing ? styles.highlightCard : ''}`}>
          <h3 className={styles.cardTitle}>מידע אקדמי</h3>
          {isEditing ? (
            <>
              <label className={styles.label}>
                תואר
                <input className={styles.editField} value={degree} onChange={(e) => setDegree(e.target.value)} />
              </label>

              <label className={styles.label}>
                שנת לימודים
                <select className={styles.editField} value={studyYear} onChange={(e) => setStudyYear(e.target.value)}>
                  <option value="שנה א">שנה א</option>
                  <option value="שנה ב">שנה ב</option>
                  <option value="שנה ג">שנה ג</option>
                  <option value="שנה ד">שנה ד</option>
                </select>
              </label>

              <label className={styles.label}>
                סטטוס
                <select className={styles.editField} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="סטודנט פעיל">סטודנט פעיל</option>
                  <option value="בחופשה">בחופשה</option>
                  <option value="סיים לימודים">סיים לימודים</option>
                </select>
              </label>

              <label className={styles.label}>
                תחומי התעניינות
                <textarea className={styles.editField} value={interests} onChange={(e) => setInterests(e.target.value)} />
              </label>
            </>
          ) : (
            <table className={styles.table}>
              <tbody>
                <tr><td>תואר</td><td>{userData.degree || '—'}</td></tr>
                <tr><td>שנת לימודים</td><td>{userData.studyYear || '—'}</td></tr>
                <tr><td>סטטוס</td><td>{userData.status || '—'}</td></tr>
                <tr><td>תחומי התעניינות</td><td>{userData.interests || '—'}</td></tr>
              </tbody>
            </table>
          )}
        </div>

        {/* סיכום פעילויות בשמאל */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>סיכום פעילויות</h3>
          <ul className={styles.activityList}>
            <li>📄 סיכומים שהעליתי: <span>{userData.uploadedSummaries || 0}</span></li>
            <li>❓ שאלות שנשאלו בפורום: <span>{userData.questions || 0}</span></li>
            <li>💬 תגובות שכתבתי: <span>{userData.comments || 0}</span></li>
            <li>📚 סיכומים שקראתי: <span>{userData.readSummaries || 0}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
