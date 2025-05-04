export class ExpressionRegular {

    static get expressions(){
        return {
            text: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
            number: /^\d+$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/
        }
    }
}