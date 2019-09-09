import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CalculatorScreen from './src/screens/CalculatorScreen/CalculatorScreen';

const navigation = createStackNavigator({
  Calculator:  CalculatorScreen,
},{
  initialRouteName: 'Calculator',
  defaultNavigationOptions: {
    title: 'Calculator',
    header: null
  }
})

const App = createAppContainer(navigation);

export default App;