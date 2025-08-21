import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroSection from './components/HeroSection';
import CategoryCard from './components/CategoryCard';
import StatsSection from './components/StatsSection';
import FeaturedSection from './components/FeaturedSection';

import styles from './Home.module.scss';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const categories = [
        {
            id: 'opening',
            icon: '🎵',
            route: '/opening'
        },
        {
            id: 'ending',
            icon: '🎭',
            route: '/ending'
        },
        {
            id: 'ost',
            icon: '🎼',
            route: '/ost'
        }
    ];

    const handleCategoryClick = (route) => {
        navigate(route);
    };

    return (
        <div className={styles.homeWrapper}>
            <Header />
            <main className={styles.homeContainer}>
                <HeroSection />
                
                <section className={styles.categoriesSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Categorias de Rankings</h2>
                        <div className={styles.categoriesGrid}>
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category.id}
                                    icon={category.icon}
                                    onClick={() => handleCategoryClick(category.route)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <FeaturedSection />
                <StatsSection />
            </main>
        </div>
    );
};

export default Home;