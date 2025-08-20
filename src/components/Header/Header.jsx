import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <a href="opening-ranking" className={styles.link}>
                    {t('header.opening', 'Opening')}
                </a>
                <a href="ending-ranking" className={styles.link}>
                    {t('header.ending', 'Ending')}
                </a>
            </nav>
            <div>
                <button
                    className={styles.settingsButton}
                    aria-label="Settings"
                    onClick={handleSettingsClick}
                >
                    ⚙️
                </button>
            </div>
        </header>
    );
};

export default Header;
