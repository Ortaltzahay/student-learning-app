
import React, { useState } from 'react';
import styles from './Settings.module.css';
import { Link } from "react-router-dom";


const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <div
    className={`${styles.toggleSwitch} ${checked ? styles.toggleChecked : ''} ${disabled ? styles.toggleDisabled : ''}`}
    onClick={() => !disabled && onChange(!checked)}
  >
    <div className={styles.toggleSlider}></div>
  </div>
);

const Select = ({ value, onChange, options, disabled = false }) => (
  <div className={`${styles.customSelect} ${disabled ? styles.selectDisabled : ''}`}>
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
      {options.map((option, idx) => (
        <option key={idx} value={option}>{option}</option>
      ))}
    </select>
    <div className={styles.selectArrow}>▼</div>
  </div>
);

export default function Settings() {
  const [settings, setSettings] = useState({
    publicProfile: true,
    privateMessages: 'כולם',
    showTasks: false,
    emailNotifications: true,
    taskReminders: 'יום לפני',
    newQuestions: false,
    availabilityStatus: true,
    knowledgeAreas: false,
    helpSearchTags: false
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
    
      <div className={styles.settingsContainer}>
        <h1 className={styles.settingsTitle}>הגדרות</h1>

        <div className={styles.settingsGrid}>
          {/* כרטיס פרטיות */}
          <div className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>פרטיות</h2>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>פרופיל גלוי</span>
              <ToggleSwitch
                checked={settings.publicProfile}
                onChange={(val) => updateSetting('publicProfile', val)}
              />
            </div>
            <div className={styles.settingItemWithSelect}>
              <span className={styles.settingLabel}>הודעות פרטיות</span>
              <Select
                value={settings.privateMessages}
                onChange={(val) => updateSetting('privateMessages', val)}
                options={['כולם', 'חברים בלבד', 'ללא']}
              />
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>הצגת משימות</span>
              <ToggleSwitch
                checked={settings.showTasks}
                onChange={(val) => updateSetting('showTasks', val)}
              />
            </div>
          </div>

          {/* כרטיס התראות */}
          <div className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>התראות</h2>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>התראות אימייל</span>
              <ToggleSwitch
                checked={settings.emailNotifications}
                onChange={(val) => updateSetting('emailNotifications', val)}
              />
            </div>
            <div className={styles.settingItemWithSelect}>
              <span className={styles.settingLabel}>תזכורות למשימות</span>
              <Select
                value={settings.taskReminders}
                onChange={(val) => updateSetting('taskReminders', val)}
                options={['יום לפני', 'שעתיים לפני', 'ללא']}
              />
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>שאלות חדשות</span>
              <ToggleSwitch
                checked={settings.newQuestions}
                onChange={(val) => updateSetting('newQuestions', val)}
              />
            </div>
          </div>

          {/* כרטיס חשבון */}
          <div className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>חשבון</h2>
            <div className={styles.actionItem}>
              <span className={styles.settingLabel}>שינוי סיסמה</span>
              <button className={`${styles.actionButton} ${styles.primary}`}>שנה</button>
            </div>
            <div className={styles.actionItem}>
              <span className={styles.settingLabel}>ייצוא נתונים</span>
              <button className={`${styles.actionButton} ${styles.secondary}`}>ייצא</button>
            </div>
            <div className={styles.actionItem}>
              <span className={styles.settingLabel}>מחיקת חשבון</span>
              <button className={`${styles.actionButton} ${styles.danger}`}>מחק</button>
            </div>
          </div>

          {/* כרטיס קהילה */}
          <div className={styles.settingsCard}>
            <h2 className={styles.cardTitle}>קהילה</h2>
            <div className={styles.actionItem}>
              <span className={styles.settingLabel}>תגיות תחומי ידע</span>
              <button className={`${styles.actionButton} ${styles.primary}`}>ערוך</button>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>סטטוס זמינות</span>
              <ToggleSwitch
                checked={settings.availabilityStatus}
                onChange={(val) => updateSetting('availabilityStatus', val)}
              />
            </div>
            <div className={styles.actionItem}>
              <span className={styles.settingLabel}>תגיות חיפוש עזרה</span>
              <button className={`${styles.actionButton} ${styles.primary}`}>ערוך</button>
            </div>
          </div>
        </div>

        <div className={styles.saveSection}>
          <button className={styles.saveButton}>שמור שינויים</button>
        </div>
      </div>
    </>
  );
}
