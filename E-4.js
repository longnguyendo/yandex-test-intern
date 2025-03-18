document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search");
    const searchInput = document.getElementById("search-input");
    const listItems = document.querySelectorAll("#list li");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        listItems.forEach(li => {
            const originalText = li.getAttribute("data-value");
            const lowerText = originalText.toLowerCase();

            if (query === "") {
                li.innerHTML = originalText;
                li.style.display = "list-item";
                return;
            }

            if (lowerText.includes(query)) {
                const regex = new RegExp(`(${query})`, "gi");
                const highlightedText = originalText.replace(regex, `<mark>$1</mark>`);
                li.innerHTML = highlightedText;
                li.style.display = "list-item";
            } else {
                li.style.display = "none";
            }
        });
    });

    searchInput.addEventListener("input", function () {
        searchForm.dispatchEvent(new Event("submit"));
    });
});