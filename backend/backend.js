const express = require('express')
const app = express()
const fs = require('fs')

const AppRoute = {
  SIGNUP: `/signup`,
  LOGIN: `/login`,
};
const FilePath = {
  USERS: `./backend/users.json`,
  LOGINED_USER: `./backend/logged-in-user.json`,
};
const writeToFile = (path, data) => {
  fs.writeFile(path, JSON.stringify(data, null, '  '), err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

const cors = require('cors');
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:1338', 
    allowedHeaders: [ 'Content-Type' ],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const ErrorMessage = {
  NOT_LOGGED_IN: `You are not logged in.`,
  PASSWORD: `Wrong password.`,
  NO_USER: `There is no such user.`,
  USER: `User already have been created.`,
}

app.post(AppRoute.SIGNUP, (req, res) => {
  fs.readFile(FilePath.USERS, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    data = JSON.parse(data);

    if (!data.users.length) {
      data.users.push(req.body);
      writeToFile(FilePath.USERS, data)
      writeToFile(FilePath.LOGINED_USER, req.body)

      res.status(200).send(req.body)
      return;
    }

    if (data.users.find((user) => user.email === req.body.email)) {
      res.status(401).send({
        "error": ErrorMessage.USER
      })
    } else {
      data.users.push(req.body);
      writeToFile(FilePath.USERS, data)
      writeToFile(FilePath.LOGINED_USER, req.body)
      res.status(200).send(req.body)
    }
  })
})

app.post(AppRoute.LOGIN, (req, res) => {
  fs.readFile(FilePath.USERS, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    data = JSON.parse(data);

    if (!data.users.length) {
      res.status(401).send({
        "error": ErrorMessage.NO_USER
      })

      return;
    }

    const user = data.users.find((user) => user.email === req.body.email);

    if (!user) {
      writeToFile(FilePath.LOGINED_USER, {})
      res.status(401).send({
        "error": ErrorMessage.NO_USER
      })
    } else {
      if (user.password === req.body.password) {
        writeToFile(FilePath.LOGINED_USER, req.body)
        res.status(200).send(req.body)
      } else {
        writeToFile(FilePath.LOGINED_USER, {})
        res.status(401).send({
          "error": ErrorMessage.PASSWORD
        })
      }
    }
  })
})
app.get(AppRoute.LOGIN, (req, res) => {
  fs.readFile(FilePath.LOGINED_USER, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    data = JSON.parse(data);

    if (!Object.keys(data).length) {
      res.status(401).send({
        "error": ErrorMessage.NOT_LOGGED_IN
      })

      return;
    }

    console.log(data);
    res.status(200).send(data)
  })
})

const PORT = 3009
const server = app.listen(PORT, () => {
  console.log("Node.js server is running");
})