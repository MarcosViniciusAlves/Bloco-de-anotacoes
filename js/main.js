const botaoAdicionar = document.querySelector("#enviar");
const formulario = document.querySelector("#tarefas");
const inpute = document.querySelector("#inpute");
const limparTudo = document.querySelector("#limparTudo");

//carrega os elementos ao carregar a página.
window.onload = carregarElementos();

//adiciona um observer no botao e adicionar uma tarefa.
botaoAdicionar.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(!inpute.value) return;

    //referência a função que faz um elemento li com o conteúdo do input e um botão de apagar.
    const li = criaLi(inpute.value,criaButton());
    
    //adiciona no formulario um elemento li.
    adicionaNoForm(li);

    //salva os elementos no local storage.
    salvarElementos();
})

//adiciona um observer no botao de limpar tudo.
limparTudo.addEventListener("click",(e)=>{

    e.preventDefault();

    //limpa as tarefas.
    limparTarefas();

});

//adiciona um evento de tecla pressionada no documento da página.
document.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        
        //verifica se tem algum conteúdo no input antes de adicionar no li.
        if(!inpute.value) return;

        //referência uma função que cria um elemento li com o conteúdo do input e um botão de apagar.
        const li = criaLi(inpute.value,criaButton());
        
        //adiciona no formulário o elemento li.
        adicionaNoForm(li);

        //salva elemento no local storage.
        salvarElementos();
    }
});


//adiciona um observer ao documento.
document.addEventListener("click",function (e) {

    const el = e.target;

    //identifica se o elemento clicado tem a classe apagar , que é do botão de apagar uma tarefa.
    if(el.classList.contains("apagar")){
        
        //remove o elemento pai do elemento filho.
        el.parentElement.remove()
        
        //salva no local storage.
        salvarElementos();
    }

})

//adiciona ao formulário o li.
function adicionaNoForm (li) {
    formulario.appendChild(li)
}

//salva as tarefas em um array , transforma em string e salva no local storage.
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


//carrega os elementos q estão salvos no local storage.
function carregarElementos(){
    
    //instância as tarefas do local storage.
    let tarefas = localStorage.getItem("tarefa");

    //transforma em array novamente.
    tarefas = JSON.parse(tarefas);
    
    //tenta executar o for e carregar os elementos.
    try{
        for(let tarefa of tarefas){
            let li = criaLi(tarefa,criaButton());
            adicionaNoForm(li);
        }
    }

    //se tiver um erro não vai acontecer nada.
    catch(e){}
  
}

//limpa todas as tarefas.
function limparTarefas () {

    //limpa os elementos do formulário.
    formulario.innerHTML = "";
    
    //remove tudo do local storage.
    removerLocalStorage();

}

//cria um botão apagar para as tarefas.
function criaButton () {
    const button = document.createElement("button");

    button.classList.add("apagar");
    button.innerHTML = " Apagar";
    button.setAttribute("type","button");

    return button;
}

//cria um elemento li , recebe um conteúdo e um botao , retorna ele mesmo.
function criaLi (conteudo,botao) {
    const li = document.createElement("li");
    
    li.innerText = conteudo;
    li.classList.add("elementoForm");
    li.appendChild(botao);
    
    return li;
}


//salva no local storage as tarefas.
function salvaNoNavegador(elemento){
    localStorage.tarefa = elemento;
}

//remove do local storage as tarefas.
function removerLocalStorage(){
    localStorage.removeItem("tarefa");
}

