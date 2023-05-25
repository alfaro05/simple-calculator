let first_number_list = [];
let second_number_list = [];
let current_number = 0;
const text_on_screen = document.querySelector(".screen-content");
let operation = "";
let result = 0;
//Flags to allow changes in the first and second number variables
//when the event listeners are triggered. The new calculation flag
//allows new calculations using the previows result.
let first_number_flag = true;
let second_number_flag = false;
let new_calculation_flag = false;
//Flag to allow modifying the operation variable after there is a valid
//value in the first number flag.
let operator_flag = false;
//The screen is set to start with a 0 as default, as real physical calculators.
text_on_screen.innerHTML = 0;

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
        if(first_number_flag && !(new_calculation_flag)){ 
            first_number_list+=[Number(number.innerHTML)];
            text_on_screen.innerHTML = first_number_list;
            operator_flag = true;
        } else if(second_number_flag || new_calculation_flag){
            second_number_list+=[Number(number.innerHTML)];
            text_on_screen.innerHTML = second_number_list;
        }
    }
    )
})
//Flags are updated and the operation variable is updated
//with the last clicked operator button.
operators.map(function(operator){
    operator.addEventListener("click",function(){
        if(operator_flag || new_calculation_flag || (Number(text_on_screen.innerHTML) == 0)){
            first_number_flag = false;
            second_number_flag = true;
            operation = operator.innerHTML;
        }
    }
    )
}
)
//The user gets the result after clicking the "=" button.
//New calculation flag is set to "true", so the result can
//be used for new calculations.
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
        if(new_calculation_flag){
            result= calculation(current_number,Number(second_number_list),operation);
            if(operation == "÷" && Number(second_number_list)==0){
                result = "ERROR";
            }
        }else{
            result = calculation(Number(first_number_list), Number(second_number_list), operation);
            if(operation == "÷" && Number(second_number_list)==0){
                result = "ERROR";
            }
        }
        text_on_screen.innerHTML = result;
        first_number_flag = true;
        new_calculation_flag = true;
        second_number_flag = false;
        operator_flag = false;
        current_number = result;
        first_number_list = [];
        second_number_list = [];
        result = 0;
    }
});
//Variables are set to default values to reset the calculator.
document.querySelector(".reset").addEventListener("click",function(){
    text_on_screen.innerHTML = 0;
    new_calculation_flag = false;
    first_number_flag = true;
    second_number_flag = false;
    operator_flag = false;
    first_number_list = [];
    second_number_list = [];
    result = 0;
})