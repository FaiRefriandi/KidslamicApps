//ambil tanggal hari ini

const getDate = new Date();
const getYear = getDate.getFullYear();
const getMonth = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan() {
	// body...
	if (getMonth < 10) {
		bulan = `0${getMonth}`;
	}else{
		bulan = getMonth;
	}
	return bulan;
}
function hari() {
	// body...
	if (getDay < 10) {
		hari = `0${getDay}`;
	}else{
		hari = getDay;
	}
	return hari;
}

const tanggal = `${getYear}/${bulan()}/${hari()}`;
const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulKota;

function getJadwalSholat() {
	fetch('https://api.myquran.com/v2/sholat/jadwal/' + localStorage.idkota + tanggal)
	.then(response => response.json())
	.then(data => {
		const jadwal = data.data.jadwal;
		document.querySelector('.imsak').textContent = jadwal.imsak;
		document.querySelector('.subuh').textContent = jadwal.subuh;
		document.querySelector('.terbit').textContent = jadwal.terbit;
		document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
		document.querySelector('.ashar').textContent = jadwal.ashar;
		document.querySelector('.maghrib').textContent = jadwal.maghrib;
		document.querySelector('.isya').textContent = jadwal.isya;
		document.querySelector('.tanggal').textContent = jadwal.tanggal;
	});
}

//pilih lokasi
const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function () {
	// body...
	const valueSearch = inputSearch.value.length;

	if (valueSearch > 0) {
		cardList.classList.remove('hidden-list');

		fetch('https://api.myquran.com/v2/sholat/kota/semua')
		.then(response => response.json())
		.then(response => {
			const kota = response.data;
			let listKota = '';
			kota.forEach( k => {
				listKota += `<a href="#" data-idkota="${k.id}/" id="nama-kota" class="list-group-item list-group-item-action">${k.lokasi}</a>`;
			});
			const namaKota = document.querySelector('.card-list');
			namaKota.innerHTML = listKota;
			//ketika kota diklik
			const isiKota = document.querySelectorAll('#nama-kota');
			isiKota.forEach(kota => {

				const filterText = inputSearch.value.toLowerCase();
				const itemText = kota.firstChild.textContent.toLowerCase();

				if (itemText.indexOf(filterText) != -1) {
					kota.setAttribute("style", "display:block");
				} else{
					kota.setAttribute("style", "display:none ! important");
				}

				kota.addEventListener('click', function(){
					const idkota = this.dataset.idkota;
					const judulKota = this.textContent;
					window.localStorage.setItem('idkota', idkota);
					window.localStorage.setItem('judulKota', judulKota);
					namaKota.classList.add('hidden-list');
					inputSearch.value = '' ;
					location.reload();
					alert(`MANTAP CUY ${judulKota} BERHASIL DIPILIH`);
				});
			});
		});

	} else{
		cardList.classList.add('hidden-list');
	}

});
getJadwalSholat();