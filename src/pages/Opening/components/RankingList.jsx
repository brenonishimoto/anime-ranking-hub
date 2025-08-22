import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RankingList.module.scss';

const RankingList = ({ ranking, onDelete }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getRankColor = (position) => {
    if (position === 1) return '#ffd700'; // Gold
    if (position === 2) return '#c0c0c0'; // Silver
    if (position === 3) return '#cd7f32'; // Bronze
    return '#666';
  };

  return (
    <div className={styles.rankingCard}>
      <div className={styles.rankingHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.rankingInfo}>
          <h3 className={styles.authorName}>{ranking.author}</h3>
          <p className={styles.rankingDate}>
            {t('opening.createdAt')}: {formatDate(ranking.createdAt)}
          </p>
          <p className={styles.animeCount}>
            {ranking.animes.length} {t('opening.animes')}
          </p>
        </div>
        <div className={styles.rankingActions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ranking.id);
            }}
            className={styles.deleteButton}
            title={t('opening.deleteRanking')}
          >
            🗑️
          </button>
          <button className={styles.expandButton}>
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.rankingContent}>
          <div className={styles.animeList}>
            {ranking.animes.map((anime) => (
              <div key={anime.id} className={styles.animeItem}>
                <div className={styles.rank} style={{ color: getRankColor(anime.rank) }}>
                  #{anime.rank}
                </div>
                <div className={styles.animeImage}>
                  <img
                    src={anime.images?.jpg?.small_image_url || anime.images?.webp?.small_image_url}
                    alt={anime.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-anime.jpg';
                    }}
                  />
                </div>
                <div className={styles.animeInfo}>
                  <h4 className={styles.animeTitle}>
                    {anime.title_english || anime.title}
                  </h4>
                  {anime.title_english && anime.title !== anime.title_english && (
                    <p className={styles.originalTitle}>{anime.title}</p>
                  )}
                  <div className={styles.animeDetails}>
                    {anime.year && <span className={styles.year}>{anime.year}</span>}
                    {anime.score && (
                      <span className={styles.score}>⭐ {anime.score}</span>
                    )}
                  </div>
                  {anime.openingText && (
                    <div className={styles.selectedOpening}>
                      <div className={styles.openingLabel}>{t('opening.selectedOpening')}:</div>
                      <div className={styles.openingInfo}>
                        <span className={styles.openingNumber}>#{anime.selectedOpening + 1}</span>
                        <span className={styles.openingText}>{anime.openingText}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingList;
