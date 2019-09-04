import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalculatorInput from '../../components/CalculatorInput';
import CalculatorButtons from '../../components/CalculatorButtons';

const reducer = (state, action) => {
    let { currentInput, currentValue } = state;
    const operands = ['+', '-', 'x', '/'];
    let numbers = [];
    let operations = [];

    var stringNumber = '';

    const computed = () => {
        console.log({currentInput});
        for(let x = 0 ; x < currentInput.length; x++){
            if(operands.indexOf(currentInput[x]) > -1 ){
                operations.push(currentInput[x]);
                numbers.push(stringNumber);
                stringNumber = '';
            }else{
                stringNumber += currentInput[x];
                if(x === currentInput.length - 1){
                    numbers.push(stringNumber);
                    stringNumber = '';
                }
            }
        }

        console.log({numbers, operations});
    }

    switch(action.type){
        case 'typingNumbers':
                if(currentInput === '0')
                    currentInput = '';

            currentInput += action.payload;  
            console.log({currentInput});
            computed();         

            return {...state, currentInput: currentInput };
        case 'typingOperands':
            if( operands.indexOf(currentInput[currentInput.length - 1]) > -1 ){
                currentInput = currentInput.substring(0, currentInput.length - 1);
                currentInput += action.payload;
            }else{
                currentInput += action.payload;
            }
            computed();

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
                <CalculatorButtons value="="/>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    buttonContainers: {
        justifyContent: 'space-around',
        marginHorizontal: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'pink'
    },
   
})

export default CalculatorScreen;