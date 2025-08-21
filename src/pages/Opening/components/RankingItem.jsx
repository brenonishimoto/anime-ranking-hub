import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getPlaceholderImage } from '../../../utils/helpers';
import styles from './RankingItem.module.scss';

const RankingItem = ({ anime, position, onRemove, editable }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: anime.id, disabled: !editable });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getPositionColor = (pos) => {
        if (pos === 1) return '#ffd700'; // Ouro
        if (pos === 2) return '#c0c0c0'; // Prata
        if (pos === 3) return '#cd7f32'; // Bronze
        return '#667eea'; // Padrão
    };

    const getPositionIcon = (pos) => {
        if (pos === 1) return '🥇';
        if (pos === 2) return '🥈';
        if (pos === 3) return '🥉';
        return pos;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.rankingItem} ${isDragging ? styles.dragging : ''}`}
            {...attributes}
        >
            <div className={styles.positionSection}>
                <div 
                    className={styles.position}
                    style={{ backgroundColor: getPositionColor(position) }}
                >
                    {getPositionIcon(position)}
                </div>
            </div>

            <div className={styles.animeImage}>
                <img 
                    src={anime.image || getPlaceholderImage(anime.title, 128, 180)} 
                    alt={anime.title}
                    onError={(e) => {
                        e.target.src = getPlaceholderImage(anime.title, 128, 180);
                    }}
                />
            </div>

            <div className={styles.animeInfo}>
                <h3 className={styles.animeTitle}>{anime.title}</h3>
                <p className={styles.animeDetails}>
                    {anime.titleJapanese && anime.titleJapanese !== anime.title && (
                        <span className={styles.japaneseTitle}>{anime.titleJapanese}</span>
                    )}
                    <span className={styles.year}>
                        {anime.year} • ⭐ {anime.score || 'N/A'}
                    </span>
                </p>
                <div className={styles.openingInfo}>
                    <div className={styles.openingTitle}>
                        🎵 "{anime.opening?.title || 'Opening Theme'}"
                    </div>
                    <div className={styles.openingArtist}>
                        by {anime.opening?.artist || 'Unknown Artist'}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                {editable && (
                    <>
                        <button
                            className={styles.dragHandle}
                            {...listeners}
                            aria-label="Drag to reorder"
                        >
                            ⋮⋮
                        </button>
                        <button
                            className={styles.removeButton}
                            onClick={() => onRemove(anime.id)}
                            aria-label="Remove anime"
                        >
                            ×
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RankingItem;
