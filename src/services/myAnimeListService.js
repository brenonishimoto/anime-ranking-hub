import axios from 'axios';

// Como a API oficial do MyAnimeList requer autenticação OAuth2,
// vamos usar a API não oficial do Jikan que fornece dados do MAL
const JIKAN_API = 'https://api.jikan.moe/v4';

class MyAnimeListService {
    // Buscar animes populares
    async getTopAnimes(limit = 25) {
        try {
            const response = await axios.get(`${JIKAN_API}/top/anime`, {
                params: {
                    limit,
                    type: 'tv'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erro ao buscar animes:', error);
            // Retorna dados mock em caso de erro
            return this.getMockAnimes();
        }
    }

    // Buscar anime específico por ID
    async getAnimeById(id) {
        try {
            const response = await axios.get(`${JIKAN_API}/anime/${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erro ao buscar anime:', error);
            return null;
        }
    }

    // Buscar animes por termo de pesquisa
    async searchAnimes(query, limit = 10) {
        try {
            const response = await axios.get(`${JIKAN_API}/anime`, {
                params: {
                    q: query,
                    limit,
                    type: 'tv',
                    status: 'complete'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Erro ao buscar animes:', error);
            return [];
        }
    }

    // Dados mock para fallback
    getMockAnimes() {
        return [
            {
                mal_id: 16498,
                title: 'Attack on Titan',
                title_english: 'Attack on Titan',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg'
                    }
                },
                score: 9.0,
                year: 2013,
                opening_theme: 'Guren no Yumiya by Linked Horizon'
            },
            {
                mal_id: 11061,
                title: 'Hunter x Hunter (2011)',
                title_english: 'Hunter x Hunter',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg'
                    }
                },
                score: 9.04,
                year: 2011,
                opening_theme: 'Departure! by Masatoshi Ono'
            },
            {
                mal_id: 9253,
                title: 'Steins;Gate',
                title_english: 'Steins;Gate',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg'
                    }
                },
                score: 9.07,
                year: 2011,
                opening_theme: 'Hacking to the Gate by Kanako Itou'
            },
            {
                mal_id: 19,
                title: 'Monster',
                title_english: 'Monster',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/9/18793.jpg'
                    }
                },
                score: 9.0,
                year: 2004,
                opening_theme: 'Grain by Kuniaki Haishima'
            },
            {
                mal_id: 20,
                title: 'Naruto',
                title_english: 'Naruto',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg'
                    }
                },
                score: 8.3,
                year: 2002,
                opening_theme: 'R★O★C★K★S by Hound Dog'
            },
            {
                mal_id: 269,
                title: 'Bleach',
                title_english: 'Bleach',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg'
                    }
                },
                score: 7.9,
                year: 2004,
                opening_theme: 'Number One by Hazel Fernandes'
            },
            {
                mal_id: 21,
                title: 'One Piece',
                title_english: 'One Piece',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg'
                    }
                },
                score: 9.1,
                year: 1999,
                opening_theme: 'We Are! by Hiroshi Kitadani'
            },
            {
                mal_id: 38000,
                title: 'Kimetsu no Yaiba',
                title_english: 'Demon Slayer',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg'
                    }
                },
                score: 8.7,
                year: 2019,
                opening_theme: 'Gurenge by LiSA'
            },
            {
                mal_id: 11757,
                title: 'Sword Art Online',
                title_english: 'Sword Art Online',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg'
                    }
                },
                score: 7.2,
                year: 2012,
                opening_theme: 'Crossing Field by LiSA'
            },
            {
                mal_id: 820,
                title: 'Ginga Eiyuu Densetsu',
                title_english: 'Legend of the Galactic Heroes',
                images: {
                    jpg: {
                        image_url: 'https://cdn.myanimelist.net/images/anime/13/13225.jpg'
                    }
                },
                score: 9.0,
                year: 1988,
                opening_theme: 'Skies of Love by Shinji Tanimura'
            }
        ];
    }

    // Processar dados do anime para incluir informações de opening
    processAnimeData(anime) {
        return {
            id: anime.mal_id,
            title: anime.title_english || anime.title,
            titleJapanese: anime.title,
            image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
            score: anime.score,
            year: anime.year,
            synopsis: anime.synopsis,
            // Informações de opening (seria ideal buscar de uma API específica)
            opening: {
                title: this.getOpeningTitle(anime),
                artist: this.getOpeningArtist(anime),
                videoUrl: null // Seria necessário uma API específica para vídeos
            }
        };
    }

    // Método auxiliar para extrair título da opening (simulado)
    getOpeningTitle(anime) {
        const openingTitles = {
            16498: 'Guren no Yumiya',
            11061: 'Departure!',
            9253: 'Hacking to the Gate',
            19: 'Grain',
            20: 'R★O★C★K★S',
            269: 'Number One',
            21: 'We Are!',
            38000: 'Gurenge',
            11757: 'Crossing Field',
            820: 'Skies of Love'
        };
        return openingTitles[anime.mal_id] || 'Unknown Opening';
    }

    // Método auxiliar para extrair artista da opening (simulado)
    getOpeningArtist(anime) {
        const openingArtists = {
            16498: 'Linked Horizon',
            11061: 'Masatoshi Ono',
            9253: 'Kanako Itou',
            19: 'Kuniaki Haishima',
            20: 'Hound Dog',
            269: 'Hazel Fernandes',
            21: 'Hiroshi Kitadani',
            38000: 'LiSA',
            11757: 'LiSA',
            820: 'Shinji Tanimura'
        };
        return openingArtists[anime.mal_id] || 'Unknown Artist';
    }
}

export default new MyAnimeListService();
