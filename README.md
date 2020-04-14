# EmpStatus
Application for employee management
My first Project while learning React-Native and redux using the hook. In this application instead of using the default localhost, I have to use ngrok URL in place of http://localhost:3000/ to use this application on my mobile with the expo app.
If you want to use this application on an android emulator you need to replace http://7edbd0d0.ngrok.io to https://10.0.2.2:3000 and if you are using your mobile device u need to use ngrok utility to generate your Http link and replace http://7edbd0d0.ngrok.io to your generated link.
To generate ngrok URL you need to go through documentation about NGROK https://www.npmjs.com/package/ngrok 
>>open CMD
>>npm install ngrok -g
>>ngrok http 3000
Some issue might show while loading first time due to unstable connection to the database so, try some given step to avoid it:
[if it shows an alert message "Something went wrong"]
Go to Home.js file 
move to line no. 25 in function from .catch(err=>{})

      const fetchData=()=>{
            fetch("http://7edbd0d0.ngrok.io/")
            .then(res=>res.json())
            .then(result=>{
                dispatch({type:"ADD_DATA",payload:result})
                dispatch({type:"SET_LOADING",payload:false})
            }).catch(err=>{
                Alert.alert("something went wrong") 
            })
        }
Remove code.......
    
    .catch(err=>{
            Alert.alert("something went wrong") 
        }) 

And save it and then run......it will work perfectly......

Removing that part of code will not affect your code.

All thanks to my instructor Mukesh phulwani(mukeshphulwani66) for guiding me in this project
