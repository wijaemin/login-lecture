"use strict"
const fs= require("fs").promises;

class UserStorage {

    static #getUserInfo(data, id){
        const users =JSON.parse(data);//유저 정보들
        const idx =users.id.indexOf(id);//getUserInfo(id)에서 받아온 id 값으로 users의 id랑 같은 index값을 가져옴
        const usersKeys = Object.keys(users); //users의 키값들만 usersKeys에 배열 형태로 넣음=>[id,password,name]
        const userInfo =usersKeys.reduce((newUser,info) =>{ //newUser라는 오브젝트에 info = usersKeys의 키 값 첫번째부터 끝까지 넣음
            newUser[info] =users[info][idx];//users의 info(=키 값)의 index에 해당하는 값을 전부 newUser[info]에 넣음
            return newUser;
        },{});
        return userInfo;
    }

    
    static getUsers(...fields) {
        // const users = this.#users;
        const newUsers = fields.reduce((newUsers,field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        
        return  newUsers;
    }

    static getUserInfo(id){
       return fs.readFile("./src/databases/users.json")
        .then((data)=>{
            return this.#getUserInfo(data, id);
        })
        .catch(console.error); 

    };



    static save(userInfo){
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        return {success: true};
    }
}

module.exports = UserStorage;