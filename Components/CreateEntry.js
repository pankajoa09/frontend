
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';

import Icon from 'react-native-vector-icons/MaterialIcons'


import entry_details from '../styleSheets/EntryDetails_style';
import general from '../styleSheets/General_style.js'

import { Keyboard, TouchableOpacity } from 'react-native'

import CRUD from './CRUD'
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
},'Currency'); //gotta fix

const Ledger = t.struct({
    Ledger: t.String,
    AccountID: t.String,
    Amount: t.Number,
    Currency: Curr,
    Date: t.Date,
    Comment: t.maybe(t.String),
    PhotoName: t.maybe(t.String),

});


const options = {
    fields: {
        Ledger: {
            label: 'Ledger',
            error: 'Insert valid Ledger Name'
        },
        AccountID: {
            label: 'To/From:',
            error: 'Insert valid Account Path'
        },
        Amount: {
            label: 'How much?',
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
        PhotoName:{
            hidden: true
        },
        terms: {
            label: 'Agree to Terms',
        },

    },
};

class CreateEntry extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Create Entry',
            tabBarLabel: 'Create Entry',
            tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white" />,

        }
    };

    constructor(props){
        super(props);
        this.state = {
            value: {
                Ledger: '',
                AccountID: '',
                Amount: 0,
                Currency: 'THB',
                Comment: '',
                PhotoName: this.props.navigation.getParam('PhotoName','')

            },
        };
    }

    handleSubmit = () => {
        const value = this._form.getValue();// use that ref to get the form value
        CRUD.uploadEntry(value);
        Keyboard.dismiss();
        this.props.navigation.navigate("ViewEntries", {paramName: value.Ledger});
    };

    render(){
        return(
        <ScrollView scrollEnabled={true}>
            <View style={entry_details.container}>
                <Form
                    ref={component => this._form = component} //wtf is this shit pls dont delete it works
                    type={Ledger}
                    options={options} // pass the options via props
                    value={this.state.value}
                />
                <TouchableHighlight style={entry_details.blueButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={entry_details.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        )
    }

}

module.exports = CreateEntry;
