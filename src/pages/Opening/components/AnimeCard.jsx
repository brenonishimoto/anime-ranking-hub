import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';
import styles from './AnimeCard.module.scss';

const AnimeCard = ({ anime, rank, onRemove }) => {
  const { t } = useTranslation();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: anime.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const getRankColor = (position) => {
    if (position === 1) return '#ffd700'; // Gold
    if (position === 2) return '#c0c0c0'; // Silver
    if (position === 3) return '#cd7f32'; // Bronze
    return '#666';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.animeCard} ${isDragging ? styles.dragging : ''}`}
    >
      <div 
        className={styles.dragHandle} 
        {...attributes} 
        {...listeners}
        title={t('opening.dragToReorder')}
      >
        ⋮⋮
      </div>
      
      <div className={styles.rank} style={{ color: getRankColor(rank) }}>
        #{rank}
      </div>
      
      <div className={styles.animeImage}>
        <img
          src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
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
            <span className={styles.score}>
              ⭐ {anime.score}
            </span>
          )}
        </div>
        {anime.genres && anime.genres.length > 0 && (
          <div className={styles.genres}>
            {anime.genres.slice(0, 3).map((genre) => (
              <span key={genre.mal_id} className={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        )}
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
      
      <button
        onClick={() => onRemove(anime.id)}
        className={styles.removeButton}
        title={t('opening.removeAnime')}
      >
        ×
      </button>
    </div>
  );
};

export default AnimeCard;
