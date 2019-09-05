import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { black } from 'ansi-colors';


const CalculatorInput = ({currentInput, currentValue}) => {
    return(
        <View style={styles.resultScreen}>
            <Text style={styles.prevInput}>{currentValue}</Text>
            <Text style={styles.currentInput}>{currentInput}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    resultScreen: {
        margin: 10,
        padding: 5,
        height: 90,
        borderColor: 'black',
        borderWidth: 1
    },
    prevInput: {
        textAlign: 'right',
        fontSize: 25,
        color: 'red'
    },
    currentInput: {
        flex: 1,
        fontSize: 50,
        textAlign: 'right'
    }
});

export default CalculatorInput;