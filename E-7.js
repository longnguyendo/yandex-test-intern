document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");
    const searchInput = document.getElementById("search-input");
    const listItems = document.querySelectorAll("#list li");

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const highlightText = (text, query) => {
        const escapedQuery = escapeRegExp(query);
        const regex = new RegExp(`(${escapedQuery})`, "gi");
        return text.replace(regex, `<mark>$1</mark>`);
    };

    const handleSearch = () => {
        const query = searchInput.value.trim().toLowerCase();

        listItems.forEach(li => {
            const originalText = li.textContent;
            const lowerText = originalText.toLowerCase();

            if (query === "") {
                li.innerHTML = originalText; 
                li.style.display = "list-item";
                return;
            }

            if (lowerText.includes(query)) {
                const highlightedText = highlightText(originalText, query);
                li.innerHTML = highlightedText; 
                li.style.display = "list-item";
            } else {
                li.style.display = "none";
            }
        });
    };

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleSearch();
    });

    let debounceTimer;
    searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleSearch();
        }, 300);
    });
});