const predict = () => {
    let button = document.getElementById("databutton");
    let namaukm = document.getElementById("namaukm").value;
    let lamakerja = document.getElementById("lamakerja").value;
    let jumlahpekerja = document.getElementById("jumlahpekerja").value;
    let omzet = document.getElementById("omzet").value;
    let jumlahaset = document.getElementById("jumlahaset").value;
    fetch(`http://localhost:5000/api/prediksi/?namaukm=${namaukm}&lamakerja=${lamakerja}&jumlahpekerja=${jumlahpekerja}&omzet=${omzet}&jumlahaset=${jumlahaset}`)
        .then((response) => {
            return response.json();
        })
        .then((dataukm) => {
            if (dataukm['Hasil'][1] == "Tidak") {
                Swal.fire({
                    type: "error",
                    title: "Maaf",
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} di ${dataukm['Hasil'][1]}`
                });
            } else if (dataukm['Hasil'][1] == "Tunda") {
                Swal.fire({
                    type: "warning",
                    title: "Maaf",
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} di ${dataukm['Hasil'][1]}`
                });
            } else {
                Swal.fire({
                    type: "success",
                    title: "Selamat",
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} di terima`
                });
            }
        });
    console.log('kekw')
};