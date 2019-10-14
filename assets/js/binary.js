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

const linearSearch = () => {
  let playerNumber = document.getElementById("nomorpunggung").value;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].strNumber == playerNumber) {
      console.log("KETEMU");
      return Swal.fire({
        title: "<i>Data ditemukan</i>",
        animation: false,
        customClass: {
          popup: "animated flash"
        },
        html: `<div class="col s12 m4">
            <div class="card">
            <div class="card-image">
                <img
                src="${arr[i].thumbnail}"
                />
                <span class="card-title" style="font-weight: bold;">${arr[i].name}</span>
            </div>
            <div class="card-content">
                <p>
                Nationality : ${arr[i].nationality} <br>
                Nomor Punggung : ${arr[i].strNumber}
                </p>
            </div>
            </div>
        </div>`
      });
    } else {
      console.log(`DATA TIDAK DI TEMUKAN MAJU KE ITERASI ${i}`);
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: `Nomor punggung ${playerNumber} tidak di temukan`
      });
    }
  }
};
