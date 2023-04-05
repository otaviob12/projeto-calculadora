const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(previousOperationTex, currentOperationText){
        this.previousOperationTex = previousOperationTex
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // adicionar digito no visor 
    addDigit(digit){
        // checagem se a operação atual ja tem um .
        console.log(digit)
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit
        this.updateScreen();
    }

    // processar todas as operações da calculadora

    processOpeation(operation) {
        // obter valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationTex.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return;
        }
    }

    // alterar o valor da tela da calculadora
    updateScreen(
            operationValue = null,
            operation = null,
            current = null,
            previous = null
        ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            // verifique se o valor é zero, se for apenas adicione o valor atual
            if(previous === 0){
                operationValue = current;
            }
            //adicionar valor atual ao anterior
            this.previousOperationTex.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innertext = "";

        }
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) => {
        
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOpeation(value)
        }
    });
});
