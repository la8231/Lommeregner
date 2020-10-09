// Vælger elementer
const input_element = document.querySelector(".input"); // Returnere det første element  med selektoren input
const output_result_element = document.querySelector(".result .value"); // Returnere det første element med selektoren result og value
const output_operation_element = document.querySelector(".operation .value"); // Returnere et første element med selektoren operation og value

// Knapper
let calculator_buttons = [
    // Objekter der indeholder selve formlen men også symbolet.
    {
        name : "Delete",
        symbol : "⌫",
        formula : "false",
        type : "key"
    }, {
        name : "Clear",
        symbol : "C",
        formula : "false",
        type : "key"
    }, {
        name : "Percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    }, {
        name : "Division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    }, {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    }, {
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    }, {
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    }, {
        name : "Multiplication",
        symbol : "x",
        formula : "*",
        type : "operator"
    }, {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    }, {
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    }, {
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    }, {
        name : "Addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }, {
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    }, {
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    }, {
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    }, {
        name : "Subtraction",
        symbol : "-",
        formula : "-",
        type : "operator"
    }, {
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    }, {
        name : "Comma",
        symbol : ",",
        formula : ".",
        type : "number"
    }, {
        name : "Calculate", 
        symbol : "=",
        formula : "=",
        type : "calculate"
    },
];

//udregning af data
let data = { // Et objekt hvor jeg laver to arrays, jeg kan regne i og have et result i
    operation : [], 
    result : [],
}


// Lav udregning knap
function createButton() {
    const btns_per_row = 4;
    let added_btns = 0;

    calculator_buttons.forEach( (button, index) => { //Finder alt indholdet in arrayet
        if ( added_btns % btns_per_row == 0) { //returnere remainder
            input_element.innerHTML += '<div class="row"></div>' // flytter de næste knapper ned.
        }   

        const row = document.querySelector(".row:last-child"); // returnere det første element med det navn.
        row.innerHTML += `<button id="${button.name}"> 
                            ${button.symbol} 
                          </button>`; // ${} kalder en funktion. Bruges her til at lave en snak
        added_btns++; //Tilføjer en knap
    });
}

createButton()

// Tryk event
input_element.addEventListener( "click", event => { // Lytter efter at en knap bliver trykket
    const target_btn = event.target; 

    calculator_buttons.forEach( button => { // finder alt indholdet i arrayet.
        if( button.name == target_btn.id ) calculator(button); // Spørger om at knappens navn er det samme som det man har trykket, derefter regn
    });
});


// Udregning
function calculator(button) {
    if ( button.type == "operator" ) { // Spørger om det er en operatør
        data.operation.push(button.symbol); //Hvis det er skubber den symbolet og formlen ind
        data.result.push(button.formula);

    }
    else if ( button.type == "number" ) { // Spørger om det er et nummer
        data.operation.push(button.symbol); //Hvis det er skubber den symbolet og formlen ind
        data.result.push(button.formula);
    }
    else if ( button.type == "key" ) { // spørger om det er en "key"
        if ( button.name == "Clear" ) { //Spørger om det er clear knappen, hvis det er så sættes de to array til 0 og resultatet til 0
        data.operation = [];
        data.result = [];
        updateOutputResult(0)

        }
        else if ( button.name == "Delete" ) { // Spørger om knappens navn er delete, hvis det er fjerner det sidste tal og resultat
        data.operation.pop();
        data.result.pop();
        }
    }
        else if (button.type == "calculate" ) { // spørger om knappens type er udregning
            let join_result = data.result.join(''); // Hvis det er, laver den data.result.join om til en string
            
            let result;
            try { // tester om resultat er lig med en syntax fejl
                result = eval(join_result);
            } catch (error){ // Viser det er en syntax fejl
                if(error instanceof SyntaxError){
                    result = "Syntax Error!";
                    updateOutputResult(result);
                    return
                }
            }
            result = formatResult(result) // nu har vi udregnet tallet
            updateOutputResult(result) // opdater resultatet og viser det.

            data.operation = []; // resetter arrayet
            data.result = []; // resetter arrayet

            data.operation.push(result); // skubber resultatet ind
            data.result.push(result); // skubber resultatet ind

            return;
    }
    updateOutputOperation(data.operation.join('')); //Laver data.operation om til en string og sender det til updateOutputOperation
}

function updateOutputOperation(operation) { 
    output_operation_element.innerHTML = operation; // sætter innerhtml til operatøren
}
 
function updateOutputResult(result) {
    output_result_element.innerHTML = result; //sætter der innerhtml til svaret
}

// Format
const max_output_number_length = 10; // sætter array længden til 10
const output_precision = 5; //sætter 
function formatResult( result ){
    if( digitCounter(result) > max_output_number_length){ // Tjekker om der er flere tal end længden på max_output_number_length
        if( isFloat(result) ){ // spørger om tallet er et decimal tal
            const result_int = parseInt(result); // laver tallet om til en integrer 
            const result_int_length = digitCounter(result_int); // 

            if( result_int_length > max_output_number_length ){ // spørger om result_int_lengt er større end max_output_number
                return result.toPrecision(output_precision); // sættter tallet før e til 5
            }
            else{
                const num_digits_after_point = max_output_number_length - result_int_length; // sætter tallet efter e til hvor langt arrayet var, minus det der står forna e
                return result.toFixed(num_digits_after_point); // returnere tallet
            }
        }
        else{
            //Hvis nummeret er en integreger 
            return result.toPrecision(output_precision);
        }
    }
    else{
        return result;
    }
}
   

// Tal tæller
function digitCounter(number) {
    return number.toString().length; // laver nummer om til en string og spørger om længden
}
// Tjekker om tallet er decimal
function isFloat(number) { 
    return number % 1 != 0; // tjekker om tallet er et decimal tal.
}