
import React, { Component } from 'react';
import Blink from '../Blink';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class Home extends Component {
    render() {

        return (

            <View style={styles.container}>
                <Text style={styles.welcome}>
                    "Welcome to Ledger!"
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