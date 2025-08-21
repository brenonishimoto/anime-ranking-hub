import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';
import AnimeSearchModal from './components/AnimeSearchModal';
import RankingList from './components/RankingList';
import RankingCreator from './components/RankingCreator';
import SavedRankings from './components/SavedRankings';
import useRankings from '../../hooks/useRankings';
import myAnimeListService from '../../services/myAnimeListService';
import styles from './Opening.module.scss';

const Opening = () => {
    const { t } = useTranslation();
    const { rankings, saveRanking, deleteRanking } = useRankings();
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [showCreator, setShowCreator] = useState(false);
    const [authorName, setAuthorName] = useState('');

    const handleAddAnime = (anime) => {
        if (selectedAnimes.length < 10 && !selectedAnimes.find(a => a.id === anime.id)) {
            const processedAnime = myAnimeListService.processAnimeData(anime);
            setSelectedAnimes([...selectedAnimes, processedAnime]);
        }
    };

    const handleRemoveAnime = (animeId) => {
        setSelectedAnimes(selectedAnimes.filter(anime => anime.id !== animeId));
    };

    const handleReorderAnimes = (newOrder) => {
        setSelectedAnimes(newOrder);
    };

    const handleSaveRanking = () => {
        if (selectedAnimes.length === 0 || !authorName.trim()) {
            alert('Por favor, adicione pelo menos um anime e informe seu nome.');
            return;
        }

        const ranking = {
            title: `Top ${selectedAnimes.length} Anime Openings`,
            author: authorName.trim(),
            type: 'opening',
            animes: selectedAnimes.map((anime, index) => ({
                ...anime,
                position: index + 1
            }))
        };

        saveRanking(ranking);
        setSelectedAnimes([]);
        setAuthorName('');
        setShowCreator(false);
        alert('Ranking salvo com sucesso!');
    };

    const handleStartNewRanking = () => {
        setShowCreator(true);
        setSelectedAnimes([]);
        setAuthorName('');
    };

    return (
        <div className={styles.openingWrapper}>
            <Header />
            <main className={styles.openingContainer}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>🎵 Top 10 Anime Openings</h1>
                    <p className={styles.subtitle}>
                        Crie seu ranking personalizado das melhores aberturas de anime
                    </p>
                </div>

                {!showCreator ? (
                    <div className={styles.startSection}>
                        <button 
                            className={styles.startButton}
                            onClick={handleStartNewRanking}
                        >
                            Criar Meu Ranking
                        </button>
                    </div>
                ) : (
                    <RankingCreator
                        authorName={authorName}
                        onAuthorNameChange={setAuthorName}
                        selectedAnimes={selectedAnimes}
                        onAddAnime={() => setIsSearchModalOpen(true)}
                        onRemoveAnime={handleRemoveAnime}
                        onReorderAnimes={handleReorderAnimes}
                        onSave={handleSaveRanking}
                        onCancel={() => setShowCreator(false)}
                    />
                )}

                <SavedRankings 
                    rankings={rankings.filter(r => r.type === 'opening')} 
                    onDeleteRanking={deleteRanking}
                />

                <AnimeSearchModal
                    isOpen={isSearchModalOpen}
                    onClose={() => setIsSearchModalOpen(false)}
                    onSelectAnime={handleAddAnime}
                    selectedAnimes={selectedAnimes}
                />
            </main>
        </div>
    );
};

export default Opening;
