let first_number_list = [];
let second_number_list = [];
let operation = "";
let result = 0;
//Flags to allow changes in the first and second number variables
//when the event listeners are triggered.
let first_number_flag = true;
let second_number_flag = false;
//Flag to allow modifying the operation variable after there is a valid
//value in the first number flag.
let operator_flag = false;
//The screen is set to start with a 0 as default, as real physical calculators.
document.querySelector(".screen-content").innerHTML = 0;

const numbers = Array.from(document.querySelectorAll(".num"));
const operators = Array.from(document.querySelectorAll(".op"));

function calculation (x, y, op){
    let calc_result = 0;
    switch(op){
        case "+":
            calc_result = x+y;
            break;
        case "-":
            calc_result = x-y;
            break;
        case "×":
            calc_result = x*y;
            break;
        case "÷":
            calc_result = x/y;
            break;
        default:
            calc_result = 404;
    }
    return (calc_result);
}
//First and second number variables are updated when the buttons are
//clicked and the required conditions are met.
//Their values are shown in the screen.
numbers.map(function(number){
    number.addEventListener("click",()=>{
        if(first_number_flag){ 
            first_number_list+=[Number(number.innerHTML)];
            document.querySelector(".screen-content").innerHTML = first_number_list;
            operator_flag = true;
        } else if(second_number_flag){
            second_number_list+=[Number(number.innerHTML)];
            document.querySelector(".screen-content").innerHTML = second_number_list;
        }
    }
    )
})
//Flags are updated and the operation variable is updated
//with the last clicked operator button.
operators.map(function(operator){
    operator.addEventListener("click",function(){
        if(operator_flag){
            first_number_flag = false;
            second_number_flag = true;
            operation = operator.innerHTML;
        }
    }
    )
}
)
//The user gets the result after clicking the "=" button.
//The flags are set to default values to start from scratch.
//Specially this functionality can be updated to use the result
//for new calculations, instead of starting from scratch.
document.getElementById("result").addEventListener("click", function(){
    if(first_number_flag){
        result=Number(first_number_list);
        first_number_flag = true;
        second_number_flag = false;
        operator_flag = false;
        first_number_list = [];
        second_number_list = [];
    }
    if(second_number_flag){
        result = calculation(Number(first_number_list), Number(second_number_list), operation);
        if(operation == "÷" && Number(second_number_list)==0){
            result = "ERROR";
        }
        document.querySelector(".screen-content").innerHTML = result;
        first_number_flag = true;
        second_number_flag = false;
        operator_flag = false;
        first_number_list = [];
        second_number_list = [];
        result = 0;
    }
})
//Variables are set to default values to reset the calculator.
document.querySelector(".reset").addEventListener("click",function(){
    document.querySelector(".screen-content").innerHTML = 0;
    first_number_flag = true;
    second_number_flag = false;
    operator_flag = false;
    first_number_list = [];
    second_number_list = [];
    result = 0;
})