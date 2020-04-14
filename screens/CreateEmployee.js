import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert,KeyboardAvoidingView } from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation,route})=>{
    const getDetails = (type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "salary":
                    return route.params.salary
                case "email":
                    return route.params.email
                case "position":
                    return route.params.position
                case "picture":
                    return route.params.picture
            }
        }
        return ""
    }
    
    const[name,setName] = useState(getDetails("name"))
    const[phone,setPhone] = useState(getDetails("phone"))
    const[email,setEmail] = useState(getDetails("email"))
    const[salary,setSalary] = useState(getDetails("salary"))
    const[picture,setPicture] = useState(getDetails("picture"))
    const[position,setPosition] = useState(getDetails("position"))
    const[modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)

    const submitData = ()=>{
        fetch("http://7edbd0d0.ngrok.io/send-data",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved succesfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("something went wrong")
        })
    }

    const updateDetails =()=>{
        fetch("http://7edbd0d0.ngrok.io/update",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is Update succesfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("something went wrong")
        })
    }
    
    const pickFromGallery = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
           let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}`
            }
            handleUpload(newfile)
            }
        }
        else{
          Alert.alert("You need to give up permition")
        }
    }
    const pickFromCamera = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
           let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}`
            }
            handleUpload(newfile)
            }
        }
        else{
          Alert.alert("You need to give up permition")
        }
    }

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","rohit2106")
        fetch("https://api.cloudinary.com/v1_1/rohit2106/image/upload", {
            method:"post", 
            body:data
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Error while uploading Image")
        })
    }
    
    return(
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View >
           
            <TextInput
                label='Name'
                value={name}
                style = {styles.inputStyle}
                mode="outlined"
                theme = {theme}
                onFocus={()=>setenableShift(false)}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Email'
                value={email}
                style = {styles.inputStyle}
                mode="outlined"
                onFocus={()=>setenableShift(false)}
                theme = {theme}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Phone'
                value={phone}
                style = {styles.inputStyle}
                mode="outlined"
                keyboardType="number-pad"
                onFocus={()=>setenableShift(false)}
                theme = {theme}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Salary'
                value={salary}
                style = {styles.inputStyle}
                mode="outlined"
                theme = {theme}
                onFocus={()=>setenableShift(true)}
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label='Position'
                value={position}
                style = {styles.inputStyle}
                mode="outlined"
                onFocus={()=>setenableShift(true)}
                theme = {theme}
                onChangeText={text => setPosition(text)}
            />
            <Button style = {styles.inputStyle} 
            theme={theme} 
            icon={picture==""?"upload":"account-check"} 
            mode="contained" 
            onPress={()=> setModal(true)}>
                Upload Image
            </Button>
            {route.params? 
            <Button style = {styles.inputStyle} theme={theme} icon="content-save" mode="contained" onPress={()=> updateDetails()}>
            Update Details
            </Button>
            :
            <Button style = {styles.inputStyle} theme={theme} icon="content-save" mode="contained" onPress={()=> submitData()}>
                Save
            </Button>
            }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose = {()=>{
                setModal(false)
            }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                    <Button icon="camera" theme={theme} mode="contained" onPress={()=> pickFromCamera()}>
                    Camera
                </Button>
                <Button icon="image-area" theme={theme} mode="contained" onPress={()=> pickFromGallery()}>
                    Gallary
                </Button>
                    </View>
                <Button  theme={theme} onPress={()=> setModal(false)}>
                    Cancel
                </Button>
                </View>
            </Modal>
             
            
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1,
    },

    inputStyle:{
        margin:5
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})
export default CreateEmployee