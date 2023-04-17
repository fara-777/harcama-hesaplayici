const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formbtn = document.querySelector(".btn");
const liste = document.querySelector(".liste");
const ToplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const inputName = document.querySelector("#input-name");

// taraycidan ismi alma
const username = localStorage.getItem("name") || "";
inputName.value = username;

// kullanicinin  girdigi ismi taraycinin depolamasinda saklama
inputName.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

// Izleme islemleri

formbtn.addEventListener("click", addexpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  ToplamBilgi.innerText = toplam;
}
// Harcama olsturma

function addexpense(e) {
  e.preventDefault();

  // dogurlama yapma > bos yazi basmasini engelliyoruz
  // ! isareti burda null,bos ve ya undefined
  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Formlari doldurun");
    // fonksionu durduruyoruz
    return;
  }

  // div olusturma
  const harcamaDiv = document.createElement("div");

  // class ekleme
  harcamaDiv.classList.add("harcama");
  // eger checkbox tiklandiysa bir class daha ekledi
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  // icerigini ayarlama

  harcamaDiv.innerHTML = `      
    <h2>${harcamaInput.value}</h2>
    <h2 id="value" >${fiyatInput.value}</h2>
  <div class="buttons">
    <img id="payment" src="/img/pay.png" alt="" />
    <img id="remove" src="/img/remove.png" alt="" />
  </div>`;

  // olusan harcamayi htmle gonderme (listeye ekleme)

  liste.appendChild(harcamaDiv);

  //Toplami guncelle

  updateToplam(fiyatInput.value);

  // formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//listeye tiklama olayini yonetme
function handleClick(e) {
  // tiklanilan elemani alma
  const element = e.target;
  if (element.id === "remove") {
    // tiklanilan sil butonunun kapsayicisini alma
    const wrapperElement = element.parentElement.parentElement;
    // silinen elemanin fiyatini alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    //silinenin fiyatini toplamdan cikarma
    updateToplam(-Number(deletedPrice));
    // kapsayiciyi htmlden kaldirma
    wrapperElement.remove();
  }
}
//filtreleme
function handleFilter(e) {
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (item.classList.contains("payed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
