
import React, { Component } from 'react';
import Blink from '../Blink';

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styleSheets/General_style';

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




module.exports = Home;