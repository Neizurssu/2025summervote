import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function showResults() {
  const snapshot = await getDocs(collection(db, "votes"));
  const counts = {};
  snapshot.forEach((doc) => {
    const data = doc.data();
    counts[data.candidate] = (counts[data.candidate] || 0) + 1;
  });

  const resultList = document.getElementById("results");
  Object.entries(counts).forEach(([name, count]) => {
    const li = document.createElement("li");
    li.textContent = `${name}: ${count}표`;
    resultList.appendChild(li);
  });
}

showResults();