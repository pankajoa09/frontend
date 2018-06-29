import React from 'react';
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
import currentServerAddress from '../currentServerAddress'
const address= currentServerAddress.address();

class UploadPhoto extends React.Component {



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
        }, this.handleUpload)
    }



    handleUpload = ()=>{
        console.log("handle upload");
        console.log(this.state);
        const url = address+':8080/mobile/uploadPhotoEntry';
        console.log(url);
        if (this.state !== undefined) {
            RNFetchBlob.fetch('POST',url, {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                "Content-Type": 'multipart/form-data',
            }, [
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data}
            ]).then((response) => {
                console.log("SUCCESS: "+response)

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

                this.setState({
                    avatarSource: source,
                    data: response.data
                });
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
                <TouchableHighlight style={entry_details.blueButton} onPress={this.handleUpload} underlayColor='#99d9f4'>
                    <Text style={entry_details.buttonText}>Upload</Text>
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

module.exports = UploadPhoto;