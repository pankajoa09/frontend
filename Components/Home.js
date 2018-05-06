
import React, { Component } from 'react';
import Blink from '../Blink';
import Navigation from '../Navigation'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class Home extends Component {


    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon size={24} name="home" color="white" />
    };


    render() {

        return (

            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Ledger!
                </Text>
                <Text style={styles.instructions}>
                    <Button title={"Create Ledger"} onPress={() => this.props.navigation.navigate('CreateLedger')}
                    />
                </Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    }
);


module.exports = Home;