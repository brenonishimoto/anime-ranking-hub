import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Header from '../../components/Header/Header';
import AnimeCard from './components/AnimeCard';
import SearchModal from './components/SearchModal';
import RankingList from './components/RankingList';
import styles from './Opening.module.scss';

const Opening = () => {
  const { t } = useTranslation();
  const [selectedAnimes, setSelectedAnimes] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [savedRankings, setSavedRankings] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved rankings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('animeOpeningRankings');
    if (saved) {
      setSavedRankings(JSON.parse(saved));
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedAnimes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddAnime = (anime) => {
    if (selectedAnimes.length < 10 && !selectedAnimes.find(item => item.mal_id === anime.mal_id && item.selectedOpening === anime.selectedOpening)) {
      const newAnime = {
        id: crypto.randomUUID(),
        mal_id: anime.mal_id,
        title: anime.title,
        title_english: anime.title_english,
        images: anime.images,
        year: anime.year,
        genres: anime.genres,
        score: anime.score,
        selectedOpening: anime.selectedOpening,
        openingText: anime.openingText,
        rank: selectedAnimes.length + 1
      };
      setSelectedAnimes([...selectedAnimes, newAnime]);
    }
    setIsSearchModalOpen(false);
  };

  const handleRemoveAnime = (id) => {
    setSelectedAnimes(selectedAnimes.filter(anime => anime.id !== id));
  };

  const handleSaveRanking = () => {
    if (selectedAnimes.length === 0 || !authorName.trim()) {
      alert(t('opening.fillAllFields'));
      return;
    }

    const newRanking = {
      id: crypto.randomUUID(),
      author: authorName,
      animes: selectedAnimes.map((anime, index) => ({
        ...anime,
        rank: index + 1
      })),
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedRankings, newRanking];
    setSavedRankings(updated);
    localStorage.setItem('animeOpeningRankings', JSON.stringify(updated));
    
    // Reset form
    setSelectedAnimes([]);
    setAuthorName('');
    
    alert(t('opening.rankingSaved'));
  };

  const handleDeleteRanking = (rankingId) => {
    if (window.confirm(t('opening.confirmDelete'))) {
      const updated = savedRankings.filter(ranking => ranking.id !== rankingId);
      setSavedRankings(updated);
      localStorage.setItem('animeOpeningRankings', JSON.stringify(updated));
    }
  };

  return (
    <div className={styles.openingWrapper}>
      <Header />
      <main className={styles.openingContainer}>
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <h1 className={styles.title}>{t('opening.title')}</h1>
            <p className={styles.subtitle}>{t('opening.subtitle')}</p>
          </section>

          <section className={styles.createSection}>
            <div className={styles.createForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="authorName">{t('opening.authorName')}</label>
                <input
                  id="authorName"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={t('opening.enterYourName')}
                  className={styles.input}
                />
              </div>

              <div className={styles.animeSelection}>
                <div className={styles.selectionHeader}>
                  <h3>{t('opening.selectedAnimes')} ({selectedAnimes.length}/10)</h3>
                  <button
                    onClick={() => setIsSearchModalOpen(true)}
                    className={styles.addButton}
                    disabled={selectedAnimes.length >= 10}
                  >
                    + {t('opening.addAnime')}
                  </button>
                </div>

                {selectedAnimes.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>{t('opening.noAnimeSelected')}</p>
                    <p className={styles.helpText}>{t('opening.clickAddToStart')}</p>
                  </div>
                ) : (
                  <div className={styles.rankingContainer}>
                    <p className={styles.dragHint}>{t('opening.dragToReorder')}</p>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={selectedAnimes.map(anime => anime.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className={styles.rankingList}>
                          {selectedAnimes.map((anime, index) => (
                            <AnimeCard
                              key={anime.id}
                              anime={anime}
                              rank={index + 1}
                              onRemove={handleRemoveAnime}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <button
                  onClick={handleSaveRanking}
                  className={styles.saveButton}
                  disabled={selectedAnimes.length === 0 || !authorName.trim()}
                >
                  {t('opening.saveRanking')}
                </button>
              </div>
            </div>
          </section>

          {savedRankings.length > 0 && (
            <section className={styles.savedSection}>
              <h2>{t('opening.savedRankings')}</h2>
              <div className={styles.savedRankings}>
                {savedRankings.map((ranking) => (
                  <RankingList
                    key={ranking.id}
                    ranking={ranking}
                    onDelete={handleDeleteRanking}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          onSelectAnime={handleAddAnime}
          selectedAnimes={selectedAnimes}
        />
      )}
    </div>
  );
};

export default Opening;