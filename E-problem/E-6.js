document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="text"]');
    const listItems = document.querySelectorAll('li');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const searchQuery = input.value.trim().toLowerCase(); 

        listItems.forEach(item => {

            const text = item.textContent.toLowerCase(); 
            const originalText = item.dataset.originalText || text; 
            item.dataset.originalText = originalText; 
            if (searchQuery === '') {

                item.innerHTML = originalText;
            } else if (text.includes(searchQuery)) {

                const regex = new RegExp(`(${searchQuery})`, 'gi');
                item.innerHTML = originalText.replace(regex, `<span style="background-color: yellow;">$1</span>`);
            } else {
                item.style.display = 'none';
            }
        });
    });


    input.addEventListener('input', function () {
        if (input.value.trim() === '') {
            listItems.forEach(item => {
                item.style.display = ''; 
                item.innerHTML = item.dataset.originalText; 
            });
        }
    });
});