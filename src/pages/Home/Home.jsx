import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';

import styles from './Home.module.scss';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.homeWrapper}>
            <Header />
            <main className={styles.homeContainer}>
                <h1>{t('home.welcome')}</h1>
                <p>{t('home.title')}</p>
            </main>
        </div>
    );
};

export default Home;