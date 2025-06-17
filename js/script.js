
const botao = document.getElementById('btnCadastrar');

botao.addEventListener('click',
    function () {
        let nome = JSON.parse(localStorage.getItem("nome")) || []; //localStorage é uma memória do computador
        const nomeLivro = {
            nome: document.getElementById('nome').value,
            nomeLivro: document.getElementById('nomeLivro').value,
            data: document.getElementById('data').value
        }

        const indexEditando = document.getElementById('indexEditar').value;
        if(indexEditando !== ""){
            nome[indexEditando] = nome;
            document.getElementById('indexEditar').value = "";
        }else{
            nome.push(nome);
        }
        
        let listarLeitores = JSON.stringify(nome);
        localStorage.setItem("nome", listarLeitores);
        document.getElementById('nome').value = '';
        document.getElementById('login').value = '';
        document.getElementById('senha').value = ''; 
        listar();
    }
);

//listar
function listar(){
    const lisarLeitoresCad = JSON.parse(localStorage.getItem("nome")) || [];
    console.log(lisarLeitoresCad);
    const tabelaListaleitores = document.getElementById('listarLeitores');
    tabelaListaleitores.innerHTML = "";

    //forEach percorrendo o vetor e apresentando Login e Senha 
    lisarLeitoresCad.forEach((nome, index) => { //função for que percorre o vetor (para cada)
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${nome.nome}</td>
            <td>${nome.nomeLivro}</td>
            <td>${nome.data}</td>
            <td>
                <button onclick="editarUsuario(${index})">Editar</button>
                <button onclick="excluirUsuario(${index})">Remover</button>
            </td>
        `;
        tabelaListaleitores.appendChild(linha);
    });
}

//remover
function excluirUsuario(index){
    const lisarLeitoresCad = JSON.parse(localStorage.getItem("nome"))||[];

    if (confirm("Você realmente deseja excluir?")){
        lisarLeitoresCad.splice(index, 1);
        listaJson = JSON.stringify(lisarLeitoresCad);
        localStorage.setItem("nome", listaJson);
        listar();
    }
}

function editarUsuario(index){
    const lisarLeitoresCad = JSON.parse(localStorage.getItem("nome"))||[];
    const nome = lisarLeitoresCad[index];
    document.getElementById('nome').value = nome.nome;
    document.getElementById('nomeLivro').value = nome.nomeLivro;
    document.getElementById('data').value = nome.data;
    document.getElementById('indexEditar').value = index;
}

listar();