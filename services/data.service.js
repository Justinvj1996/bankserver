let accountdetails = {
  1000: { accno: 1000, name: "Zane", balance: 5000, password: "user1" },
  1001: { accno: 1001, name: "Akansha", balance: 2000, password: "user2" },
  1002: { accno: 1002, name: "Ziyad", balance: 6000, password: "user3" },
  1003: { accno: 1003, name: "Charlie", balance: 8000, password: "user4" },
  1004: { accno: 1004, name: "David", balance: 4000, password: "user5" },
}
let currentUser
const register = (name, accno, password) => {
  console.log("reg called")
  if (accno in accountdetails) {
    return {
      status: false,
      statusCode: 422,
      message: "User already exist,please login"
    }
  }
  accountdetails[accno] = {
    accno,
    name,
    balance: 0,
    password

  }
  return {
    status: true,
    statusCode: 200,
    message: "Registration Successfull"
  }
}
const login = (req, accno, pwd) => {
  let dataset = accountdetails;
  if (accno in dataset) {
    var pswd1 = dataset[accno].password
    if (pswd1 == pwd) {
      req.session.currentUser = dataset[accno]
      //this.saveDetails();
      return {
        status: true,
        statusCode: 200,
        message: "Login Successfull"
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "Invalid password"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "Invalid data"
    }
  }
}
const deposit = (acno, pwd, amt) => {
  var amount = parseInt(amt)
  let dataset = accountdetails;
  if (acno in dataset) {
    var pswd1 = dataset[acno].password
    if (pswd1 == pwd) {
      dataset[acno].balance += amount;
      return {
        status: true,
        statusCode: 200,
        message: "Account has been credited"
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "Invalid Password"
      }

    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "Invalid data"
    }

  }

}
const withdraw = (acno, pwd, amt) => {
  var amount = parseInt(amt)
  let dataset = accountdetails;
  if (acno in dataset) {
    var pswd1 = dataset[acno].password
    if (pswd1 == pwd) {
      if (amount > dataset[acno].balance) {
        return {
          status: false,
          statusCode: 422,
          message: "Invalid Balance"
        }
      }
      else {
        dataset[acno].balance -= amount;
        return {
          status: true,
          statusCode: 200,
          message: "Account has been debited "
        }
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "Invalid Password"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "Invalid data"
    }
  }

}
module.exports = {
  register,
  login,
  deposit,
  withdraw
}
