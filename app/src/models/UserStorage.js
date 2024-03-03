"use strict"

class UserStorage {
   static #users ={
    id : [ 'test1', 'test2', 'test3'],
    password : [ 'test1!', 'test2!', 'test3!'],
    name : ['위재민', '위재우' , '하이용'],
    };
    
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers,field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        
        return  newUsers;
    }
}

module.exports = UserStorage;