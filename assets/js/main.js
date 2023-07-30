class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos(); //  executa assim que carregar a classe

    }

    eventos() {
        this.formulario.addEventListener('submit', e => {       // arrow não permite que o this se altere
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // métodos para definir se enviamos o formulario: 
        const FildsValid = this.FildsAreValid(); //  Verifica os campos se são validos. 
        const validPasswords = this.validPasswords(); // verificar se os campos senha e repetir senha são validos.

        if(FildsValid && validPasswords) {  // caso fildsValid e validPassword retornar true
            alert('Formulário enviado');
            this.formulario.submit(); // executa o submit do formulário e ele é enviado 
        }
    }

    FildsAreValid() {
        let valid = true;
        
        for(let errorText of this.formulario.querySelectorAll('.error-text')) { // Percorre cada elemento que tem error-text
            errorText.remove(); //  remove: Remover o elemento e seus filhos do DOM.  Remove cada error-text
        }

        for(let campo of this.formulario.querySelectorAll('.campoValidar')) {
            const label = campo.previousElementSibling.innerText; // pegue o irmão anterior do campo(é o label) e pegue seu texto
            if(!campo.value) {  //uma string vazia avalia em false
                this.createError(campo, `${label} não pode estar em branco`); // usa o label para dizer o nome do campo
                valid = false; // porque os campos estão branco
                
         }
            if(campo.classList.contains('cpf')) {  // se campo conter cpf cai aqui
                if(!this.ValidaCPF(campo)) valid = false;  // caso o resultado de validaCPF retorne/de falso. Mesma coisa que if(this.ValidaCPF(campo) == false) valid = false;  
            }

            if(campo.classList.contains('usuario')) {  // se campo conter cpf cai aqui
                if(!this.validaUsuario(campo)) valid = false;  // caso o resultado de validaCPF retorne/de falso. Mesma coisa que if(this.ValidaCPF(campo) == false) valid = false;  
            }     
    }
            return valid;
}

    validPasswords() {          // função para verificar se as senhas são validas
        let passValid = true;
        const senha = this.formulario.querySelector('.senha'); // pega o campo senha
        const repetirSenha = this.formulario.querySelector('.repetir-senha'); //  pega repetir senha

        if(senha.value !== repetirSenha.value) { //  verificar se é diferente
            passValid = false;
            this.createError(senha, 'Campos senhas e repetir senham precisam ser iguais');
            this.createError(repetirSenha, 'Campos senhas e repetir senham precisam ser iguais');
        }

        if(senha.value < 6 || senha.value.length > 12) {    //verificar tamanho das senhas.
            passValid = false;
            this.createError(senha, 'Senha precisa ter entre 6 a 12 caracteres');

    }
        return passValid;
}

    ValidaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()) {             //cpf.valida vem da função validaCPF. No final dela tem: return novoCPF === this.cpfLimpo; ou seja, se isso der false !valida return false
            this.createError(campo, 'CPF Inválido.');
            return false;
        }

        return true;
    }

    validaUsuario(campo) {
        const usuario = campo.value; // pega o que tem no campo usuario e atribui a const usuario.
        let validUser = true;
        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuario precisa ter entre 3 a 12 caracteres.');
            validUser = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {     // verifica se o usuariot em algo diferente de letras e numeros.
            this.createError(campo, 'Nome de usuario deve conter apenas letras e/o numeros.'); 
            validUser = false;
    }
        return validUser;
}

    createError(campo, msg) {
        const div = document.createElement('div'); //  cria div para exibir erro
        div.innerHTML = msg;    // exibe o erro
        div.classList.add('error-text'); // atribui uma classe de erro
        campo.insertAdjacentElement('afterend', div); // depois do campo insira a div. Isso faz a div seja exibida na pagina e não apenas salva na memoria.
    }

}
const valida = new ValidaFormulario();