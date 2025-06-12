import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('הכל');
  const [userId, setUserId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    status: 'בהמתנה',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const snapshot = await getDocs(collection(db, 'tasks'));
        const filtered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((task) => task.userId === user.uid);
        setTasks(filtered);
      } else {
        setUserId(null);
        setTasks([
          {
            id: 'demo1',
            title: 'לסיים תקציר',
            course: 'מבוא לשיווק',
            dueDate: '2025-06-28',
            status: 'בהמתנה',
          },
          {
            id: 'demo2',
            title: 'להגיש עבודה',
            course: 'סטטיסטיקה',
            dueDate: '2025-06-26',
            status: 'בתהליך',
          },
        ]);
      }
    });
    return () => unsubscribe();
  }, []);

  const formatDateHebrew = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}.${m}.${y}`;
  };

  const daysRemaining = (dueDate) => {
    const diff = (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(diff));
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      course: '',
      dueDate: '',
      status: 'בהמתנה',
    });
  };

  const handleAddTask = async () => {
    if (!formData.title || !formData.course || !formData.dueDate) return;
    const newTask = { ...formData, userId };
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    setTasks([...tasks, { ...newTask, id: docRef.id }]);
    setFormData({ title: '', course: '', dueDate: '', status: 'בהמתנה' });
    setIsAdding(false);
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({ ...task });
  };

  const handleSave = async (id) => {
    const updated = { ...formData };
    if (userId) {
      await updateDoc(doc(db, 'tasks', id), updated);
    }
    setTasks(tasks.map((t) => (t.id === id ? { ...updated, id } : t)));
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (userId) {
      await deleteDoc(doc(db, 'tasks', id));
    }
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks =
    statusFilter === 'הכל'
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const total = tasks.length;
  const uncompleted = tasks.filter((t) => t.status !== 'בוצע').length;

  const renderStatusLabel = (status) => {
    const icons = {
      בהמתנה: '⏳',
      בתהליך: '⚙️',
      בוצע: '✅',
    };
    return (
      <span className={`${styles.status} ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>לוח המשימות שלי</h1>
      <p className={styles.subtitle}>נהל את המשימות הלימודיות שלך במקום אחד</p>

      <div className={styles.stats}>
        <span>סה״כ משימות: {total}</span>
        <span>משימות לא בוצעו: {uncompleted}</span>
      </div>

      <div className={styles.controls}>
  <button onClick={handleAddClick} className={styles.addBtn}>+ הוסף משימה</button>
  <div className={styles.filters}>
    {['הכל', 'בהמתנה', 'בתהליך', 'בוצע'].map((s) => (
      <button
        key={s}
        className={`${styles.filter} ${statusFilter === s ? styles.active : ''}`}
        onClick={() => setStatusFilter(s)}
      >
        {s}
      </button>
    ))}
  </div>
</div>


      <table className={styles.table}>
        <thead>
          <tr>
            <th>סטטוס</th>
            <th>שם משימה</th>
            <th>קורס</th>
            <th>תאריך יעד</th>
            <th>ימים שנותרו</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr className={styles.editing}>
              <td>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="בהמתנה">⏳בהמתנה</option>
                  <option value="בתהליך">⚙️בתהליך</option>
                  <option value="בוצע">✅בוצע</option>
                </select>
              </td>
              <td>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </td>
              <td>-</td>
              <td className={styles.actions}>
                <button onClick={handleAddTask}>שמור</button>
                <button onClick={() => setIsAdding(false)}>ביטול</button>
              </td>
            </tr>
          )}

          {filteredTasks.map((task) => (
            <tr key={task.id} className={editingId === task.id ? styles.editing : ''}>
              <td>
                {editingId === task.id ? (
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="בהמתנה">⏳ בהמתנה</option>
                    <option value="בתהליך">⚙️ בתהליך</option>
                    <option value="בוצע">✅ בוצע</option>
                  </select>
                ) : (
                  renderStatusLabel(task.status)
                )}
              </td>
              <td className={styles.taskName}>
                {editingId === task.id ? (
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <input
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                ) : (
                  task.course
                )}
              </td>
              <td>
                {editingId === task.id ? (
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                ) : (
                  formatDateHebrew(task.dueDate)
                )}
              </td>
              <td>{daysRemaining(task.dueDate)}</td>
              <td className={styles.actions}>
                {editingId === task.id ? (
                  <>
                    <button onClick={() => handleSave(task.id)}>שמור</button>
                    <button onClick={() => setEditingId(null)}>ביטול</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task)}>ערוך</button>
                    <button onClick={() => handleDelete(task.id)}>מחק</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
