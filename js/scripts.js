// Seleção de elementos
// Document é uma variável que tem como tipo uma interface, querySelector é uma função que retorna o primeiro elemento dentro do document, que tem como parametro uma string
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções
// é uma função que espera como parametro um texto
const saveTodo = (text) => {
    // createElement é uma função e cria o elemento HTML especificado, onde "div" é uma string que especifica o tipo do elemento, e "todo" é o objeto criado e retornado pela função
    const todo = document.createElement("div");
    // add é uma função que acrescenta um novo elemento como valor especificado no final de um objeto Set, tem como parametros o valor que é requerido a ser adicionado ao objeto Set e o valor de retorno é o próprio objeto Set
    todo.classList.add("todo");
    
    const todoTitle = document.createElement("h3");
    // innerText é uma propriedade que representa o conteúdo do texto renderizado, que retorna o texto que o usuário obteria caso tivesse selecionado o conteúco 
    todoTitle.innerText = text;
    // appendChild é uma função que insere um elemento filho ao elemento pai na última posição
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    // innerHTML é uma propriedade do Element que define ou retorna o conteúdo HTML de um elemento.
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    // innerHTML é uma propriedade do Element que define ou retorna o conteúdo HTML de um elemento.
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    // innerHTML é uma propriedade do Element que define ou retorna o conteúdo HTML de um elemento.
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    // focus é um evento e faz com que após inserir um valor, o usuário retorne para o input
    todoInput.focus();
};
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    // querySelectorAll é uma função que seleciona todos os elementos dentro do que for passado
    const todos = document.querySelectorAll(".todo");
    // forEach é um método utilizado para percorrer arrays, mas sua função é diferente do for, ele retorna uma função para cada elemento do array
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })

}
// Eventos
// addEventListener é uma função que registra uma única espera de evento em um único alvo, porém, pode ser usado para capturar diferentes tipos de eventos
todoForm.addEventListener("submit", (e) => {
    // preventDefault é uma função que cancela o evento se for cancelável, sem parar a propagação do mesmo
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        // saveTodo é uma função que espera como parametro um texto
        saveTodo(inputValue);
    }

});

document.addEventListener("click", (e) => {
    // target é um evento que retorna e faz uma referencia ao objeto que enviou o evento
    const targetEl = e.target
    // closest é uma função e seleciona o elemento mais próximo
    const parentEl = targetEl.closest("div")
    let todoTitle;
    
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    // contains é uma função e procura se existe certa classe/elemento
    if (targetEl.classList.contains("finish-todo")) {
        // toggle é uma função e é usado para verificar a visibilidade dos elementos selecionados para fazer alterações
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        // remove é uma função e remove o conteúdo que estiver sendo clicado
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        // muda o valor do input porque precisa estar com o valor pré-preenchido
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms();

})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms();
})