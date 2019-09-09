import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { black } from 'ansi-colors';


const CalculatorInput = ({currentInput, currentValue}) => {
    return(
        <View style={styles.resultScreen}>
            {currentValue ? <Text style={styles.prevInput}>Ans = {currentValue}</Text> : null }
            {currentInput ? <Text style={styles.currentInput}>{currentInput}</Text> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    resultScreen: {
        margin: 10,
        marginTop: 15,
        marginBottom: 30,
        padding: 5,
        height: 158,
        borderColor: '#130A0A',
        backgroundColor: '#191818',
        borderWidth: 1
    },
    prevInput: {
        textAlign: 'right',
        fontSize: 25,
        color: '#ffffff'
    },
    currentInput: {
        flex: 1,
        fontSize: 50,
        textAlign: 'right',
        color: '#ffffff'
    }
});

export default CalculatorInput;