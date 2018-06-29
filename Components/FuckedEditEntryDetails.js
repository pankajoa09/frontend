
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
const address= currentServerAddress.address();

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
import RNFetchBlob from "react-native-fetch-blob";
import HelperFunctions from "./HelperFunctions";




const Form = t.form.Form;

const Curr = t.enums({
    'THB': 'Thai Baht',
    'USD': 'United States Dollar'
},'Currency');

const Entry = t.struct({
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
            hidden: false
        },
        PhotoName: {
            hidden: true
        },
        terms: {
            label: 'Agree to Terms',
        },

    },
};





export default class FUCKED extends Component {




    state = {
        value: {
            Ledger: '',
            AccountID: '',
            Amount: 0,
            Currency: 'THB',
            Comment: '',
            PhotoName: '',
        },
        imageSource:null,
        imageData:null,
        newPhotoName: '',
        haveImageToUpload:false
    };


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Edit Entry',
            tabBarLabel: 'Edit Entry',
            tabBarIcon: () => <Icon size={24} name="home" color="white" />,

        }
    };



    deleteEntry(entryID) {
        console.log("delete Entry");

        console.log(entryID);
        fetch(address+':8080/mobile/deleteEntry',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EntryID: entryID
            })

        }).then((response) => console.log(response));
        //this._onRefresh()
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

                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //console.log(response.data);

                this.setState({
                    imageSource: source,
                    imageData: response.data,
                    haveImageToUpload: true
                });
            }
        });
    }

    constructor(props) {
        console.log("did u fucikin die on me bitch before constructor");

        super(props);
        const originalEntryValues = this.props.navigation.state.params.paramName;
        const URI = {uri:address + ':8080/downloadImage/' + originalEntryValues.PhotoName};
        const data = CRUD.getImageDataFromImageURI(URI.uri);

        console.log(originalEntryValues);
        console.log("did u fucikin die on me bitch constructor");



        this.state = {
            value: {
                Ledger: originalEntryValues.Ledger,
                AccountID: originalEntryValues.AccountID,
                Amount: originalEntryValues.Amount,
                Currency: originalEntryValues.Currency,
                Comment: originalEntryValues.Comment,
                PhotoName: originalEntryValues.PhotoName,
                //Date: originalEntryValues.Date
            },
            imageSource: URI,
            imageData: data,
        };
    }

    handleClick = () =>{
        if (this.state.haveImageToUpload){
            this.handleUpload
        }
        else{
            this.handleSubmit
        }



    };




    handleUpload = ()=>{
        console.log("handle upload clicked");

        const url = address+':8080/mobile/uploadPhotoEntry';
        console.log(url);
        const photoID = HelperFunctions.generateUniqueID();
        const photoName = photoID+'.png';

        console.log(photoName);
        if (this.state !== undefined) {
            console.log("I THINK I KNOW WHERE U DIED U BITCH");
            console.log(this.state);
            RNFetchBlob.fetch('POST',url, {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                "Content-Type": 'multipart/form-data',
            }, [
                { name: photoID, filename: photoName, type: 'image/png', data: this.state.imageData}
            ]).then((response) => {
                console.log("did u fucikin die on me bitch HANDLEU UPLOADDDDD HAHHRHAHHFHSFH");
                console.log("SUCCESS: "+response);
                this.setState({
                    newPhotoName: photoName,
                },this.handleSubmit);

                console.log(photoName);
            }).catch((response) => {
                console.log("FAIL: "+response)

            });


        }
        else{
            console.log("fivefootsmth");
        }

    };


    handleSubmit = () => {

        const value = this._form.getValue(); // use that ref to get the form value
        console.log("handle edit submit");
        console.log('value: ', this._form);
        this.deleteEntry(this.props.navigation.state.params.paramName.EntryID);
        Keyboard.dismiss();

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
                Comment: value.Comment,
                PhotoName: this.state.imageSource
            })
        }).then((response) => console.log(response));
        this.props.navigation.navigate("ViewEntries", {paramName: value.Ledger})


    };






    render() {
        console.log("did u fucikin die on me bitch");



        return (
            <ScrollView scrollEnabled={true}>
                <View style={styles.container}>

                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                            { this.state.imageSource === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.avatar} source={this.state.imageSource} />
                            }
                        </View>
                    </TouchableOpacity>
                    <Form
                        ref={component => this._form = component} //wtf is this shit pls dont delete it works
                        type={Entry}
                        options={options} // pass the options via props
                        value={this.state.value}
                    />
                    <TouchableHighlight style={styles.blueButton} onPress={()=>this.handleUpload()} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}




