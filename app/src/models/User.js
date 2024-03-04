"use strict"

const UserStorage = require('./UserStorage');

class User {
    constructor(body){
        this.body = body;
    }

    async login(){
        const client =this.body;
        const {id , password} = await UserStorage.getUserInfo(client.id);
        if(id){
            
            if(id === client.id && password === client.password){
                return  {success: true};
            }
                return {success : false, msg: "비밀번호 일치 X"};
            
        };
        
        return {success : false, msg: "존재하지 않는 아이디"};

    };
    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;