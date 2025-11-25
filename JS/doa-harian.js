function getDoa() {
    fetch('https://doa-doa-api-ahmadramadhan.fly.dev/api')
        .then(response => response.json())
        .then(response => {
            let cardDoa = '';
            response.forEach(doa => {
                cardDoa += `
                <div class="col-lg-12 col-md-4 col-sm-12 card-doa">
                    <div class="card mb-4 shadow">
                        <div class="card-body">
                            <h5 class="card-title">${doa.doa}</h5>
                            <h3 class="card-subtitle mb-2 text-muted text-end">${doa.ayat}</h3>
                            <p class="card-text text-end">${doa.latin}</p>
                        </div>
                    </div>
                </div>
                `;
            });

            const daftarDoa = document.querySelector('.card-doa-daftar');
            daftarDoa.innerHTML = cardDoa;
        });
}

function filterDoa() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toUpperCase();
    const cardDoa = document.querySelector('.card-doa-daftar');
    const cards = cardDoa.querySelectorAll('.card-doa');

    cards.forEach(card => {
        const title = card.querySelector('.card-title');
        const textValue = title.textContent || title.innerText;

        if (textValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Call getDoa function to load initial data
getDoa();

// Add event listener to the search input
document.getElementById('searchInput').addEventListener('input', filterDoa);
