const listaAlunos = [];
const form = document.querySelector('#formulario');

form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = e.target.querySelector('#nome').value;
    const telefone = e.target.querySelector('#telefone').value;
    const dataNascimento = e.target.querySelector('#data-nascimento').value;
    const notaFinal = e.target.querySelector('#nota-final').value;

    if (nome === "") {
        setResultado("Preencha o campo 'Nome'!", false);
        return;
    }else if (!validaTelefone(telefone)) {
        setResultado("Telefone Inválido! Digite um número válido (incluindo ddd)!", false);
        return;
    }else if (!validaNota(notaFinal)) {
        setResultado("Valor de nota inválido! Digite um número entre 0 e 10!", false);
        return;
    }

    let aluno = {nome: nome, telefone:telefone, dataNascimento: converteData(dataNascimento), nota:notaFinal};
    listaAlunos.push(aluno);

    let msg = `Aluno(a) cadastrado(a) com sucesso!`;
    setResultado(msg, true);
    geraLista();    
})

function geraLista() {
    const cadastrosExibidos = document.querySelector("#cadastrosExibidos");
    cadastrosExibidos.innerHTML = "";
    let listaExibida = '';
	let i = 0;
		for (element of listaAlunos) {
			listaExibida += `<b>Nome: </b> ${element.nome} <br><b>Telefone: </b> ${element.telefone} <br><b>Data de Nascimento: </b> ${element.dataNascimento} <br><b>Nota final do Curso: </b> ${element.nota} <br><br>`;
			}
    const p = criaP();
    p.innerHTML = listaExibida;
    cadastrosExibidos.appendChild(p);

}

function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHtml = "";

    const p = criaP();

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);

    removeP(resultado, 5);

}

function criaP() {
    const p = document.createElement('p');
    return p;
}

function validaTelefone(telefone) {
    if (isNaN(Number(telefone))) {
        return false;
    } else if (telefone.length < 10) {
        return false;
    }
    return true;
}

function validaNota(nota) {
    let notaNumerica = Number(nota);
    if (nota === "") {
        return false;
    }else if (isNaN(Number(nota))) {
        return false;
    } else if (notaNumerica < 0 || notaNumerica > 10) {
        return false;
    }
    return true;
}

function converteData(data) {
    const novaData = new Date(data);
    return novaData.toLocaleString('pt-BR', {timeZone: "UTC", dateStyle:'short'});
}

function removeP(paragrafo, tempo) {
    setTimeout(() => {
        paragrafo.innerHTML = "";
    }, tempo * 1000);
}

