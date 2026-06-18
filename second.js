const mainImg = document.getElementById('mainImg');
const thumbs = document.querySelectorAll('.thumb');
const reviewForm = document.getElementById('reviewForm');
const reviewerName = document.getElementById('reviewerName');
const reviewText = document.getElementById('reviewText');
const reviewsList = document.getElementById('reviewsList');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImg.src = thumb.src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

function loadReviews() {
    reviewsList.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem('product_reviews')) || [];
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review-item');
        reviewDiv.innerHTML = `<h4>${review.name}</h4><p>${review.text}</p>`;
        reviewsList.appendChild(reviewDiv);
    });
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = reviewerName.value.trim();
    const text = reviewText.value.trim();
    
    if (name && text) {
        const reviews = JSON.parse(localStorage.getItem('product_reviews')) || [];
        reviews.push({ name, text });
        localStorage.setItem('product_reviews', JSON.stringify(reviews));
        
        loadReviews();
        reviewForm.reset();
    }
});

loadReviews();