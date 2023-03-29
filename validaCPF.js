// Exercicio: Validar CPF con class

// '705.484.450-52'

class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    valida() {
        if (typeof this.cpfLimpo === 'undefined') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSequencia()) return false;
        
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digitoUm = this.criaDigito(cpfParcial);
        const digitoDois = this.criaDigito(cpfParcial + digitoUm);

        const novoCpf = cpfParcial + digitoUm + digitoDois;

        return novoCpf === this.cpfLimpo;
    }

    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);

        let regresivo = cpfArray.length + 1;
        let total = cpfArray.reduce((ac, val) => {
            ac += (regresivo * Number(val));
            regresivo--;
            return ac;
        }, 0)

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    isSequencia() {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    }
}

/* const cpf = new ValidaCPF('705.484.450-52');

if (cpf.valida()) {
    console.log('CPF Válido');
} else {
    console.log('CPF Inválido');
} */