// src/main.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

// Example function to read data from Firestore
async function lerBD() {
    let products = [];
    let count = 0;
    await getDocs(collection(db, 'products')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            products[count] = { id: doc.id, data: doc.data() };
            count++;
            console.log(doc.id, " => ", doc.data());
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
    count = 0;
    desenhar(products);
}


function pesquisar(value) {
    FILTRO = value;
    desenhar()
}


export function desenhar(e) {
    const tbody = document.getElementById('listaRegistrosBody');
    if (tbody) {
        // Clear existing tbody content
        tbody.innerHTML = '';

        // Assuming e is an array of objects with id, data.nome, and data.preco properties
        var data = [...e];

        for (let i = 0; i < data.length; i++) {
            const { id, data: { nome, preco } } = data[i];

            tbody.innerHTML += `<tr>
                <td>${id}</td>
                <td>${nome}</td>
                <td>${preco}</td>
                <td>
                    <button onclick="MyApp.editUsuario('${id}')"><a href="cadastro.html?key1=${nome}&key2=${preco}&key3=${id}">Editar</a></button>
                    <button class='vermelho' onclick="MyApp.perguntarSeDeleta('${id}')">Deletar</button>
                </td>
            </tr>`;
        }
    }
}

export async function deleteUsuario(id) {
    await deleteDoc(doc(db, "products", id));
    location.reload();
    
}

export async function perguntarSeDeleta(id) {
    console.log(id);
    if (confirm('Quer deletar o registro de id: ' + id + '?')) {
        await deleteUsuario(id);
    }
}


function editUsuario(id, nome, fone) {
    console.log(id);
    Salvar()
    desenhar()
}


function limparEdicao() {
    document.getElementById('nome').value = ''
    document.getElementById('preco').value = ''
}



window.addEventListener('load', () => {
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar(e.target.value)
    });
    lerBD();
})