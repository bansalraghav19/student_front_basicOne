import {baseurl} from './baseurl'

export const verifyToken= async()=>{
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer "+localStorage.token);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      var res= await fetch(baseurl+"showUser", requestOptions)
      res= await res.json()
      return res
}

export const sendotp=(contactnumber)=>{

      console.log("!send otp");

      var raw={
            "to":contactnumber
      };

      var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: {
                  "Content-Type": "application/json"
            },
            redirect: 'follow'
      };

      console.log(requestOptions.body);
          
      return fetch(baseurl+"sendSMS", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}

export const verifyotp=(otp,contactnumber)=>{
      
      console.log("!verify otp");

      var raw={
            "userCode":otp,
            "to":"+918076713870"
      };

      var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            redirect: 'follow'
      };
      console.log(requestOptions.body);
          
      return fetch(baseurl+"otpVerify", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}

export const register = (fname, lname,contactnumber, pass, email, state, city, grade, board)=>{
      
      var raw={
            "name":fname,
            "userName":email,
            "password":pass,
            "level":"1",
            "phone":contactnumber,
            "class":grade,
            "board":board,
            "state":state,
            "city":city
      };

      var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: {
                  "Content-Type": "application/json"
            },
            redirect: 'follow'
      };
      console.log(requestOptions.body);

      return fetch(baseurl+"register", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);return result})
      .catch(error => console.log('error', error));
      
} 

export const login = (contactnumber,pass)=>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = {
            "phone":contactnumber,
	      "password":pass
      }

      var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
      };
      console.log(requestOptions.body);

      return fetch(baseurl+"login", requestOptions)
      .then(response => {
                  if (response.ok) {
                        localStorage.setItem("token",response.token)
                        return response;
                  } 
                  else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                  }
            },
            error => {
                  var errmess = new Error(error.message);
                  throw errmess;
            }
      )
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => { 
            var obj={
                  err:''
            };
            obj.err=error;
            return obj;
      });
}


export const fetchSubTopics = async (subject,topic)=>{
      var res= await fetch(baseurl+"getSubTopics/6/"+subject+"/"+topic)
      res= await res.json()
      console.log(res,"45")
      return res
}

export const fetchAllTopics = async (subject)=>{
      var res= await fetch(baseurl+"getTopics/6/"+subject)
      res= await res.json()
      console.log(res,"sub",subject)
      return res
}


export const updateVideoTime = async (videoID,time)=>{
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer "+localStorage.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"video":videoID,"time":time});
      console.log(raw)
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      }

      var res=await fetch(baseurl+"updateTime", requestOptions)
      res=await res.json()
      return res
}

export const getVideoTime = async (videoID)=>{
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer "+localStorage.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"video":videoID});
      console.log(raw)
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      }
      console.log(videoID,"lol")
      var res=await fetch(baseurl+"getTime", requestOptions)
      console.log(res,"gotTime")
      res=await res.json()
      console.log(res,"gotTime")
      return res
}