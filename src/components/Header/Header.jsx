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

    const handleOpeningClick = () => {
        navigate('/opening');
    };

    const handleEndingClick = () => {
        navigate('/ending');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={handleHomeClick}>
                🎵 Anime Ranking Hub
            </div>
            <nav className={styles.nav}>
                <button onClick={handleOpeningClick} className={styles.link}>
                    {t('header.opening')}
                </button>
                <button onClick={handleEndingClick} className={styles.link}>
                    {t('header.ending')}
                </button>
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
