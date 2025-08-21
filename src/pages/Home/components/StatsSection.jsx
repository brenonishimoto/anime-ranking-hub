import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StatsSection.module.scss';

const StatsSection = () => {
    const { t } = useTranslation();
    
    // Mock data - em uma aplicação real, isso viria de uma API
    const stats = [
        {
            key: 'totalVotes',
            value: '12,547',
            icon: '🗳️'
        },
        {
            key: 'activeRankings',
            value: '45',
            icon: '📊'
        },
        {
            key: 'contributors',
            value: '1,234',
            icon: '👥'
        }
    ];

    return (
        <section className={styles.statsSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>{t('home.statsTitle')}</h2>
                <div className={styles.statsGrid}>
                    {stats.map((stat) => (
                        <div key={stat.key} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{t(`home.stats.${stat.key}`)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
