// const fs = require('fs');
const fs = require('fs');
const reader = require("readline-sync");
const uuid = require('uuid');

fs.writeFileSync('./myDB.json', '', {flag: 'a+'});
let myContent = fs.readFileSync('./myDB.json', {encoding:"utf-8"});
if (myContent === '') {
    fs.writeFileSync('./myDB.json', JSON.stringify({
        userData: [],
    }), {flag: 'w+'});

}
    function main() {
        while (true) {
            console.log("1.For Registeration:");
            console.log("2.For Login ");
            console.log("3.To Delete Account");
            console.log("0.Go Back");
            const a = parseInt(reader.question("Enter Value:"));
            if (a === 0) {
                break;
            } else if (a === 1) {
                registerationOfUser()
            } else if (a === 2) {
                userlogin()

            } else if (a === 3) {

            }
        }
    }
    function registerationOfUser() {
        while (true) {
            let myDB = JSON.parse(fs.readFileSync('./myDB.json', {encoding: "utf8"}));
            const name = (reader.question("Enter Name: "));
            const phone = parseInt(reader.question("Enter Phone: "));
            const address = (reader.question("Enter Address: "));
            const cnic = parseInt(reader.question("Enter Cnic: "));
            const password = (reader.question("Enter Password: "));
            const email = (reader.question("Enter Email: "));
            const amount = parseInt(reader.question("Enter Deposit Amount: "));

            let createRecordEntity = (name, phone, address, cnic, password, email, amount, id,creatAccountDate, updatedAccountDate  ) => (
                {
                    name: name,
                    phone: phone,
                    address: address,
                    cnic: cnic,
                    password: password,
                    email: email,
                    amount: amount,
                    id: id,
                    creatAccountDate: creatAccountDate,
                    updatedAccountDate: updatedAccountDate

                }
            )

            const id = uuid.v4();

            // const myUuid  = Uuid.fromString(uuid.v4());
            // const v4UUID = myUuid.toString();

            const creatAccountDate = new Date();
            const updatedAccountDate = new Date();

            let record = createRecordEntity(name, phone, address, cnic, password, email, amount, id, creatAccountDate, updatedAccountDate )

            // console.log('Your Account Number is: ' + v4UUID());
            // console.log("Your Created Account Time is:", creatAccountDate)
            // console.log("Your Updated Account Time is:", updatedAccountDate)

            console.log("Your name is:", name);
            console.log("Your Mobile No is:", phone);
            console.log("Your Address is:", address);
            console.log("Your CNIC No is:", cnic);
            console.log("Your Password is:", password);
            console.log("Your e-mail id is:", email);
            console.log("Your 1st Deposit Amount is:", amount);
            myDB = {...myDB, userData: [...myDB.userData, record]}
            fs.writeFileSync('./myDB.json', JSON.stringify(myDB), {flag: 'w+'});
            break;
        }
    }
function userlogin(){
    let myDB = JSON.parse(fs.readFileSync('./myDB.json',{encoding:"utf8"}));
    const email = (reader.question("Enter Email: "));
    const password = (reader.question("Enter Password: "));
    let tracked = myDB.userData.filter(entity => entity.email===email && entity.password===password )
    while (true){
        console.log("1.Send Money")
        console.log("2.Deposit Money")
        console.log("3.Withdraw Money")
        console.log("4.My profile")
        console.log("5.Log Out")

        const c = parseInt(reader.question("Enter Value"));
        if (c===5){
            break;
        }else if(c===1){
            sendMoney(tracked[0]);
        }else if(c===2){
            depositMoney(tracked[0]);
        }else if(c===3){
            withdrawMoney(tracked[0])

        }else if(c===4){
            console.log(tracked)
        }
    }
}

function sendMoney(user){
    let myDB = JSON.parse(fs.readFileSync('./myDB.json',{encoding:"utf8"}));
    const accNumber = (reader.question("PleaSe Enter Account Number :  "));
     let receiverAccount = myDB.userData.filter(entity => entity.id===accNumber )
    console.log(receiverAccount)
    const amount = parseInt(reader.question("PleaSe Enter Amount:  "));
    receiverAccount[0].amount = receiverAccount[0].amount + amount;
    myDB = {
        ...myDB,
        userData: myDB.userData.map(u=> {
            if(u.id === user.id){
                return user;
            } else if (u.id === receiverAccount[0].id) {
                return receiverAccount[0]
            }
            return u;
        })
    }
    fs.writeFileSync('./myDB.json',JSON.stringify(myDB),{flag:'w+'});
}




   function depositMoney(user){
       let myDB = JSON.parse(fs.readFileSync('./myDB.json',{encoding:"utf8"}));
       const c = parseInt(reader.question("Enter Amount You Want to Deposit"));
       user.amount = user.amount + c;
       myDB = {
           ...myDB,
           userData: myDB.userData.map(u=> {
               if(u.id === user.id){
                   return user;
               }
               return u;
           })
       }
       fs.writeFileSync('./myDB.json',JSON.stringify(myDB),{flag:'w+'});
   }

function withdrawMoney(user) {
    let myDB = JSON.parse(fs.readFileSync('./myDB.json',{encoding:"utf8"}));
    const c = parseInt(reader.question("Enter Amount You Want to Withdraw"));
    user.amount = user.amount - c;
myDB = {
    ...myDB,
    userData: myDB.userData.map(u=> {
        if(u.id === user.id){
            return user;
        }
        return u;
    })
}
    fs.writeFileSync('./myDB.json',JSON.stringify(myDB),{flag:'w+'});
}


main();