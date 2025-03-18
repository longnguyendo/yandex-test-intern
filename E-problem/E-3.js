document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("search");
    const searchInput = document.getElementById("search-input");
    const listItems = document.querySelectorAll("#list li");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        listItems.forEach(li => {
            const text = li.getAttribute("data-value");
            if (searchTerm === "") {
                li.innerHTML = text;
                li.style.display = "list-item";
                return;
            }

            const lowerText = text.toLowerCase();
            if (lowerText.includes(searchTerm)) {
                const regex = new RegExp(`(${searchTerm})`, "gi");
                li.innerHTML = text.replace(regex, `<mark>$1</mark>`);
                li.style.display = "list-item";
            } else {
                li.style.display = "none";
            }
        });
    });
});