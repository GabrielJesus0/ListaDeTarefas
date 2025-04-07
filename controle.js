const area = document.querySelector('#areaLista');
const txt = document.querySelector('#txtTarefa');
const lista = [];
var pos = 0;

// Carregar informações anteriores quando abrir
document.addEventListener("DOMContentLoaded", carregarTarefas)

// Salvar Tarefas no navegador
function salvarTarefas(){
    localStorage.tarefas = JSON.stringify(area.innerHTML);
    localStorage.lista = JSON.stringify(lista);
    localStorage.pos = JSON.stringify(pos);
}
// Carregar as Tarefas no navegador
function carregarTarefas(){
    if( localStorage.tarefas && localStorage.lista ){
        area.innerHTML = JSON.parse(localStorage.tarefas);
        lista = JSON.parse(localStorage.lista);
        pos = JSON.parse(localStorage.pos);
    };
}

// Adicionar com Enter
txt.addEventListener('keydown', function(event){
    if( event.key === 'Enter' || event.code === "Enter" ){
        adicionarTarefa()
    }
})

function adicionarTarefa(){
    
    if (txt.value == ''){// Verificar vazio
        
        alert('Digite uma tarefa para ser adicionada')

    } else if( lista.indexOf(txt.value) != -1 ){// Verificar se já existe
        
        alert('Tarefa já listada')

    } else {
        // Adicionar em array
        lista.push(txt.value)
        pos++
        
        // Criar nova tarefa
        criarTarefa(txt.value)
        

    };

    txt.value = ''; // Zerar Texto
    txt.focus();
    
};

function criarTarefa(tarefa){
    var tar = document.createElement('div')
    tar.className = 'item'
    tar.id = `tarefa${pos}`
    
    area.insertAdjacentElement('afterbegin', tar)

    // Criação de item de acordo com o CSS e HTML
    tar.innerHTML= 
    `<div id="itemIcone" onclick = "concluirTarefa(this)">
        <i class="mdi mdi-checkbox-blank-circle-outline"></i>
    </div>
    <div id="itemNome" ondblclick="editarTarefa(this)">
        ${tarefa}
    </div>
    <div id="itemBotao">
        <i class="mdi mdi-pencil" onclick='editarTarefa(this)'></i>
        <i class="mdi mdi-delete" onclick='deletarTarefa(this)'></i> 
    </div>`; 
    salvarTarefas();
};

function deletarTarefa(elemento){
    let tarefa = document.querySelector(`#${elemento.closest('.item').id}`);
    let texto = tarefa.querySelector('#itemNome').innerText;

    pos = lista.indexOf(texto);
    lista.splice(pos, 1); // Retira do array


    tarefa.remove(); // Retira da tela
    salvarTarefas();

};

function concluirTarefa(elemento){
    let item = document.querySelector(`#${elemento.parentElement.id}`);
    let texto = item.querySelector('#itemNome');
    let edit = item.querySelector('#itemBotao');
    let check = elemento.innerHTML == '<i class="mdi mdi-check-circle"></i>';
    
    if (!check){ // Se estiver como não concluído
        area.appendChild(item);

        item.style.color = '#fff';
        item.style.backgroundColor = 'green';
        elemento.innerHTML = '<i class="mdi mdi-check-circle"></i>';
        
        // DELETAR
        
        edit.innerHTML = `<i class="mdi mdi-delete" onclick='deletarTarefa(this)'></i>`

        
        texto.innerHTML = `<s>${texto.innerText}</s>`;
        
        
    } else if (check){ // Se estiver concluído 
        area.insertAdjacentElement('afterbegin',item);

        item.style.color = '#000';
        item.style.backgroundColor = '#eeeeee';
        elemento.innerHTML = '<i class="mdi mdi-checkbox-blank-circle-outline"></i>';
        
        // EDITAR E DELETAR
        edit.innerHTML = `<i class="mdi mdi-pencil" onclick='editarTarefa(this)'></i><i class="mdi mdi-delete" onclick='deletarTarefa(this)'></i>`
        
        texto.innerHTML = `${texto.innerText}`; 
        
    };

    
};

function editarTarefa(elemento){
    let item = elemento.closest('.item');
    let texto = item.querySelector('#itemNome');
    let safe = texto.innerText; //Guardar texto original

        // Input de Edição
        var edit = document.createElement('input');
        edit.id = 'edit'
        edit.value = texto.innerText;
        edit.style.fontSize = '1.5rem';
        edit.style.marginRight = '10px';
        edit.addEventListener('keypress', (event) => {
            if (event.key == "Enter"){
                if(edit.value != ''){
                    texto.innerText = edit.value;
                    salvarTarefas();
                }
            }
        })

        texto.innerHTML = '';
        texto.appendChild(edit);

            //Botão Confirmar
        var confirm = document.createElement('i');
        confirm.className = "mdi mdi-check";
        confirm.style.color = 'green';
        confirm.style.cursor = 'pointer';
        confirm.addEventListener('mousedown', () => {
            
            if(edit.value !== ''){
                texto.innerText = edit.value;
                salvarTarefas();
            };
        })
        texto.appendChild(confirm);

            
            // Botão desfazer
        var remove = document.createElement('i');
        remove.className = "mdi mdi-close";
        remove.style.color = 'red';
        remove.style.cursor = 'pointer';
        remove.addEventListener('click', () => {
            blurPrevented = true;
            texto.innerHTML = '';
            texto.innerText = safe;
        })
        texto.appendChild(remove);
        
        edit.focus()
    
        edit.addEventListener('blur', () => {
            
                texto.innerHTML = '';
                texto.innerText = safe;
            
        })

};