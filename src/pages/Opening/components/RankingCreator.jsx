import React from 'react';
import { useTranslation } from 'react-i18next';
import RankingList from './RankingList';
import styles from './RankingCreator.module.scss';

const RankingCreator = ({ 
    authorName, 
    onAuthorNameChange, 
    selectedAnimes, 
    onAddAnime, 
    onRemoveAnime, 
    onReorderAnimes,
    onSave,
    onCancel 
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.creatorContainer}>
            <div className={styles.creatorHeader}>
                <h2>Criar Seu Ranking</h2>
                <div className={styles.authorSection}>
                    <label htmlFor="authorName">Seu nome:</label>
                    <input
                        id="authorName"
                        type="text"
                        placeholder="Digite seu nome..."
                        value={authorName}
                        onChange={(e) => onAuthorNameChange(e.target.value)}
                        className={styles.authorInput}
                    />
                </div>
            </div>

            <div className={styles.selectionSection}>
                <div className={styles.sectionHeader}>
                    <h3>Animes Selecionados ({selectedAnimes.length}/10)</h3>
                    <button 
                        className={styles.addButton}
                        onClick={onAddAnime}
                        disabled={selectedAnimes.length >= 10}
                    >
                        + Adicionar Anime
                    </button>
                </div>

                {selectedAnimes.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🎵</div>
                        <p>Nenhum anime selecionado ainda</p>
                        <p className={styles.emptyHint}>
                            Clique em "Adicionar Anime" para começar seu ranking
                        </p>
                    </div>
                ) : (
                    <RankingList
                        animes={selectedAnimes}
                        onReorder={onReorderAnimes}
                        onRemove={onRemoveAnime}
                        editable={true}
                    />
                )}
            </div>

            <div className={styles.actionsSection}>
                <button 
                    className={styles.saveButton}
                    onClick={onSave}
                    disabled={selectedAnimes.length === 0 || !authorName.trim()}
                >
                    Salvar Ranking
                </button>
                <button 
                    className={styles.cancelButton}
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>

            {selectedAnimes.length > 0 && (
                <div className={styles.helpText}>
                    💡 Arraste os itens para reordená-los no seu ranking
                </div>
            )}
        </div>
    );
};

export default RankingCreator;
