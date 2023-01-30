const os = require("os");
const fs = require('fs');
const { json } = require("express");
const filePath = os.tmpdir() + '/users.json';


const createFile = () => {
    const emptyArray = [];
    // writeFile function with filename, content and callback function
    fs.writeFile(filePath, JSON.stringify(emptyArray), function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
    });
}

const saveDataToTheFile = ({id, emailId, name, designation, picture}, saveDataCb) => {
    
    if(!id || !emailId || emailId == "null") return;

    console.log(`Saving data to file : id: ${id}, name:${name}`);
    let userInfo = {
        id,
        emailId,
        name,
        designation,
        picture
    };
    jsonReader(filePath, userInfo, jsonWritter, saveDataCb);

}


function jsonReader(filePath, arg, cb, saveDataCb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, arg, object, saveDataCb);
      } catch (err) {
        return cb && cb(err);
      }
    });
}

function jsonWritter(err, userInfo, prevData, saveDataCb){
    if (err) {
      console.log("Error reading file:", err);
      saveDataCb({status: false, message: `"Error writing file:", ${err}` });
      return;
    }

    prevData = prevData || [];
    const userExist = prevData.find(s => s.emailId === userInfo.emailId);
    console.log(`User Exist : " ${userExist ? "true" : "false"}`);
    if(!userExist){
        const newData = [...prevData, userInfo];
        console.log(JSON.stringify(newData));
        fs.writeFile(filePath, JSON.stringify(newData), err => {
            if (err) {
                console.log("Error writing file:", err);
                saveDataCb({status: false, message: `"Error writing file:", ${err}` });
            }else{
                saveDataCb({status: true, message: "Saved Successfull" });
            }

        });
    }else{
        saveDataCb({status: false, message: 'User already exist' });
    }
}

function validateUser(emailId, cb){
    console.log("validateUser : " + emailId);
    const userInfo = jsonReader(filePath, emailId, (err, emailId, users) => {
                        const user = users ? users.find(s => s.emailId === emailId) : null;
                        if(cb) cb(user);
                    });
}

function getUserById(id, cb){
    console.log("getUserById : " + id);
    const userInfo = jsonReader(filePath, id, (err, id, users) => {
        if(err){
            console.log("Error in getUserById:", err);
        }
        else{
            const user = users.find(s => s.id === id);
            if(user){
                console.log("User fetched successfully : ", JSON.stringify(user));
            }
            else{
                console.log("User not found!");
            }
            if(cb) cb(user);
        }
    });
    return userInfo;
}

module.exports = {
    saveDataToTheFile,
    createFile,
    validateUser,
    getUserById
};
