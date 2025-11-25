function getBerita(){
    fetch('https://api-berita-indonesia.vercel.app/republika/islam')
    .then(response => response.json())
    .then(data => {
        const berita = data.data.posts;
        console.log(berita);
    }); 
}
getBerita();