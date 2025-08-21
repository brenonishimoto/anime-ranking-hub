import { useState, useEffect } from 'react';

const useRankings = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carregar rankings do localStorage
    useEffect(() => {
        const savedRankings = localStorage.getItem('animeRankings');
        if (savedRankings) {
            try {
                setRankings(JSON.parse(savedRankings));
            } catch (error) {
                console.error('Erro ao carregar rankings:', error);
            }
        }
    }, []);

    // Salvar ranking
    const saveRanking = (ranking) => {
        const newRanking = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...ranking
        };

        const updatedRankings = [newRanking, ...rankings];
        setRankings(updatedRankings);
        localStorage.setItem('animeRankings', JSON.stringify(updatedRankings));
        
        return newRanking;
    };

    // Deletar ranking
    const deleteRanking = (rankingId) => {
        const updatedRankings = rankings.filter(r => r.id !== rankingId);
        setRankings(updatedRankings);
        localStorage.setItem('animeRankings', JSON.stringify(updatedRankings));
    };

    // Buscar ranking por ID
    const getRankingById = (rankingId) => {
        return rankings.find(r => r.id === rankingId);
    };

    // Atualizar ranking
    const updateRanking = (rankingId, updates) => {
        const updatedRankings = rankings.map(r => 
            r.id === rankingId 
                ? { ...r, ...updates, updatedAt: new Date().toISOString() }
                : r
        );
        setRankings(updatedRankings);
        localStorage.setItem('animeRankings', JSON.stringify(updatedRankings));
    };

    return {
        rankings,
        loading,
        saveRanking,
        deleteRanking,
        getRankingById,
        updateRanking
    };
};

export default useRankings;
