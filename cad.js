import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, addDoc, doc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2ajL9-W5MinlOV1Tjq50LWFC76OFqSRI",
    authDomain: "mobileproject-boer.firebaseapp.com",
    projectId: "mobileproject-boer",
    storageBucket: "mobileproject-boer.appspot.com",
    messagingSenderId: "1050227824810",
    appId: "1:1050227824810:web:95801181242bdfae6518d3",
    measurementId: "G-1XJEPD23N7",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

document.getElementById('save').addEventListener('click', Salvar);

let prod = document.getElementById("nome");
let preco = document.getElementById("preco");

const urlParams = new URLSearchParams(window.location.search);

async function Salvar() {
    const id = urlParams.get('key3');
    if (id) {
        console.log(prod, preco, id);
        const docRef = doc(db, "products", id);
        await setDoc(docRef, {
            nome: prod.value,
            preco: preco.value,
        })
    } else {
        prod = document.getElementById("nome").value;
        preco = document.getElementById("preco").value;
        if (prod == "" || preco == "") {
            return console.log("erro");
        }
        await addDoc(collection(db, "products"), {
            nome: prod,
            preco: preco,
        });
    }
    
    console.log('salvo');
}
function loadInfo(nome, price){
    prod.value = nome;
    preco.value = price;
}

window.addEventListener('load', () => {
    const key1 = urlParams.get('key1');
    const key2 = urlParams.get('key2');
    console.log(key1, key2);
    loadInfo(key1, key2)
})