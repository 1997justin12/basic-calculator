import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalculatorInput from '../../components/CalculatorInput';
import CalculatorButtons from '../../components/CalculatorButtons';

const reducer = (state, action) => {
    let { currentInput, currentValue } = state;
    const operands = ['+', '-', 'x', '/'];

    const computed = (isgetResult = false) => {
        var numbers = currentInput.split(/[x+-\/]+/);
            numbers = numbers.filter((value) => {
                return value != "";
            });
        var operand = currentInput.split(/[0-9]+/);
            operand = operand.filter((value) => {
                return value != "";
            });
            console.log(numbers, operand);
            console.log(operand.length, numbers.length);

            if(operand.length >= numbers.length || operand.length === 0 || numbers.length < 3 && isgetResult === false){
                return;
            }
            
        while(true){
            if(operand.indexOf("x") > -1){
                var index = operand.indexOf("x");
                var solve = numbers[index] * numbers[index+1];
                    numbers.splice(index, 1, "");
                numbers.splice(index+1, 1, solve);
                operand.splice(index, 1, "");

                if(operand.indexOf("x") === -1){
                    numbers = numbers.filter((value) => {
                        return value != "";
                    });
                    operand = operand.filter((value) => {
                        return value != "";
                    });
                }
            }else if(operand.indexOf("x") == -1 && operand.indexOf("/") > -1){
                var index = operand.indexOf("/");
                var solve = numbers[index] / numbers[index+1];
                
                numbers.splice(index, 1, "");
                numbers.splice(index+1, 1, solve);
                operand.splice(index, 1, "");
                
                if(operand.indexOf("/") === -1){
                    numbers = numbers.filter((value) => {
                        return value != "";
                    });
                    operand = operand.filter((value) => {
                        return value != "";
                    });
                }
            }else if(operand.indexOf("/") == -1 && operand.indexOf("+") > -1){
                var index = operand.indexOf("+");
                var solve = parseInt(numbers[index]) + parseInt(numbers[index+1]);
                
                numbers.splice(index, 1, "");
                numbers.splice(index+1, 1, solve);
                operand.splice(index, 1, "");
                
                if(operand.indexOf("+") === -1){
                    numbers = numbers.filter((value) => {
                        return value != "";
                    });
                    operand = operand.filter((value) => {
                        return value != "";
                    });
                }
            }else if(operand.indexOf("+") == -1 && operand.indexOf("-") > -1){
                var index = operand.indexOf("-");
                var solve = numbers[index] - numbers[index+1];
                
                numbers.splice(index, 1, "");
                numbers.splice(index+1, 1, solve);
                operand.splice(index, 1, "");
                
                if(operand.indexOf("-") === -1){
                    numbers = numbers.filter((value) => {
                        return value != "";
                    });
                    operand = operand.filter((value) => {
                        return value != "";
                    });
                }
            }else{
                break;
            }
        }
        currentValue = numbers[0];
    }

    switch(action.type){
        case 'typingNumbers':
                if(currentInput === '0')
                    currentInput = '';

            currentInput += action.payload;  
            computed();         

            return {...state, currentInput: currentInput, currentValue: currentValue };
        case 'typingOperands':
            if( operands.indexOf(currentInput[currentInput.length - 1]) > -1 ){
                currentInput = currentInput.substring(0, currentInput.length - 1);
                currentInput += action.payload;
            }else{
                currentInput += action.payload;
            }
            computed();

            return {...state, currentInput: currentInput, currentValue: currentValue};
        case 'getResult':
            computed(true);
            return {...state, currentInput: currentInput, currentValue: currentValue};
        default:
            return state;
    }
}

const CalculatorScreen = () => {

    const [state, dispatch] = useReducer(reducer, {currentInput: '0', currentValue: 0});
    const { currentInput, currentValue } = state;
    return(
        <>
            <CalculatorInput currentInput={currentInput} currentValue={currentValue}/>
            <View style={styles.buttonContainers}>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 1})} value="1"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 2})} value="2"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 3})} value="3"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingOperands', payload: '+'})} value="+"/>
            </View>
            <View style={styles.buttonContainers}>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 4})} value="4"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 5})} value="5"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 6})} value="6"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingOperands', payload: '-'})} value="-"/>
            </View>
            <View style={styles.buttonContainers}>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 7})} value="7"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 8})} value="8"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 9})} value="9"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingOperands', payload: 'x'})} value="x"/>
            </View>
            <View style={styles.buttonContainers}>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingNumbers', payload: 0})} value="0"/>
                <CalculatorButtons value="."/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'typingOperands', payload: '/'})} value="/"/>
                <CalculatorButtons enteredNumber={() => dispatch({type: 'getResult', payload: true})} value="="/>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    buttonContainers: {
        justifyContent: 'space-around',
        marginHorizontal: 10,
        flexDirection: "row",
    },
   
})

export default CalculatorScreen;