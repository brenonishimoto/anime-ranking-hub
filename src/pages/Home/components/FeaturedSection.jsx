import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FeaturedSection.module.scss';

const FeaturedSection = () => {
    const { t } = useTranslation();
    
    // Mock data para rankings em destaque
    const featuredRankings = [
        {
            id: 1,
            title: 'Top 100 Anime Openings 2024',
            anime: 'Attack on Titan',
            song: 'The Rumbling',
            artist: 'SiM',
            votes: 2847,
            image: '🎵'
        },
        {
            id: 2,
            title: 'Best Emotional Endings',
            anime: 'Your Name',
            song: 'Nandemonaiya',
            artist: 'RADWIMPS',
            votes: 1923,
            image: '🎭'
        },
        {
            id: 3,
            title: 'Epic Battle OSTs',
            anime: 'Demon Slayer',
            song: 'Kamado Tanjiro no Uta',
            artist: 'Go Shiina',
            votes: 1654,
            image: '⚔️'
        }
    ];

    return (
        <section className={styles.featuredSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>{t('home.featuredTitle')}</h2>
                <div className={styles.rankingsGrid}>
                    {featuredRankings.map((ranking) => (
                        <div key={ranking.id} className={styles.rankingCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.rankingImage}>{ranking.image}</div>
                                <div className={styles.rankingInfo}>
                                    <h3 className={styles.rankingTitle}>{ranking.title}</h3>
                                    <div className={styles.currentWinner}>
                                        <div className={styles.songInfo}>
                                            <span className={styles.anime}>{ranking.anime}</span>
                                            <span className={styles.song}>"{ranking.song}"</span>
                                            <span className={styles.artist}>by {ranking.artist}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <div className={styles.votes}>
                                    <span className={styles.voteCount}>{ranking.votes.toLocaleString()}</span>
                                    <span className={styles.voteLabel}>votos</span>
                                </div>
                                <button className={styles.voteButton}>
                                    {t('home.actions.viewAll')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
