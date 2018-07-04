
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

import entry_details from '../styleSheets/EntryDetails_style';
import general from '../styleSheets/General_style.js'
import UploadPhoto from './UploadPhoto'
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
},'Currency');

const Ledger = t.struct({
    Ledger: t.String,
    AccountID: t.String,
    Amount: t.Number,
    Currency: Curr,
    Date: t.Date,
    Comment: t.maybe(t.String),
    PhotoName: t.maybe(t.String),

});

const Command = t.struct({
    Command: t.String,
    Date: t.Date
});

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
        PhotoName:{
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
            //headerRight:  params.nothingToUndo ? "" : <Button style={entry_details.button} title={"Undo"} onPress={()=>params.handleThis()}/>,
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
            PhotoName: this.props.navigation.getParam('PhotoName','')

        },
        valueBasic:{
            Command: '',
        },
        listType: 'Advanced'
    };





    handleSubmit = () => {
        const value = this._form.getValue();// use that ref to get the form value
        CRUD.uploadEntry(value);
        Keyboard.dismiss();
        this.props.navigation.navigate("ViewEntries", {paramName: value.Ledger});
    };



    handleSubmitBasic = () => {
        const valueBasic = this._form.getValue(); // use that ref to get the form value
        console.log("COMMAND ENTRY");
        Keyboard.dismiss();
        console.log('valueBasic: ', valueBasic);
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
            const Ledger = response.headers.map.Ledger[0];
            console.log(Ledger);
            this.props.navigation.navigate("ViewEntries", {paramName: Ledger})
        });


    };






    render() {

        return (
            <View style={entry_details.container}>
            <View style={general.controls}>
                <View style={general.switchContainer}>
                    { ['QuickAdd', 'Advanced'].map( type => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                entry_details.switch,
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
                <View style={entry_details.container}>

                    <Form
                        ref={component => this._form = component}
                        type={Command}
                        options={options}
                        value={this.state.valueBasic}
                    />
                    <TouchableHighlight style={entry_details.blueButton} onPress={this.handleSubmitBasic} underlayColor='#99d9f4'>
                        <Text style={entry_details.buttonText}>Create Entry</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        }

        {
            this.state.listType === 'Advanced' &&
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
        }
        {
                    this.state.listType === 'Camera' &&
                        <ScrollView scrollEnabled ={true}>
                            <UploadPhoto/>
                        </ScrollView>

        }
            </View>
        );
    }
}




module.exports = CreateEntry;