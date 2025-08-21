import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RankingList from './RankingList';
import styles from './SavedRankings.module.scss';

const SavedRankings = ({ rankings, onDeleteRanking }) => {
    const { t } = useTranslation();
    const [expandedRanking, setExpandedRanking] = useState(null);

    if (rankings.length === 0) {
        return null;
    }

    const toggleRanking = (rankingId) => {
        setExpandedRanking(expandedRanking === rankingId ? null : rankingId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={styles.savedRankings}>
            <h2 className={styles.sectionTitle}>
                Rankings Salvos ({rankings.length})
            </h2>
            
            <div className={styles.rankingsGrid}>
                {rankings.map((ranking) => (
                    <div key={ranking.id} className={styles.rankingCard}>
                        <div className={styles.rankingHeader}>
                            <div className={styles.rankingInfo}>
                                <h3 className={styles.rankingTitle}>
                                    {ranking.title}
                                </h3>
                                <div className={styles.rankingMeta}>
                                    <span className={styles.author}>
                                        👤 {ranking.author}
                                    </span>
                                    <span className={styles.date}>
                                        📅 {formatDate(ranking.createdAt)}
                                    </span>
                                    <span className={styles.count}>
                                        🎵 {ranking.animes.length} animes
                                    </span>
                                </div>
                            </div>
                            
                            <div className={styles.rankingActions}>
                                <button
                                    className={styles.toggleButton}
                                    onClick={() => toggleRanking(ranking.id)}
                                >
                                    {expandedRanking === ranking.id ? '▲' : '▼'}
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        if (window.confirm('Tem certeza que deseja excluir este ranking?')) {
                                            onDeleteRanking(ranking.id);
                                        }
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>

                        {expandedRanking === ranking.id && (
                            <div className={styles.rankingContent}>
                                <RankingList
                                    animes={ranking.animes}
                                    editable={false}
                                />
                            </div>
                        )}

                        {expandedRanking !== ranking.id && (
                            <div className={styles.preview}>
                                <div className={styles.topThree}>
                                    {ranking.animes.slice(0, 3).map((anime, index) => (
                                        <div key={anime.id} className={styles.previewItem}>
                                            <span className={styles.previewPosition}>
                                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                            </span>
                                            <div className={styles.previewImage}>
                                                <img 
                                                    src={anime.image || '/placeholder-anime.jpg'} 
                                                    alt={anime.title}
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-anime.jpg';
                                                    }}
                                                />
                                            </div>
                                            <span className={styles.previewTitle}>
                                                {anime.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {ranking.animes.length > 3 && (
                                    <div className={styles.moreItems}>
                                        +{ranking.animes.length - 3} mais...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRankings;
