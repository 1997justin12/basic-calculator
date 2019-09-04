import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { black } from 'ansi-colors';


const CalculatorInput = ({currentInput, currentValue}) => {
    return(
        <View style={styles.resultScreen}>
            <Text style={styles.prevInput}>{currentInput}</Text>
            <Text style={styles.currentInput}>{currentValue}</Text>
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
        borderWidth: 1,
        borderColor: 'red'
    },
    currentInput: {
        borderWidth: 1,
        borderColor: 'yellow',
        flex: 1
    }
});

export default CalculatorInput;