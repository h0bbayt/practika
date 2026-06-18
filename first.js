const searchInput = document.getElementById('find');
const sortSelect = document.getElementById('sort');
const cardsContainer = document.querySelector('.cards');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentPageSpan = document.getElementById('currentPage');

const allCards = Array.from(document.querySelectorAll('.card'));

let currentPage = 1;
const itemsPerPage = 2;

function updateCatalog() {
    const searchText = searchInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    const filteredCards = allCards.filter(card => {
        const cardName = card.getAttribute('data-name').toLowerCase();
        
        if (cardName.includes(searchText)) {
            return true; 
        } else {
            card.classList.add('hidden'); 
            return false;
        }
    });

    filteredCards.sort((a, b) => {
        if (sortValue.startsWith('price')) {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return sortValue === 'price-asc' ? priceA - priceB : priceB - priceA;
        } else if (sortValue.startsWith('name')) {
            const nameA = a.getAttribute('data-name');
            const nameB = b.getAttribute('data-name');
            return sortValue === 'name-asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
        return 0;
    });

    filteredCards.forEach(card => cardsContainer.appendChild(card));

    const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;
    
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.classList.remove('hidden'); 
        } else {
            card.classList.add('hidden'); 
        }
    });

    currentPageSpan.textContent = currentPage;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

searchInput.addEventListener('input', () => {
    currentPage = 1;
    updateCatalog();
});

sortSelect.addEventListener('change', () => {
    updateCatalog();
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateCatalog();
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    updateCatalog();
});

updateCatalog();