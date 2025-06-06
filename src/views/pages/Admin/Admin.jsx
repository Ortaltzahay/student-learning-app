import React, { useState } from 'react';
import styles from './Admin.module.css';

const ActionButton = ({ children, variant = 'primary', onClick }) => {
  const buttonClass = variant === 'danger' ? styles.dangerButton : styles.primaryButton;
  return (
    <button className={`${styles.actionButton} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

const StatCard = ({ number, label }) => (
  <div className={styles.statCard}>
    <div className={styles.statNumber}>{number}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
);

const ManagementItem = ({ title, buttonText, buttonVariant = 'primary', onAction }) => (
  <div className={styles.managementItem}>
    <span className={styles.itemTitle}>{title}</span>
    <ActionButton variant={buttonVariant} onClick={onAction}>{buttonText}</ActionButton>
  </div>
);

export default function Admin() {
  const [currentView, setCurrentView] = useState('main');

  const stats = {
    questions: 156,
    newUsers: 89,
    totalUsers: 1247
  };

  const handleAction = (action) => {
    console.log(`פעולה: ${action}`);
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <button className={styles.mobileViewButton} onClick={() => setCurrentView('mobile')}>
          תצוגת מובייל
        </button>
        <h1 className={styles.pageTitle}>פאנל ניהול</h1>
        <span className={styles.managerBadge}>מנהל מערכת</span>
      </div>

      <div className={styles.statsGrid}>
        <StatCard number={stats.questions} label="שאלות בפורום" />
        <StatCard number={stats.newUsers} label="סיכומים חדשים" />
        <StatCard number={stats.totalUsers} label="משתמשים רשומים" />
      </div>

      <div className={styles.contentGrid}>
        {/* ניהול תוכן */}
        <div className={styles.managementCard}>
          <h2 className={styles.cardTitle}>ניהול תוכן</h2>
          <ManagementItem title="סיכום מקרו כלכלה" buttonText="אישור" onAction={() => handleAction('approve')} />
          <ManagementItem title="שאלה בפורום - דחיה" buttonText="בדיקה" buttonVariant="danger" onAction={() => handleAction('review')} />
          <ManagementItem title="סיכום אנטומיה" buttonText="אישור" onAction={() => handleAction('approve')} />
          <ManagementItem title="תגובה פתוחה" buttonText="בדיקה" buttonVariant="danger" onAction={() => handleAction('review')} />
        </div>

        {/* ניהול משתמשים */}
        <div className={styles.managementCard}>
          <h2 className={styles.cardTitle}>ניהול משתמשים</h2>
          <ManagementItem title="שרה כהן - נרשמה היום" buttonText="אישור" onAction={() => handleAction('approve-user')} />
          <ManagementItem title="יוסי אברהם - דחוי" buttonText="בדיקה" buttonVariant="danger" onAction={() => handleAction('review-user')} />
          <ManagementItem title="דור לוי - בקשת שינוי" buttonText="אישור" onAction={() => handleAction('approve-change')} />
          <ManagementItem title="חאל מזרחי - משתמש פעיל" buttonText="בדיקה" buttonVariant="danger" onAction={() => handleAction('check-status')} />
        </div>

        {/* פעולות מהירות */}
        <div className={styles.managementCard}>
          <h2 className={styles.cardTitle}>פעולות מהירות</h2>
          <ManagementItem title="שליחת הודעה כללית" buttonText="שלח" onAction={() => handleAction('send')} />
          <ManagementItem title="יצירת משתמש חדש" buttonText="הוסף" onAction={() => handleAction('add-user')} />
          <ManagementItem title="הפעל זיהוי פעילות" buttonText="בדוק" buttonVariant="danger" onAction={() => handleAction('activity')} />
          <ManagementItem title="עדכון מערכת" buttonText="בדיקה" onAction={() => handleAction('update')} />
        </div>

        {/* ניהול מערכת */}
        <div className={styles.managementCard}>
          <h2 className={styles.cardTitle}>ניהול מערכת</h2>
          <ManagementItem title="ניהול הרשאות" buttonText="ערוך" onAction={() => handleAction('permissions')} />
          <ManagementItem title="הגדרת התראות" buttonText="ערוך" onAction={() => handleAction('notifications')} />
          <ManagementItem title="גיבוי נתונים" buttonText="ערוך" onAction={() => handleAction('backup')} />
          <ManagementItem title="לוג פעילות" buttonText="ערוך" onAction={() => handleAction('logs')} />
        </div>
      </div>
    </div>
  );
}
