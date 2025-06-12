import styles from "./Summaries.module.css";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function Summaries() {
  const [summaries, setSummaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [sortOption, setSortOption] = useState("הכי מדורגים");

  const [formData, setFormData] = useState({
    title: "",
    category: "כללי",
    file: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    const fetchSummaries = async () => {
      const snap = await getDocs(collection(db, "summaries"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSummaries(data);
    };
    fetchSummaries();
  }, []);

  const handleUpload = async () => {
    if (!formData.title || !formData.file) {
      alert("יש למלא את כל השדות");
      return;
    }

    try {
      const storageRef = ref(storage, `summaries/${formData.file.name}`);
      await uploadBytes(storageRef, formData.file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "summaries"), {
        title: formData.title,
        category: formData.category,
        url: downloadURL,
        uploadedAt: serverTimestamp(),
        author: user?.displayName || "משתמש אנונימי",
        userId: user?.uid || null,
        rating: 0,
      });

      alert("הסיכום נוסף בהצלחה 🎉");
      setFormData({ title: "", category: "כללי", file: null });
      setShowForm(false);
    } catch (err) {
      alert("שגיאה בהעלאה ❌");
      console.error(err);
    }
  };

  const filteredSummaries = summaries
    .filter((s) => {
      const matchesTitle = s.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "הכל" || s.category === selectedCategory;
      return matchesTitle && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "הכי מדורגים") {
        return b.rating - a.rating;
      } else if (sortOption === "הכי חדשים") {
        const dateA = a.uploadedAt?.toDate?.() || new Date(0);
        const dateB = b.uploadedAt?.toDate?.() || new Date(0);
        return dateB - dateA; 
      }
      return 0;
    });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>סיכומים לפי קורסים</h1>
      <p className={styles.subtitle}>כל הסיכומים במקום אחד – מאורגנים לפי קורסים ונושאים</p>

      <div className={styles.card}>
        <div className={styles.controls}>
          <button onClick={() => setShowForm(true)} className={styles.addBtn}>
            + הוסף סיכום
          </button>
          <input
            type="text"
            placeholder="חיפוש לפי שם..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            className={styles.selectBox}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>הכי מדורגים</option>
            <option>הכי חדשים</option>
          </select>
        </div>

        <div className={styles.categories}>
          {["הכל", "היסטוריה", "כלכלה", "משפטים"].map((cat) => (
            <button
              key={cat}
              className={`${styles.category} ${
                selectedCategory === cat ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className={styles.uploadModal}>
          <h3>העלאת סיכום</h3>
          <input
            type="text"
            placeholder="שם הסיכום"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option>כלכלה</option>
            <option>משפטים</option>
            <option>היסטוריה</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
          />
          <div className={styles.modalActions}>
            <button onClick={handleUpload}>העלה</button>
            <button onClick={() => setShowForm(false)}>ביטול</button>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>שם הסיכום</th>
              <th>מחבר/ת</th>
              <th>תאריך</th>
              <th>דירוג</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummaries.map((s) => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.author}</td>
                <td>{s.uploadedAt?.toDate().toLocaleDateString("he-IL")}</td>
                <td>★★★★★</td>
                <td>
                  <a href={s.url} target="_blank" rel="noreferrer">צפייה</a> |{" "}
                  <a href={s.url} download>הורדה</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
