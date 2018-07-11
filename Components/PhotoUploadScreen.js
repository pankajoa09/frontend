
import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    TouchableHighlight
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

import ImagePicker from 'react-native-image-picker';
import entry_details from "../styleSheets/EntryDetails_style";
import Icon from 'react-native-vector-icons/MaterialIcons'

import HelperFunctions from "./HelperFunctions";
import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();

class PhotoUploadScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Create Entry',
            tabBarLabel: 'Create Entry',
            tabBarIcon: () => <Icon size={24} name="add-circle-outline" color="white" />,

        }
    };



    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            data: null,
        }
    };

    componentDidMount(){
        this.setState({
            avatarSource: null,
            data: null,
        })
    }



    handleUpload = ()=>{
        console.log("handle upload clicked");
        console.log(this.state);
        const url = address+':8080/mobile/uploadPhotoEntry';
        console.log(url);
        const photoID = HelperFunctions.generateUniqueID();
        const photoName = photoID+'.png';

        console.log(photoName);
        if (this.state !== undefined) {
            RNFetchBlob.fetch('POST',url, {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                "Content-Type": 'multipart/form-data',
            }, [
                { name: photoID, filename: photoName, type: 'image/png', data: this.state.data}
            ]).then((response) => {
                console.log("SUCCESS: "+response);
                console.log("what teh fucker");
                console.log(photoName);
                this.props.navigation.navigate('CreateEntry', {PhotoName: photoName});
                console.log("what teh fucker2");
            }).catch((response) => {
                console.log("FAIL: "+response)

            });


        }
        else{
            console.log("infrared you know what i mean?")
        }


    };

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
            console.log('Response = ', response);

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
                console.log(response.data);

                this.setState({
                    avatarSource: source,
                    data: response.data
                },this.handleUpload);


            }
        });
    }


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                        }
                    </View>
                </TouchableOpacity>
                    <TouchableHighlight style={entry_details.blueButton} onPress={()=>this.props.navigation.navigate("CreateEntry",{paramName:""})} underlayColor='#99d9f4'>
                        <Text style={entry_details.buttonText}>Skip</Text>
                    </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 10,
        width: 200,
        height: 200
    }
});

module.exports = PhotoUploadScreen;