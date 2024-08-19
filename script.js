import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const DATABASE_URL = "https://leads-tracker-app-8e6ab-default-rtdb.firebaseio.com/"

const firebaseConfig = {
    databaseURL: DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");


function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

onValue(referenceInDB, (snapshot) => {
    const snapshotDoesExist = snapshot.exists();
    if (snapshotDoesExist) {
        const data = snapshot.val();
        const leads = Object.values(data);
        render(leads);
    }
    
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value);
    inputEl.value = "";
})
