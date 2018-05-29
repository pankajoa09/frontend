
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage, Divider } from 'react-native-elements';

import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styleForEntryDetails';



import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,

} from 'react-native';




class ViewEntryDetails extends Component {

    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon size={24} name="home" color="white" />
    };




    render() {
        const entry = this.props.navigation.state.params.paramName;
        const datee = new Date(String(entry.Date));


        return (
            <View style={styles.container}>
                <Text style={styles.label}>Ledger</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.Filename}</Text>

                <Text style={styles.label}>Account Path</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.AccountID}</Text>

                <Text style={styles.label}>Amount</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: entry.Currency.toString()
                }).format(Number(entry.Amount))}</Text>


                <Text style={styles.label}>Date</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{new Intl.DateTimeFormat('en-US').format(datee)}</Text>

                <Text style={styles.label}>Comment</Text>
                <Divider style={{ backgroundColor: 'lightgrey', }} />
                <Text style={styles.data}>{entry.Comment}</Text>


            </View>
        );

}

}





module.exports = ViewEntryDetails;