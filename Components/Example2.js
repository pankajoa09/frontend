
import React, { Component } from 'react';
//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';

import Icon from 'react-native-vector-icons/MaterialIcons'






import { Keyboard, TouchableOpacity } from 'react-native'

import CRUD from './CRUD'
import AutoInput from './AutoInput'

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



const Name = t.struct({
    name: t.String,
});


const options = {
    fields: {
        name: {
            factory: AutoInput,
            config: {
                elements: ['bob','charles','babbage','manson'].map(x=>({name:x})),
                propForQuery: 'name',
            },
            label: 'Name',
        },
    },
};

class Example2 extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Create Namey',
            tabBarLabel: 'Create Entry',
            tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white"/>,

        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

        handleSubmit = () => {
            const value = this._form.getValue();// use that ref to get the form value
            console.log(value);
        };

        render()
        {
            return (
                <ScrollView scrollEnabled={true} keyboardShouldPersistTaps='always' style={styles.descriptionContainer} contentContainerStyle={{backgroundColor:'white'}}>
                    <View style={styles.descriptionContainer}>
                        <View style={{zIndex:2, backgroundColor:'#cccccc'}}>
                        <Form
                            ref={component => this._form = component} //wtf is this shit pls dont delete it works
                            type={Name}
                            options={options} // pass the options via props
                            value={this.state.value}
                            style={{zIndex:1}}
                        />
                        </View>
                        <View style={{backgroundColor:"#cccccc", zIndex:1}}>
                        <TouchableOpacity style={styles.button} onPress={()=>console.log("whfueck")}><Text style={{fontSize:14,zIndex:1,}}>ehhh</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )
        }

    }

const styles = StyleSheet.create({
    button:{
        shadowColor:"#cccccc",
        position:'absolute',
        marginTop: 0
    },
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10,
        //zIndex:10,
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8,
        //zIndex:2,
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});


module.exports = Example2;
