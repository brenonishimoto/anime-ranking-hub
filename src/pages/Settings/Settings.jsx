import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from './Settings.module.scss';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsContainer}>
        <button 
          onClick={handleBackClick}
          className={styles.backButton}
        >
          ← {t("settings.back")}
        </button>
        
        <h1 className={styles.title}>{t("settings.title")}</h1>

        <div className={styles.settingItem}>
          <label htmlFor="language" className={styles.label}>
            {t("settings.language")}:
          </label>
          <select
            id="language"
            onChange={handleChange}
            value={i18n.language}
            className={styles.select}
          >
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>
    </div>
  );
}
