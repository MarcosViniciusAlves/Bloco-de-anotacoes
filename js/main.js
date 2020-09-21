const botaoAdicionar = document.querySelector("#enviar");
const formulario = document.querySelector("#tarefas");
const inpute = document.querySelector("#inpute");
const limparTudo = document.querySelector("#limparTudo");

window.onload = carregarElementos();

botaoAdicionar.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(!inpute.value) return;

    const li = criaLi(inpute.value,criaButton());
    
    adicionaNoForm(li);
    salvarElementos();
})

limparTudo.addEventListener("click",(e)=>{

    e.preventDefault();
    limparTarefas();

});

document.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        if(!inpute.value) return;

        const li = criaLi(inpute.value,criaButton());
        
        adicionaNoForm(li);
        salvarElementos();
    }
});

document.addEventListener("click",function (e) {

    const el = e.target;

    if(el.classList.contains("apagar")){
        el.parentElement.remove()
        salvarElementos();
    }

})

function carregarElementos(){
    let tarefas = localStorage.getItem("tarefa");
    tarefas = JSON.parse(tarefas);
    try{
        for(let tarefa of tarefas){
            let li = criaLi(tarefa,criaButton());
            adicionaNoForm(li);
        }
    }catch(e){
    }
  
}

function limparTarefas () {

    formulario.innerHTML = "";
    removerLocalStorage();

}

function criaButton () {
    const button = document.createElement("button");

    button.classList.add("apagar");
    button.innerHTML = " Apagar";
    button.setAttribute("type","button");

    return button;
}

function criaLi (conteudo,botao) {
    const li = document.createElement("li");
    
    li.innerText = conteudo;
    li.classList.add("elementoForm");
    li.appendChild(botao);
    
    return li;
}

function adicionaNoForm (li) {
    formulario.appendChild(li)
}

function salvaNoNavegador(elemento){
    localStorage.tarefa = elemento;
}

function removerLocalStorage(){
    localStorage.removeItem("tarefa");
}

function salvarElementos () {
    const tarefas = document.querySelectorAll("li");
    let tarefasSalvas = [];
    for (let li of tarefas) {
        let tarefa = (li.innerText);
        tarefa = tarefa.replace("Apagar","");
        tarefasSalvas.push(tarefa);
    }
    const tarefaJson = JSON.stringify(tarefasSalvas);
    salvaNoNavegador(tarefaJson);
}