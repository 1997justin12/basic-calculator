import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalculatorInput from '../../components/CalculatorInput';
import CalculatorButtons from '../../components/CalculatorButtons';

const reducer = (state, action) => {
    let { currentInput, currentValue } = state;
    const operands = ['+', '-', 'x', '/'];

    const filteredArray = (items) => {
       items = items.filter((value) => {
            return value != "";
        });
        return items;
    };


    const computed = (isgetResult = false) => {
        var numbers = currentInput.split(/[x+-\/]+/);
            numbers = filteredArray(numbers);
        var operand = currentInput.split(/[0-9]+/);
            operand = filteredArray(operand);

        const spliceItems = (sign) => {
            var index = null;
            var solve = null;

            switch(sign){
                case 'x':
                    index = operand.indexOf("x");
                    solve = numbers[index] * numbers[index+1];
                    break;
                case '/':
                    index = operand.indexOf("/");
                    solve = numbers[index] / numbers[index+1];
                    break;
                case '+':
                    index = operand.indexOf("+");
                    solve = parseInt(numbers[index]) + parseInt(numbers[index+1]);
                    break;
                case '-':
                    index = operand.indexOf("-");
                    solve = numbers[index] - numbers[index+1];
                    break;
            }
           
            numbers.splice(index, 1, "");
            numbers.splice(index+1, 1, solve);
            operand.splice(index, 1, "");

        };

            if(operand.length >= numbers.length || operand.length === 0 || numbers.length < 3 && isgetResult === false){
                return;
            }
            
        while(true){
            if(operand.indexOf("x") > -1){
                spliceItems("x");

                if(operand.indexOf("x") === -1){
                    numbers = filteredArray(numbers);
                    operand = filteredArray(operand);
                }
            }else if(operand.indexOf("x") == -1 && operand.indexOf("/") > -1){
                spliceItems("/");

                if(operand.indexOf("/") === -1){
                    numbers = filteredArray(numbers);
                    operand = filteredArray(operand);
                }
            }else if(operand.indexOf("/") == -1 && operand.indexOf("+") > -1){
                spliceItems("+");
                
                if(operand.indexOf("+") === -1){
                    numbers = filteredArray(numbers);
                    operand = filteredArray(operand);
                }
            }else if(operand.indexOf("+") == -1 && operand.indexOf("-") > -1){
                spliceItems("-");                
                
                if(operand.indexOf("-") === -1){
                    numbers = filteredArray(numbers);
                    operand = filteredArray(operand);
                }
            }else{
                break;
            }
        }
        currentValue = numbers[0];
    };

    switch(action.type){
        case 'typingNumbers':
            currentInput += action.payload;  
            computed();         
            return {...state, currentInput, currentValue };
        case 'typingOperands':
            if( operands.indexOf(currentInput[currentInput.length - 1]) > -1 ){
                currentInput = currentInput.substring(0, currentInput.length - 1);
                currentInput += action.payload;
            }else{
                currentInput += action.payload;
            }
            computed();
            return {...state, currentInput, currentValue};
        case 'getResult':
            computed(true);

            return {...state, currentInput: currentValue || '', currentValue: null};
        case 'clear_action': 
            currentInput = currentInput.substring(0, currentInput.length - 1);
            return {...state, currentInput, currentValue}
        default:
            return state;
    }
}

const CalculatorScreen = () => {

    const [state, dispatch] = useReducer(reducer, {currentInput: '', currentValue: 0});
    const { currentInput, currentValue } = state;
    return(
        <>
            <View style={styles.containerScreen}> 
                <CalculatorInput currentInput={currentInput} currentValue={currentValue}/>
                <View style={styles.buttonContainers}>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 1})} value="1"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 2})} value="2"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 3})} value="3"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 4})} value="4"/>

                </View>
                <View style={styles.buttonContainers}>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 5})} value="5"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 6})} value="6"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 7})} value="7"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 8})} value="8"/>

                </View>
                <View style={styles.buttonContainers}>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'clear_action'})} />
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 9})} value="9"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingNumbers', payload: 0})} value="0"/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'getResult', payload: true})} value="="/>

                </View>
                <View style={styles.buttonContainers}>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingOperands', payload: 'x'})} value="x" isOperand={true}/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingOperands', payload: '/'})} value="/" isOperand={true}/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingOperands', payload: '+'})} value="+" isOperand={true}/>
                    <CalculatorButtons buttonAction={() => dispatch({type: 'typingOperands', payload: '-'})} value="-" isOperand={true}/>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    buttonContainers: {
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: "row",
    },
    containerScreen: {
        backgroundColor: "#111111",
        flex: 1
    }
   
})

export default CalculatorScreen;