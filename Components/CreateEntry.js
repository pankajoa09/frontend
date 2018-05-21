
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../style';
import { Keyboard } from 'react-native'
import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();

import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight
} from 'react-native';


const Form = t.form.Form;

const Curr = t.enums({
    'THB': 'Thai Baht',
    'USD': 'United States Dollar'
},'Currency');

const Ledger = t.struct({
    LedgerName: t.String,
    AccountID: t.String,
    Amount: t.Number,
    Currency: Curr,
    Date: t.Date,
    Comment: t.maybe(t.String),

});

const options = {
    fields: {
        LedgerName: {
            label: 'Ledger',
            error: 'Insert valid Ledger Name'
        },
        AccountID: {
            label: 'Account Path',
            error: 'Insert valid Account Path'
        },
        Amount: {
            label: 'Amount',
            error: 'Insert valid Number'
        },
        Currency: {
            label: 'Currency',
            options: [
                {value: 'THB', text: 'THB'},
                {value: 'USD', text: 'USD'},
                {value: 'HKD', text: 'HKD'},
            ],
            error: 'Insert valid Currency'

        },
        Comment: {
            label: "Comments(optional)",
            error: 'Insert valid Comment'
        },
        Date: {
            hidden: true
        },
        terms: {
            label: 'Agree to Terms',
        },

    },
};





class CreateEntry extends Component {

    static navigationOptions = {
        tabBarLabel: 'Create Entry',
        tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white" />
    };



    state = {
        value: {
            LedgerName: '',
            AccountID: '',
            Amount: 0,
            Currency: 'THB',
            Comment: '',
        }
    };





    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        Keyboard.dismiss();
        console.log('value: ', value);
        fetch(address+':8080/mobile/createEntry', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LedgerName: value.LedgerName,
                AccountID: value.AccountID,
                Amount: value.Amount,
                Currency: value.Currency,
                Date: value.Date,
                Comment: value.Comment
            })
        }).then((response) => console.log(response));
        this.props.navigation.navigate("ViewEntries", {paramName: value.LedgerName})


    };






    render() {
        return (
            <ScrollView scrollEnabled={true}>
            <View style={styles.container}>

            },
                <Form
                    ref={component => this._form = component} //wtf is this shit pls dont delete it works
                    type={Ledger}
                    options={options} // pass the options via props
                    value={this.state.value}
                />
                <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
            </ScrollView>
        );
    }
}




module.exports = CreateEntry;