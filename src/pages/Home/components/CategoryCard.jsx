import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CategoryCard.module.scss';

const CategoryCard = ({ category, icon, onClick }) => {
    const { t } = useTranslation();
    
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardHeader}>
                <div className={styles.icon}>{icon}</div>
                <h3 className={styles.title}>{t(`home.categories.${category}.title`)}</h3>
            </div>
            <p className={styles.description}>
                {t(`home.categories.${category}.description`)}
            </p>
            <div className={styles.cardFooter}>
                <button className={styles.actionButton}>
                    {t('home.actions.participate')}
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;
