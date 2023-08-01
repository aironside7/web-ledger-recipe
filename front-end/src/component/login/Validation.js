
const Validation = (input)=>{
    if(input.response.data.error[0]?.param==='password'){
        return 'password'
      }
      else if(input.response.data.error[0]?.param==='email'){
        return 'email'
      }
      else if(input.response.data.error[0]?.param==='username'){
        return 'username'
      }
      else if(input.response.data.error[0]?.param==='name'){
        return 'name'
      }

      else if(input.response.data.error.keyValue.username){
        return 'UsernameExist'
       }
       else if(input.response.data.error.keyValue.email){
        return 'EmailExist'
       }  

       if(input.response.data.error.keyValue.username){
        console('true')
    }
}


module.exports = {Validation};