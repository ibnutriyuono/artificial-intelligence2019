let history = []
const predict = () => {
    let namaukm = document.getElementById("namaukm").value;
    let lamakerja = document.getElementById("lamakerja").value;
    let jumlahpekerja = document.getElementById("jumlahpekerja").value;
    let omzet = document.getElementById("omzet").value;
    let jumlahaset = document.getElementById("jumlahaset").value;
    if (namaukm != '' && lamakerja != '' && jumlahpekerja != '' && omzet != '' && jumlahaset != '') {
        fetch(`http://localhost:5000/api/prediksi/?namaukm=${namaukm}&lamakerja=${lamakerja}&jumlahpekerja=${jumlahpekerja}&omzet=${omzet}&jumlahaset=${jumlahaset}`)
            .then((response) => {
                return response.json();
            })
            .then((dataukm) => {
                if (dataukm['Hasil'][1] == "Tidak") {
                    Swal.fire({
                            type: "error",
                            title: "Maaf",
                            text: `Penerima Modal pada unit usaha atas nama ${namaukm} ${dataukm['Hasil'][1].toLowerCase()} di terima`,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Lihat detail perhitungan'
                        })
                        .then((result) => {
                            if (result.value) {
                                fetch(`http://localhost:5000/api/prediksi/data/?namaukm=${namaukm}&lamakerja=${lamakerja}&jumlahpekerja=${jumlahpekerja}&omzet=${omzet}&jumlahaset=${jumlahaset}`)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        history.push({
                                            'namaukm': data.nama,
                                            'lamakerja': lamakerja,
                                            'jumlahpekerja': jumlahpekerja,
                                            'omzet': omzet,
                                            'jumlahaset': jumlahaset,
                                            'keterangan': data.keterangan,
                                        })
                                        Swal.fire({
                                            title: "<i>Detail Data Perhitungan</i>",
                                            animation: false,
                                            customClass: {
                                                popup: "animated fadeInDown faster"
                                            },
                                            html: `<div class="col s12 m4">
                                    <div class="card">
                                        <div class="card-content">
                                            <p>
                                            Nama UKM : ${data.nama} <br>
                                            Peluang Tidak : ${data.peluangtidak.toFixed(3)} <br>
                                            Peluang Tunda : ${data.peluangtunda.toFixed(3)} <br>
                                            Peluang Ya : ${data.peluangya.toFixed(3)} <br>
                                            Peluang Terbesar : ${data.peluangmax.toFixed(3)} <br>
                                            Keterangan : ${data.keterangan}
                                            </p>
                                            <table class="stripped highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Nama UKM</th>
                                                        <th>LAMA USAHA</th>
                                                        <th>JUMLAH PEKERJA</th>
                                                        <th>Omzet</th>
                                                        <th>JUMLAH ASET</th>
                                                    </tr>
                                                </thead>
                                                <tbody>                                                 
                                                <tr>
                                                    <td>${data.kriteria[0][0]}</td>
                                                    <td>${data.kriteria[0][1]}</td>
                                                    <td>${data.kriteria[0][2]}</td>
                                                    <td>${data.kriteria[0][3]}</td>
                                                    <td>${data.kriteria[0][4]}</td>
                                                <tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>`
                                        })
                                    })
                            }
                        })
                } else if (dataukm['Hasil'][1] == "Tunda") {
                    Swal.fire({
                            type: "warning",
                            title: "Maaf",
                            text: `Penerima Modal pada unit usaha atas nama ${namaukm} masih di ${dataukm['Hasil'][1].toLowerCase()}`,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Lihat detail perhitungan'
                        })
                        .then((result) => {
                            if (result.value) {
                                fetch(`http://localhost:5000/api/prediksi/data/?namaukm=${namaukm}&lamakerja=${lamakerja}&jumlahpekerja=${jumlahpekerja}&omzet=${omzet}&jumlahaset=${jumlahaset}`)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        history.push({
                                            'namaukm': data.nama,
                                            'lamakerja': lamakerja,
                                            'jumlahpekerja': jumlahpekerja,
                                            'omzet': omzet,
                                            'jumlahaset': jumlahaset,
                                            'keterangan': data.keterangan,
                                        })
                                        Swal.fire({
                                            title: "<i>Detail Data Perhitungan</i>",
                                            animation: false,
                                            customClass: {
                                                popup: "animated fadeInDown faster"
                                            },
                                            html: `<div class="col s12 m4">
                                        <div class="card">
                                            <div class="card-content">
                                                <p>
                                                Nama UKM : ${data.nama} <br>
                                                Peluang Tidak : ${data.peluangtidak.toFixed(3)} <br>
                                                Peluang Tunda : ${data.peluangtunda.toFixed(3)} <br>
                                                Peluang Ya : ${data.peluangya.toFixed(3)} <br>
                                                Peluang Terbesar : ${data.peluangmax.toFixed(3)} <br>
                                                Keterangan : ${data.keterangan}
                                                </p>
                                                <table class="stripped highlight">
                                                    <thead>
                                                        <tr>
                                                            <th>Nama UKM</th>
                                                            <th>LAMA USAHA</th>
                                                            <th>JUMLAH PEKERJA</th>
                                                            <th>Omzet</th>
                                                            <th>JUMLAH ASET</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>                                                 
                                                    <tr>
                                                        <td>${data.kriteria[0][0]}</td>
                                                        <td>${data.kriteria[0][1]}</td>
                                                        <td>${data.kriteria[0][2]}</td>
                                                        <td>${data.kriteria[0][3]}</td>
                                                        <td>${data.kriteria[0][4]}</td>
                                                    <tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>`
                                        })
                                    })
                            }
                        })
                } else {
                    Swal.fire({
                            type: "success",
                            title: "Selamat",
                            text: `Penerima Modal pada unit usaha atas nama ${namaukm} di terima`,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Lihat detail perhitungan'
                        })
                        .then((result) => {
                            if (result.value) {
                                fetch(`http://localhost:5000/api/prediksi/data/?namaukm=${namaukm}&lamakerja=${lamakerja}&jumlahpekerja=${jumlahpekerja}&omzet=${omzet}&jumlahaset=${jumlahaset}`)
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(data => {
                                        history.push({
                                            'namaukm': data.nama,
                                            'lamakerja': lamakerja,
                                            'jumlahpekerja': jumlahpekerja,
                                            'omzet': omzet,
                                            'jumlahaset': jumlahaset,
                                            'keterangan': data.keterangan,
                                        })
                                        Swal.fire({
                                            title: "<i>Detail Data Perhitungan</i>",
                                            animation: false,
                                            customClass: {
                                                popup: "animated fadeInDown faster"
                                            },
                                            html: `<div class="col s12 m4">
                                            <div class="card">
                                                <div class="card-content">
                                                    <p>
                                                    Nama UKM : ${data.nama} <br>
                                                    Peluang Tidak : ${data.peluangtidak.toFixed(3)} <br>
                                                    Peluang Tunda : ${data.peluangtunda.toFixed(3)} <br>
                                                    Peluang Ya : ${data.peluangya.toFixed(3)} <br>
                                                    Peluang Terbesar : ${data.peluangmax.toFixed(3)} <br>
                                                    Keterangan : ${data.keterangan}
                                                    </p>
                                                    <table class="stripped highlight">
                                                        <thead>
                                                            <tr>
                                                                <th>Nama UKM</th>
                                                                <th>LAMA USAHA</th>
                                                                <th>JUMLAH PEKERJA</th>
                                                                <th>Omzet</th>
                                                                <th>JUMLAH ASET</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>                                                 
                                                        <tr>
                                                            <td>${data.kriteria[0][0]}</td>
                                                            <td>${data.kriteria[0][1]}</td>
                                                            <td>${data.kriteria[0][2]}</td>
                                                            <td>${data.kriteria[0][3]}</td>
                                                            <td>${data.kriteria[0][4]}</td>
                                                        <tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>`
                                        })
                                    })
                            }
                        })
                }
            });
    } else {
        Swal.fire({
            type: "error",
            title: "Maaf",
            text: `isi semua input yang telah disediakan`
        });
    }
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
                for (let i = 0; i < data.data.length; i++) {
                    let newRow = table.insertRow(table.length);
                    for (let j = 0; j < data.data[i].length; j++) {
                        let cell = newRow.insertCell(j);
                        cell.innerHTML = data.data[i][j];
                    }
                }
            })
    } else {
        document.getElementById("databutton").value = "Tampilkan Data"
        let node = document.getElementById("table");
        for (let i = node.rows.length - 1; i > 0; i--) {
            node.deleteRow(i);
        }
    }
}

const getHistory = () => {
    if (document.getElementById("historybutton").value == "Tampilkan History") {
        document.getElementById("historybutton").value = "Sembunyikan History"
        let col = [];
        for (let i = 0; i < history.length; i++) {
            for (let key in history[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        let table = document.createElement("table");
        let tr = table.insertRow(-1);
        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        for (let i = 0; i < history.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = history[i][col[j]];
            }
            let divContainer = document.getElementById("historydata");
            divContainer.innerHTML = "<h3>History</h3>";
            divContainer.appendChild(table);
        }
    } else {
        document.getElementById("historybutton").value = "Tampilkan History"
        let node = document.getElementById("historydata");
        node.innerHTML = ''
    }
}