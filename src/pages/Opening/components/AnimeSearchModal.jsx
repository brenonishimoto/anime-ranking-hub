import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import myAnimeListService from '../../../services/myAnimeListService';
import { getPlaceholderImage } from '../../../utils/helpers';
import styles from './AnimeSearchModal.module.scss';

const AnimeSearchModal = ({ isOpen, onClose, onSelectAnime, selectedAnimes }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && popularAnimes.length === 0) {
            loadPopularAnimes();
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim()) {
            searchAnimes();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const loadPopularAnimes = async () => {
        setLoading(true);
        try {
            const animes = await myAnimeListService.getTopAnimes(20);
            setPopularAnimes(animes);
        } catch (error) {
            console.error('Erro ao carregar animes populares:', error);
        }
        setLoading(false);
    };

    const searchAnimes = async () => {
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        try {
            const results = await myAnimeListService.searchAnimes(searchQuery, 15);
            setSearchResults(results);
        } catch (error) {
            console.error('Erro ao buscar animes:', error);
        }
        setLoading(false);
    };

    const handleSelectAnime = (anime) => {
        onSelectAnime(anime);
        setSearchQuery('');
        setSearchResults([]);
    };

    const isAnimeSelected = (animeId) => {
        return selectedAnimes.some(anime => anime.id === animeId || anime.mal_id === animeId);
    };

    const displayAnimes = searchResults.length > 0 ? searchResults : popularAnimes;

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Escolher Anime</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="Pesquisar anime..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.animeGrid}>
                    {loading ? (
                        <div className={styles.loading}>Carregando...</div>
                    ) : (
                        displayAnimes.map((anime) => (
                            <div 
                                key={anime.mal_id} 
                                className={`${styles.animeCard} ${
                                    isAnimeSelected(anime.mal_id) ? styles.selected : ''
                                }`}
                                onClick={() => !isAnimeSelected(anime.mal_id) && handleSelectAnime(anime)}
                            >
                                <div className={styles.animeImage}>
                                    <img 
                                        src={anime.images?.jpg?.image_url || getPlaceholderImage(anime.title, 225, 318)} 
                                        alt={anime.title}
                                        onError={(e) => {
                                            e.target.src = getPlaceholderImage(anime.title, 225, 318);
                                        }}
                                    />
                                </div>
                                <div className={styles.animeInfo}>
                                    <h3 className={styles.animeTitle}>
                                        {anime.title_english || anime.title}
                                    </h3>
                                    <p className={styles.animeYear}>
                                        {anime.year || anime.aired?.from?.substring(0, 4)}
                                    </p>
                                    <div className={styles.animeScore}>
                                        ⭐ {anime.score || 'N/A'}
                                    </div>
                                </div>
                                {isAnimeSelected(anime.mal_id) && (
                                    <div className={styles.selectedIndicator}>✓</div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {selectedAnimes.length >= 10 && (
                    <div className={styles.limitWarning}>
                        Você já selecionou 10 animes (limite máximo)
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimeSearchModal;
