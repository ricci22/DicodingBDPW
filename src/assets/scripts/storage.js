const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof (Storage) !== "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            // JSON.parse() untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JS
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        // unshift() untuk menambahkan nilai baru pd array yg ditempatkan pd awal index
        // fungsi ini juga mengembalikan panjang array stelah ditambahkan dengan nilai baru
        historyData.unshift(data);
        if (historyData.length > 5) {
            historyData.pop();
        }
        // JSON.stringify() untuk mengubah objek JS ke dalam bentuk string
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// mengembalikan nilai array localStorage jika sudah memiliki nilai sbelumnya melalui JSON.parse()
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

// merender data riwayat kalkulasi pada tabel HTML
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
        historyList.appendChild(row);
    }
}

renderHistory();

// Session Storage
const cacheKey = "NUMBER";
if (typeof (Storage) !== "undefined") {
    // pengecekan apakah data sessionStorage dengan key NUMBER tersedia atau belum
    if (sessionStorage.getItem(cacheKey) === "undefined") {
        // jika belum maka akan atur dengan nilai awal yakni 0
        sessionStorage.setItem(cacheKey, 0);
    }
    const btnSessionStorage = document.querySelector("#btnSessionStorage");
    const countSessionStorage = document.querySelector("#countSessionStorage");
    btnSessionStorage.addEventListener('click', function (event) {
        let number = sessionStorage.getItem(cacheKey);
        number++;
        sessionStorage.setItem(cacheKey, number);
        countSessionStorage.innerText = sessionStorage.getItem(cacheKey);
    });
} else {
    alert("Browser tidak mendukung web storage");
}

// Local Storage
const cacheKey2 = "NUMBER2";
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem(cacheKey2) === "undefined") {
        localStorage.setItem(cacheKey2, 0);
    }

    const btnLocalStorage = document.querySelector("#btnLocalStorage");
    const countLocalStorage = document.querySelector("#countLocalStorage");
    const clearLocalStorage = document.querySelector("#clearLocalStorage");
    btnLocalStorage.addEventListener('click', function (event) {
        let number2 = localStorage.getItem(cacheKey2);
        number2++;
        localStorage.setItem(cacheKey2, number2);
        countLocalStorage.innerText = localStorage.getItem(cacheKey2);
    });
    clearLocalStorage.addEventListener('click', function (event) {
        localStorage.removeItem(cacheKey2);
    });
} else {
    alert("Browser tidak mendukung web storage");
}
