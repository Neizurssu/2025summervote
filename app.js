import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk4LLdxRY-lNUBXGSOmwI1TQ4x2PU39nU",
  authDomain: "summer-vote-41730.firebaseapp.com",
  projectId: "summer-vote-41730",
  storageBucket: "summer-vote-41730.firebasestorage.app",
  messagingSenderId: "489725461861",
  appId: "1:489725461861:web:037ff9ee23eff483154d8c",
  measurementId: "G-R6G6VFKPJL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userId = null;

signInAnonymously(auth)
  .then(() => {
    console.log("익명 로그인 성공");
  })
  .catch((error) => {
    console.error("익명 로그인 실패:", error);
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    console.log("사용자 ID:", userId);
  }
});

window.vote = async function(candidate) {
  if (!userId) {
    alert("로그인 중입니다. 잠시만 기다려 주세요.");
    return;
  }

  const voteDoc = doc(db, "votes", userId);
  const docSnap = await getDoc(voteDoc);

  if (docSnap.exists()) {
    alert("이미 투표하셨습니다.");
    return;
  }

  await setDoc(voteDoc, {
    candidate: candidate,
    timestamp: Date.now()
  });

  document.getElementById('message').innerText = "투표 완료! 감사합니다.";
}
