//הקצאת מערכים גלובליים
var listBooks = [];
selectedBooks = [];
bookAttributes = ["Code", "Title", "Author", "Year", "Pages", "IsActive"]


//addeventlistner הוספת הכפתורים ל
load.addEventListener("click", loadBooksAjax)
searchBtn.addEventListener("click", findBooks)


//יצירת הכותרת
let selected = document.createElement("div");
let body = document.getElementsByTagName("body")[0]
body.appendChild(selected);

// var radios = document.querySelectorAll('input[type=radio][name="active"]');
//מסנן לפי ה-radio button
function changeHandler() {
    if (document.getElementById('active').checked) {
        createBookTable(listBooks.filter(e => e.IsActive == 1))
    }
    else if (document.getElementById('noActive').checked) {
        createBookTable(listBooks.filter(e => e.IsActive == 0))
    }
}

function loadData() {
    fetch('book.js')

        .then(reponse => reponse.json())
        .then(data => {
            listBooks = data.map
                (elem => new Book(elem.isbn, elem.title, elem.author, elem.year, elem.pages, elem.isActive))
            createBookTable(listBooks)
        })
        .catch(error => console.log(error))
}



function filterDataTable() {
    createBookTable(listBooks.filter(e => JSON.stringify(e).includes(document.getElementById("filterInput").value)))
   
}

//סינון טבלה
function filetrDataTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable")
    tr = table.getElementsByTagName("tr");
    td = table.getElementsByTagName("td");
    for (i = 0; i < tr.length; i++) {
       
            td = tr[i].getElementsByTagName("td")[0]
            if (td.innerHTML) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

function sortDataTable() {
    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    // do the work...
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr));
    })));

}





// ajax טעינת רשימת הספרים ע"י קריאת   
function loadBooksAjax() {
    // fetch('books.json')
    fetch('book.js')

        .then(response => response.json())
        .then(data => {
            listBooks = data.map
                (elem => new Book(elem.isbn, elem.title, elem.author, elem.year, elem.pages, elem.isActive))
            createBookTable(listBooks)
        })
        .catch(error => console.log(error))
}

function searchDynamicData(id)
{
    debugger;
    createBookTable(listBooks.filter( e=> JSON.stringify(e).includes(document.getElementById(id).value)))
}

// חיפוש ברשימת הספרים
function findBooks() {
    debugger;
    createBookTable(listBooks.filter(e => JSON.stringify(e).includes(document.getElementById("search").value)))
}

// יצירת טבלה דינמית

let table = document.getElementById("myTable")

function createBookTable(listBooks) {
    table.innerHTML = '';
    console.log(bookAttributes);
    for (let i = 0; i <= listBooks.length; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j <= 5; j++) {
            let td = document.createElement("td");
            if (i == 0) {
                td.innerHTML = bookAttributes[j]
            }
            else {
                if (j == 0)
                    td.innerHTML = listBooks[i - 1].Code;
                if (j == 1)
                    td.innerHTML = listBooks[i - 1].Title;
                if (j == 2)
                    td.innerHTML = listBooks[i - 1].Author;
                if (j == 3)
                    td.innerHTML = listBooks[i - 1].Year;
                if (j == 4)
                    td.innerHTML = listBooks[i - 1].Pages;
                if (j == 5)
                    td.innerHTML = listBooks[i - 1].IsActive;
            }

            tr.appendChild(td);
            td.style.border = "solid 0.5px";
            td.style.textAlign = "center";
        }
        table.appendChild(tr);
        if (i != 0)
            // לחיצה על שורה בטבלה
            tr.addEventListener("click", function () {
                tr.style.backgroundColor = "pink"
                let date = new Date();
                date = (date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear())
                let b = new Book(listBooks[i - 1].Code, listBooks[i - 1].Title, listBooks[i - 1].Author, listBooks[i - 1].Year,
                    listBooks[i - 1].IsActive
                );
                b.SelctedDate = date;
                selectedBooks.push(b)
                localStorage.setItem("selectedBook", JSON.stringify(selectedBooks));
                selected.innerHTML += ", " + b.Title + " - " + b.SelctedDate + " "
            })
        tr.addEventListener("mouseleave", function () { tr.style.backgroundColor = "white" })

    }
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(table);

    ;
}

//עיצוב האלמנטים

//עיצוב טבלה
table.style.width = "60%";
table.style.borderCollapse = "Collapse";
table.style.marginLeft = "20%";
table.style.marginTop = "30px"

//עיצוב הכותרת
selected.style.marginLeft = "26%";
selected.style.marginTop = "20px";
selected.innerHTML = "ספרים נבחרים"
selected.style.setProperty("width", "50%")
selected.style.setProperty("height", "auto")
selected.style.setProperty("text-align", "right")
selected.style.setProperty("border", "solid")
selected.style.setProperty("border-width", "35%")





