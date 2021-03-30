// 1XX-clientInformation
// 2XX-SUCCESS
// 3XX-Redirection
// 4XX- client error
// 5XX- server error
const { json } = require('express');
const express = require('express');
const session = require('express-session')
const dataService = require('./services/data.service');
const app = express();
app.use(session({ // act as application middleware
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))
const longMiddleware = ((req, res, next) => {
    console.log(req.body)
    next()
})
app.use(longMiddleware);//application specific middleware
const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
          status: false,
          statusCode: 422,
          message: "Please Login"
        })
      }
      else{
          next()
      }
}
app.use(express.json());
app.get('/', (req, res) => {//call back function
    res.send("GET METHOD")
})
app.post('/', (req, res) => {
    res.send("POST METHOD")
})
app.post('/register', (req, res) => {
    console.log(req.body);
    const result = dataService.register(req.body.name, req.body.accno, req.body.password)
    //console.log(result);
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));

})
app.post('/login', (req, res) => {
    console.log(req.body);
    const result = dataService.login(req, req.body.accno, req.body.password)
    //console.log(result);
    // console.log(res.send(result.message));
    res.status(result.statusCode)
    console.log(res.json(result));
})
app.post('/deposit', authMiddleware,(req, res) => {
    console.log(req.session.currentUser);
    const result = dataService.deposit(req.body.accno, req.body.password, req.body.amount)
    //console.log(result);
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})
app.post('/withdraw',authMiddleware,(req, res) => {
    console.log(req.session.currentUser);
    const result = dataService.withdraw(req.body.accno, req.body.password, req.body.amount)
    //console.log(result);
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})
app.put('/', (req, res) => {//complete modification
    res.send("PUT METHOD")
})
app.patch('/', (req, res) => {//partial modification
    res.send("PATCH METHOD")
})
app.delete('/', (req, res) => {
    res.send("DELETE METHOD")
})
app.listen(3000, () => { //listen aport to display output
    console.log("Server started at port 3000 ")
})
