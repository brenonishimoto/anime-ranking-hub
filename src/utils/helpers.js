// Utilidades gerais da aplicação

// Função para gerar uma imagem placeholder
export const getPlaceholderImage = (title, width = 300, height = 400) => {
    // Usando um serviço de placeholder com texto
    const encodedTitle = encodeURIComponent(title.substring(0, 20));
    return `https://via.placeholder.com/${width}x${height}/1a1a2e/ffffff?text=${encodedTitle}`;
};

// Função para formatar data
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Função para truncar texto
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Função para gerar ID único
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Função para debounce
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
