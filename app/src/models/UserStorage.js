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

    static #getUsers(data, isAll, fields) {
        const users=JSON.parse(data);
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers,field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});
        
        return  newUsers;

    }
    
    static getUsers(isAll, ...fields) {

        return fs.readFile("./src/databases/users.json")
        .then((data)=>{
            return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error); 
    }

    static getUserInfo(id){
       return fs.readFile("./src/databases/users.json")
        .then((data)=>{
            return this.#getUserInfo(data, id);
        })
        .catch(console.error); 

    };



    static async save(userInfo){
        // const users =await this.getUsers("id", "password", "name");모든 데이터 가져오고 싶을 때 true
        const users =await this.getUsers(true);
        // console.log(users);모든 데이터 가져오고 싶을 때 true
        if(users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        //데이터 추가
        fs.writeFile("./src/databases/users.json",JSON.stringify(users));
        return {success: true};
    }
}

module.exports = UserStorage;