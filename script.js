let first_number_list = [];
let first_number_value = 0;
let second_number_list = [];
let second_number_value = 0;
let operation = "";
let result = 0;
let first_number_flag = true;
let second_number_flag = false;
let operator_flag = false;
document.querySelector(".screen-content").innerHTML = 0;

const numbers = Array.from(document.querySelectorAll(".num"));
const operators = Array.from(document.querySelectorAll(".op"));
console.log(numbers);

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
        console.log(first_number_list);
        console.log(second_number_list);
    }
    )
})
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
        document.querySelector(".screen-content").innerHTML = result;
        first_number_flag = true;
        second_number_flag = false;
        operator_flag = false;
        first_number_list = [];
        second_number_list = [];
        result = 0;
    }
})
document.querySelector(".reset").addEventListener("click",function(){
    document.querySelector(".screen-content").innerHTML = 0;
    first_number_flag = true;
    second_number_flag = false;
    operator_flag = false;
    first_number_list = [];
    second_number_list = [];
    result = 0;
})