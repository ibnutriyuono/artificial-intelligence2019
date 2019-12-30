const predict = () => {
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
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} ${dataukm['Hasil'][1].toLowerCase()} di terima`
                });
            } else if (dataukm['Hasil'][1] == "Tunda") {
                Swal.fire({
                    type: "warning",
                    title: "Maaf",
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} masih di ${dataukm['Hasil'][1].toLowerCase()}`
                });
            } else {
                Swal.fire({
                    type: "success",
                    title: "Selamat",
                    text: `Penerima Modal pada unit usaha atas nama ${namaukm} di terima`
                });
            }
        });
};

const getdata = () => {
    if (document.getElementById("databutton").value == "Tampilkan Data") {
        document.getElementById("databutton").value = "Sembunyikan Data"
        fetch(`http://localhost:5000/api/data`)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                table = document.getElementById("table");
                for (var i = 0; i < data.data.length; i++) {
                    var newRow = table.insertRow(table.length);
                    for (var j = 0; j < data.data[i].length; j++) {
                        var cell = newRow.insertCell(j);
                        cell.innerHTML = data.data[i][j];
                    }
                }
            })
    } else {
        document.getElementById("databutton").value = "Tampilkan Data"
        var node = document.getElementById("table");
        for (var i = node.rows.length - 1; i > 0; i--) {
            node.deleteRow(i);
        }
        console.log('kekw2')
    }
}