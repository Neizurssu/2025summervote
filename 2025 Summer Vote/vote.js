import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const DEADLINE = new Date("2025-07-07T23:59:59");

signInAnonymously(auth);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "votes"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty || new Date() > DEADLINE) {
      window.location.href = "thankyou.html";
    } else {
      document.getElementById("voteForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const candidate = document.querySelector('input[name="candidate"]:checked').value;
        await addDoc(collection(db, "votes"), {
          uid: uid,
          candidate: candidate,
          timestamp: new Date()
        });
        window.location.href = "thankyou.html";
      });
    }
  }
});