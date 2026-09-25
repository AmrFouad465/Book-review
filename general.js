const axios=require('axios');
const logIn=function (email,password,callBackFunction){
    async function Process() {
        let data={"email":email, "password":password};
        let response =await axios.post("http://localhost:8080/auth/login",data);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null);
        }
        else{
            callBackFunction(response.data.message);
        }
    }
    Process();
}
const signIn=function (firstName,lastName,email,password,callBackFunction){
    async function Process() {
        let data={"firstName":firstName,"lastName":lastName,"email":email, "password":password};
        let response =await axios.post("http://localhost:8080/auth/signin",data);
        let statusCode=response.status;
        if(statusCode=== 201){
            callBackFunction(null);
        }
        else{
            callBackFunction(response.data.message);
        }
    }
    Process();
}

const logOut=function (callBackFunction){
    async function Process() {
        let data={"firstName":firstName,"lastName":lastName,"email":email, "password":password};
        let response =await axios.post("http://localhost:8080/auth/logout",data);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null);
        }
        else{
            callBackFunction(response.data.message);
        }
    }
    Process();
}
const getAll=function (callBackFunction){
    async function Process() {
        let response =await axios.get("http://localhost:8080/general/");
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null,response.data);
        }
        else{
            callBackFunction(response.data.message,null);
        }
    }
    Process();
}
const getBookByISBN= function (ISBN,callBackFunction){
    async function Process() {
        let response =await axios.get(`http://localhost:8080/general/isbn/${ISBN}`);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null,response.data);
        }
        else{
            callBackFunction(response.data.message,null);
        }
    }
    Process();
}
const getBookByTitle= function (title,callBackFunction){
    async function Process() {
        let response =await axios.get(`http://localhost:8080/general/title/${title}`);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null,response.data);
        }
        else{
            callBackFunction(response.data.message,null);
        }
    }
    Process();
}
const getBookByAuthor= function (author,callBackFunction){
    async function Process() {
        let response =await axios.get(`http://localhost:8080/general/author/${author}`);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null,response.data);
        }
        else{
            callBackFunction(response.data.message,null);
        }
    }
    Process();
}
const  getBookReviews= function (ISBN,callBackFunction){
    async function Process() {
        let response =await axios.get(`http://localhost:8080/general/review/${ISBN}`);
        let statusCode=response.status;
        if(statusCode=== 200){
            callBackFunction(null,response.data);
        }
        else{
            callBackFunction(response.data.message,null);
        }
    }
    Process();
}
module.exports={logIn,signIn,logOut,getAll,getBookByISBN,getBookByAuthor,getBookByTitle,getBookReviews};