import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorButton = ({ enteredNumber, value }) => {
    return(
        <TouchableOpacity style={styles.button} onPress={enteredNumber}>
            <Text>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        height: 70,
        flex: 1,
        borderWidth: 1,
        borderColor: 'green'
    }
});

export default CalculatorButton;