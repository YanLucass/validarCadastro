

function ValidaCPF(cpfEnviado) {

    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() { return cpfEnviado.replace(/\D/g, '')} //  retira todos pontos, etc e deixa o cpf apenas com numeros
    })

}

ValidaCPF.prototype.valida = function() {       // valida o cpf, se é nulo se é menor que 11, se os digitos tão ok
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false; //  se for true, retorne false ou seja, cpf invalido. 
    const cpfParcial = this.cpfLimpo.slice(0, -2); //  corta o cpf, fazendo ter 9 caracter
    const digito1 = this.criaDigito(cpfParcial); // criamos o primeiro digito
    const digito2 = this.criaDigito(cpfParcial + digito1); // segundo digito. Manda 7054844505 para criaDigito.
    
    const novoCPF = cpfParcial + digito1 + digito2;
    //console.log(novoCPF);
    return novoCPF === this.cpfLimpo; // retorna true ou falso

};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {  // cpf com 9 digitos para realizarmos os calculos
    const cpfArray = Array.from(cpfParcial); // converte o cpf para um array
    
    let regressivo = cpfArray.length + 1; //  deixa regressivo com 10 caracter
    let total = cpfArray.reduce((ac, val) => {      // função que vai armazenar o total
        //console.log(regressivo, val, regressivo * val);
        ac += (regressivo * Number(val)) // acumula a mult entre regressivo e o valor
        regressivo--;         // tira um de regressivo para multiplicar corretamente
        return ac;           // evita retornar undefined.
    }, 0)

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito); //  retorna como string para concatenar na criação de um novoCPF para comparar com o enviado.
    
}

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length); //  se o primeiro digito repetido 11 vezes for igual ao cpf é uma sequencia
    return sequencia === this.cpfLimpo; // retorne true.
}


/*
const cpf = new ValidaCPF('714.779.924-05');

if(cpf.valida()) {
    console.log('CPF VALIDO');
} else {
    console.log('CPF INVALIDO')
}
*/