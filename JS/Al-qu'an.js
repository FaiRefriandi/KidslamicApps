function getSurat() {
    fetch('https://equran.id/api/surat')
        .then(response => response.json())
        .then(response => {
            displaySurat(response); // Display all surah initially
        });
}

function displaySurat(suratList) {
    const daftarSurat = document.querySelector('.card-surat-daftar');
    daftarSurat.innerHTML = ''; // Clear the existing content

    suratList.forEach(surat => {
        const cardSurat = document.createElement('div');
        cardSurat.className = 'col-lg-3 col-md-4 col-sm-12';
        cardSurat.innerHTML = `
            <div class="card mb-4 card-surat shadow">
                <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                    <h5 class="card-title">${surat.nama_latin}</h5>
                    <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                    <p class="card-text text-end">${surat.arti}</p>
                </div>
            </div>
        `;
        daftarSurat.appendChild(cardSurat);
    });
}

function searchSurat() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://equran.id/api/surat')
        .then(response => response.json())
        .then(response => {
            const filteredSurat = response.filter(surat => {
                const namaLatinLower = surat.nama_latin.toLowerCase();
                const nomorString = surat.nomor.toString();

                return namaLatinLower.includes(searchTerm) || nomorString.includes(searchTerm);
            });
            displaySurat(filteredSurat);
        });
}

getSurat();
