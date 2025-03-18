document.addEventListener('DOMContentLoaded', function() {
    
    const searchForm = document.getElementById('search');
    const searchInput = document.getElementById('search-input');
    const listItems = document.querySelectorAll('#list li');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();

        listItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const dataValue = item.getAttribute('data-value').toLowerCase();
            const isMatch = text.includes(searchTerm) || dataValue.includes(searchTerm);

            if (searchTerm === '') {
                item.style.display = 'list-item';
                item.innerHTML = item.getAttribute('data-value');
            } else if (isMatch) {
                item.style.display = 'list-item';
                const highlightedText = item.textContent.replace(new RegExp(searchTerm, 'gi'), match => `<span style="background-color: yellow;">${match}</span>`);
                item.innerHTML = highlightedText;
            } else {
                item.style.display = 'none';
            }
        });
    });
});