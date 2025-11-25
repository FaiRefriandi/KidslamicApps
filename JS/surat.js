function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e){
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {

            // Judul Surat pada web
            const titleSurat = document.querySelector('#title-surat');
            titleSurat.textContent = `Surat ${response.nama_latin}`
            
            // Panggil info surat
            const judulSurat = document.querySelector('.judul-surat');
            const cardJudulSurat = `<strong>${response.nama_latin} - ${response.nama}</strong>
            <p>Jumlah Ayat : ${response.jumlah_ayat} ${response.arti}</p>
            <p>${response.deskripsi}</p>

            <button class="btn audio-button-play" style="background-color: #55d8d8; color: #ffffff;"><i class="fa-solid fa-play"></i> Dengarkan</button>
            <button class="btn hidden-button audio-button-pause" style="background-color: red; color: #ffffff;"><i class="fa-solid fa-pause"></i> Berhenti</button>


            <audio id="audio-tag" src="${response.audio}"></audio>
            `;

            judulSurat.innerHTML = cardJudulSurat;
            //End panggil ingfo
        
            // //Panggil isi surat
            const surat = response.ayat;
            let isiSurat = '';
            surat.forEach( s => {
                isiSurat += 
                `<div class="card mb-3 shadow">
                    <div class="card-body">
                        <p>${s.nomor}. </p>
                        <h2 class="text-end" style="margin-bottom: 35px;">${s.ar}</h2>
                        <p style="margin-bottom: 25px;">${s.tr}</p>
                        <p style="font-size: 15px; color: #846d35;">"${s.idn}"</p>
                    </div>
                </div>           
                `;
            });

            const cardIsiSurat = document.querySelector('.card-isi-surat');
            cardIsiSurat.innerHTML = isiSurat;

            //dengarkan dan pause audio

            const buttonPlay = document.querySelector('.audio-button-play');
            const buttonPause = document.querySelector('.audio-button-pause');
            const audioSurat = document.querySelector('#audio-tag');

            //Dengarkan
            buttonPlay.addEventListener('click', function(){
                buttonPlay.classList.add('hidden-button');
                buttonPause.classList.remove('hidden-button');
                audioSurat.play();
            });

            //Berhenti
            buttonPause.addEventListener('click', function(){
                buttonPause.classList.add('hidden-button');
                buttonPlay.classList.remove('hidden-button');
                audioSurat.pause();
            });
            
            // //End panggil isi
            console.log(surat);
        });
}

getSurat();