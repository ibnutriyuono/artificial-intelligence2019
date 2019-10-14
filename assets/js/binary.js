const binarySearch = () => {
  let cari = document.getElementById("nomorpunggung").value;
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor((end + start) / 2);
  while (arr[mid].strNumber != cari && start < end) {
    if (cari < arr[mid].strNumber) {
      end = mid - 1;
      console.log("GESER KE KIRI");
    } else if (cari > arr[mid].strNumber) {
      start = mid + 1;
      console.log("GESER KE KANAN");
    }
    mid = Math.floor((end + start) / 2);
  }
  return arr[mid].strNumber != cari
    ? Swal.fire({
        type: "error",
        title: "Oops...",
        text: `Nomor punggung ${cari} tidak di temukan`
      })
    : Swal.fire({
        title: "<i>Data ditemukan</i>",
        animation: false,
        customClass: {
          popup: "animated flash"
        },
        html: `<div class="col s12 m4">
            <div class="card">
            <div class="card-image">
                <img
                src="${arr[mid].thumbnail}"
                />
                <span class="card-title" style="font-weight: bold;">${arr[mid].name}</span>
            </div>
            <div class="card-content">
                <p>
                Nationality : ${arr[mid].nationality} <br>
                Nomor Punggung : ${arr[mid].strNumber}
                </p>
            </div>
            </div>
        </div>`
      });
};

const listData = () => {
  let button = document.getElementById("databutton");
  button.parentNode.removeChild(button);
  arr.forEach(data => {
    let card = `<div class="col s12 m3">
            <div class="card">
              <div class="card-image">
                <img
                  src="${data.thumbnail}"
                />
                <span class="card-title" style="font-weight: bold;">${data.name}</span>
              </div>
              <div class="card-content">
                <p>
                  Nationality : ${data.nationality} <br>
                  Nomor Punggung : ${data.strNumber}
                </p>
              </div>
            </div>
          </div>`;
    let e = document.getElementById("data");
    e.innerHTML += card;
  });
};
