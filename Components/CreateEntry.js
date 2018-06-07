
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styleForEntryDetails';
import styles2 from '../style.js'
import { Keyboard, TouchableOpacity } from 'react-native'

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
    Ledger: t.String,
    AccountID: t.String,
    Amount: t.Number,
    Currency: Curr,
    Date: t.Date,
    Comment: t.maybe(t.String),

});

const Command = t.struct({
    Command: t.String,
    Date: t.Date
})

const options = {
    fields: {
        Ledger: {
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

const optionsBasic = {
    fields: {
        Date: {
            hidden: true
        },
    },
};





class CreateEntry extends Component {



    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Create Entry',
            //headerRight:  params.nothingToUndo ? "" : <Button style={styles.button} title={"Undo"} onPress={()=>params.handleThis()}/>,
            headerRight: params ? params.headerRight : undefined,
            tabBarLabel: 'Create Entry',
            tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white" />,

        }
    };





    state = {
        value: {
            Ledger: '',
            AccountID: '',
            Amount: 0,
            Currency: 'THB',
            Comment: '',
        },
        valueBasic:{
            Command: '',
        },
        listType: 'Basic'
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
                Ledger: value.Ledger,
                AccountID: value.AccountID,
                Amount: value.Amount,
                Currency: value.Currency,
                Date: value.Date,
                Comment: value.Comment
            })
        }).then((response) => console.log(response));
        this.props.navigation.navigate("ViewEntries", {paramName: value.Ledger})


    };



    handleSubmitBasic = () => {
        const valueBasic = this._form.getValue(); // use that ref to get the form value
        console.log("COMMAND ENTRY");
        Keyboard.dismiss();
        console.log('value: ', valueBasic);
        fetch(address+':8080/mobile/handleCommand', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Command: valueBasic.Command,
                Date: valueBasic.Date
            })
        }).then((response) => {
            console.log(response);
            const Ledger = response.headers.map.ledger[0];
            console.log(Ledger);
            this.props.navigation.navigate("ViewEntries", {paramName: Ledger})
        });


    };






    render() {
        return (
            <View style={styles.container}>
            <View style={styles2.controls}>
                <View style={styles2.switchContainer}>
                    { ['QuickAdd', 'Advanced'].map( type => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.switch,
                                {backgroundColor: this.state.listType === type ? '#99d9f4' : 'white'}
                            ]}
                            onPress={ _ => this.setState({listType: type}) }
                        >
                            <Text style={{color:'dimgrey',fontSize:15}}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        {
            this.state.listType === 'QuickAdd' &&
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>

                    <Form
                        ref={component => this._form = component}
                        type={Command}
                        options={options}
                        value={this.state.valueBasic}
                    />
                    <TouchableHighlight style={styles.blueButton} onPress={this.handleSubmitBasic} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create Entry</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        }

        {
            this.state.listType === 'Advanced' &&
            <ScrollView scrollEnabled={true}>
            <View style={styles.container}>
                <Form
                    ref={component => this._form = component} //wtf is this shit pls dont delete it works
                    type={Ledger}
                    options={options} // pass the options via props
                    value={this.state.value}
                />
                <TouchableHighlight style={styles.blueButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
            </ScrollView>
        }
            </View>
        );
    }
}




module.exports = CreateEntry;