import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>
                    <span className={styles.welcome}>{t('home.welcome')}</span>
                    <span className={styles.brand}>{t('home.title')}</span>
                </h1>
                <p className={styles.subtitle}>{t('home.subtitle')}</p>
                <button className={styles.ctaButton}>
                    {t('home.quickStart')}
                    <span className={styles.arrow}>→</span>
                </button>
            </div>
            <div className={styles.heroBackground}>
                <div className={styles.musicNote}>♪</div>
                <div className={styles.musicNote}>♫</div>
                <div className={styles.musicNote}>♪</div>
                <div className={styles.musicNote}>♬</div>
            </div>
        </section>
    );
};

export default HeroSection;
