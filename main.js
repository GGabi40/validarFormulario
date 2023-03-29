class ValidaForm {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
        console.log('CPF válido: 705.484.450-52');
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            // arrow function: no pierde el this;
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposValidos();
        const senhasValidas = this.senhasValidas();

        if (camposValidos && senhasValidas) {
            alert('Formulario Enviado.');
            this.formulario.submit();
        }
    }


    senhasValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.pass');
        const senhaAgain = this.formulario.querySelector('.pass-again');

        if(senha.value !== senhaAgain.value) {
            valid = false,
            this.criaError(senha, 'Campos senha e Repetir senha precisam ser iguais.');
            this.criaError(senhaAgain, 'Campos senha e Repetir senha precisam ser iguais.');
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaError(senha, 'Campos senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }

    camposValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            // Evita que se generen más mensajes de error;
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            // Pego o label anterior a cada input;
            const label = campo.previousElementSibling.innerHTML;
            const labelLimpo = label.replace(':', '');

            if(!campo.value) {
                this.criaError(campo, `Campo <span id="labelError">"${labelLimpo}"</span> nao pode estar em branco.`);
                valid = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) {
                    valid = false;
                }
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) {
                    valid = false;
                }
            }
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.criaError(campo, 'Usuario precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaError(campo, 'Usuario precisa conter apenas letras e/ou números.');
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaError(campo, 'CPF Inválido.');
            return false;
        }

        return true;
    }

    criaError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');

        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaForm();