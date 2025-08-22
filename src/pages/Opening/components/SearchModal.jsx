import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styles from './SearchModal.module.scss';

const SearchModal = ({ onClose, onSelectAnime, selectedAnimes }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [expandedAnime, setExpandedAnime] = useState(null);
  const [animeOpenings, setAnimeOpenings] = useState({});

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10&sfw=true`
      );
      
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error('Error searching anime:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimeClick = async (anime) => {
    if (expandedAnime === anime.mal_id) {
      setExpandedAnime(null);
      return;
    }

    setExpandedAnime(anime.mal_id);

    // If we already have openings for this anime, don't fetch again
    if (animeOpenings[anime.mal_id]) {
      return;
    }

    try {
      const themesResponse = await axios.get(
        `https://api.jikan.moe/v4/anime/${anime.mal_id}/themes`
      );
      
      setAnimeOpenings(prev => ({
        ...prev,
        [anime.mal_id]: {
          openings: themesResponse.data.data?.openings || [],
          endings: themesResponse.data.data?.endings || []
        }
      }));
    } catch (error) {
      console.error(`Failed to fetch themes for ${anime.title}:`, error);
      setAnimeOpenings(prev => ({
        ...prev,
        [anime.mal_id]: {
          openings: [],
          endings: []
        }
      }));
    }
  };

  const handleOpeningSelect = (anime, opening, index) => {
    const animeWithOpening = {
      ...anime,
      selectedOpening: index,
      openingText: opening
    };
    onSelectAnime(animeWithOpening);
  };

  const isOpeningSelected = (malId, openingIndex) => {
    return selectedAnimes.some(anime => 
      anime.mal_id === malId && anime.selectedOpening === openingIndex
    );
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for search
    const newTimeout = setTimeout(() => {
      handleSearch(query);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{t('opening.searchAnime')}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder={t('opening.searchPlaceholder')}
            value={searchQuery}
            onChange={handleInputChange}
            className={styles.searchInput}
            autoFocus
          />
          <p className={styles.searchHint}>
            {t('opening.searchHint')}
          </p>
        </div>

        <div className={styles.resultsSection}>
          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{t('opening.searching')}</p>
            </div>
          )}

          {!isLoading && searchQuery && searchResults.length === 0 && (
            <div className={styles.noResults}>
              <p>{t('opening.noResults')}</p>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className={styles.results}>
              {searchResults.map((anime) => (
                <div key={anime.mal_id} className={styles.animeResult}>
                  <div
                    className={styles.animeCard}
                    onClick={() => handleAnimeClick(anime)}
                  >
                    <div className={styles.animeImage}>
                      <img
                        src={anime.images?.jpg?.small_image_url || anime.images?.webp?.small_image_url}
                        alt={anime.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-anime.svg';
                        }}
                      />
                    </div>
                    <div className={styles.animeInfo}>
                      <h3 className={styles.animeTitle}>
                        {anime.title_english || anime.title}
                      </h3>
                      {anime.title_english && anime.title !== anime.title_english && (
                        <p className={styles.originalTitle}>{anime.title}</p>
                      )}
                      <div className={styles.animeDetails}>
                        {anime.year && <span>{anime.year}</span>}
                        {anime.score && <span>⭐ {anime.score}</span>}
                        {anime.type && <span>{anime.type}</span>}
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
                    </div>
                    <div className={styles.expandButton}>
                      {expandedAnime === anime.mal_id ? '▲' : '▼'}
                    </div>
                  </div>

                  {expandedAnime === anime.mal_id && (
                    <div className={styles.openingsSection}>
                      {animeOpenings[anime.mal_id] ? (
                        animeOpenings[anime.mal_id].openings.length > 0 ? (
                          <div className={styles.openingsList}>
                            <h4 className={styles.openingsTitle}>
                              {t('opening.selectOpening')}
                            </h4>
                            {animeOpenings[anime.mal_id].openings.map((opening, index) => (
                              <div
                                key={index}
                                className={`${styles.openingItem} ${
                                  isOpeningSelected(anime.mal_id, index) ? styles.selected : ''
                                }`}
                                onClick={() => !isOpeningSelected(anime.mal_id, index) && 
                                  handleOpeningSelect(anime, opening, index)}
                              >
                                <div className={styles.openingNumber}>#{index + 1}</div>
                                <div className={styles.openingText}>{opening}</div>
                                {isOpeningSelected(anime.mal_id, index) && (
                                  <div className={styles.selectedBadge}>
                                    ✓ {t('opening.selected')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className={styles.noOpenings}>
                            <p>{t('opening.noOpeningsFound')}</p>
                          </div>
                        )
                      ) : (
                        <div className={styles.loadingOpenings}>
                          <div className={styles.miniSpinner}></div>
                          <p>{t('opening.loadingOpenings')}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!searchQuery && (
            <div className={styles.initialState}>
              <div className={styles.searchIcon}>🔍</div>
              <p>{t('opening.startSearching')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
