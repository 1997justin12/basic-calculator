import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CalculatorButton = ({ buttonAction, value, isOperand }) => {
    return(
        
        isOperand ?
            <TouchableOpacity style={styles.buttonOperator} onPress={buttonAction}>
                <Text style={styles.buttonLabel}>{value}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.button} onPress={buttonAction}>
                {value ? <Text style={styles.buttonLabel}>{value}</Text> : <MaterialCommunityIcons style={styles.buttonLabel} name="backspace" /> }
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        height: 70,
        flex: 1,
        borderWidth: 1,
        backgroundColor: '#191818',
        borderColor: '#111111'
    },
    buttonOperator: {
        padding: 10,
        height: 70,
        flex: 1,
        borderWidth: 1,
        backgroundColor: '#F6004B',
        borderColor: '#111111'
    },
    buttonLabel: {
        color: '#ffffff',
        alignSelf: "center",
        fontSize: 24,
        padding: 10
    }
});

export default CalculatorButton;