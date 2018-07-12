import React, { Component } from 'react';

//import Button from '../Button';
import Blink from '../Blink';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styleSheets/EntryDetails_style';
import { Keyboard } from 'react-native'
import currentServerAddress from '../currentServerAddress'
import CRUD from './CRUD'
const address = currentServerAddress.address();

import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    Image,
    TouchableOpacity,

} from 'react-native';
import ImagePicker from "react-native-image-picker";






const Form = t.form.Form;

const Curr = t.enums({
    'THB': 'Thai Baht',
    'USD': 'United States Dollar'
},'Currency');

const Entry = t.struct({
    Ledger: t.String,
    AccountID: t.String,
    Amount: t.Number,
    Currency: t.String,
    Date: t.Date,
    Comment: t.maybe(t.String),
    PhotoName: t.maybe(t.String),
});


const options = {
    fields: {
        Ledger: {
            hidden: true,
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
            error: 'Insert valid Currency'

        },
        Comment: {
            label: "Comments(optional)",
            error: 'Insert valid Comment'
        },
        Date: {
            //hidden: false
        },
        PhotoName: {
            hidden: true
        },
        terms: {
            label: 'Agree to Terms',
        },

    },
};

class EditEntryDetails extends Component{


    constructor(props){
        super(props);
        const entry = this.props.navigation.state.params.paramName; //gotta fix the naming
        const date = String(entry.Date);
        let string = 'Thu Jun 29 2018 15:12:27 GMT-0400';
        this.state = {
            value: {
                Ledger: entry.Ledger,
                AccountID: entry.AccountID,
                Amount: entry.Amount,
                Currency: entry.Currency,
                Comment: entry.Comment,
                PhotoName: entry.PhotoName,
                Date: new Date(date),
            },
            image: {
                source: null,
                data: null,
            },
            clientUsingLocalPhoto : false
        }
    };

    componentWillMount(){
        console.log("Edit Entry Details Mounted");
        const photoName = this.props.navigation.state.params.paramName.PhotoName;
        console.log(photoName);
        if (!((photoName === null) || (photoName === ''))){
            console.log('went here');
            const serverImageURI = CRUD.getURIFromPhotoName(this.props.navigation.state.params.paramName.PhotoName);
            this.setState({
                image : {
                    source: {uri: serverImageURI},
                    data : null,
                },
                clientUsingLocalPhoto: false
            })
        }

    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log('Should be using local');
                this.setState({
                    image : {
                        source : {uri: response.uri},
                        data: response.data
                    },
                    clientUsingLocalPhoto: true,
                })

            }
        });
    }


    _handleClick = ()=>{
        console.log("handleclick");
        console.log("handleclick");
        console.log("handleclick");
        console.log("handleclick");
        console.log("handleclick");
        console.log("handleclick");

        const formVal = this._form.getValue();
        console.log(formVal.Date);
        const date = this.props.navigation.state.params.paramName.Date;
        console.log(date);

        const dateIsChanged = new Date(formVal.Date).toLocaleDateString() === new Date(date).toLocaleDateString();
        console.log(dateIsChanged);


        if (this.state.clientUsingLocalPhoto===true){
            console.log('using local');
            const photoName = CRUD.uploadPhotoFromData(this.state.image.data);
            //console.log(photoName);

            const entry = {
                Ledger : formVal.Ledger,
                AccountID: formVal.AccountID,
                Amount: formVal.Amount,
                Currency: formVal.Currency,
                Date: formVal.Date,
                Comment: formVal.Comment,
                PhotoName: photoName
            };
            CRUD.deleteEntry(this.props.navigation.state.params.paramName.EntryID);
            CRUD.uploadEntry(entry);
            this.props.navigation.navigate("ViewEntries",{paramName: entry.Ledger})
        }
        else{
            console.log('notusinglocal');
            CRUD.deleteEntry(this.props.navigation.state.params.paramName.EntryID);
            CRUD.uploadEntry(formVal);
            this.props.navigation.navigate("ViewEntries",{paramName: formVal.Ledger})

        }


    };


    render(){


        return (
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>

                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                            { this.state.image.source === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.avatar} source={this.state.image.source} />
                            }
                        </View>
                    </TouchableOpacity>
                    <Form
                        ref={component => this._form = component} //wtf is this shit pls dont delete it works
                        type={Entry}
                        options={options} // pass the options via props
                        value={this.state.value}
                    />
                    <TouchableHighlight style={styles.blueButton} onPress={this._handleClick} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );

    }
}

module.exports = EditEntryDetails;