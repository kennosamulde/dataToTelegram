let express = require("express")
let app = express()

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const TelegramBot = require("node-telegram-bot-api")
const token = "1422587014:AAFW5zFxhemrBEPpTs0-HkP8KzjIngfgNuw"
const bot = new TelegramBot(token, { polling: true })

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
      <h1 class="display-4 text-center py-1">Telegram Sender</h1>
        <div class="jumbotron">
        <form action="/send-message" method="POST" id="form">
        <input type="text" name="name" placeholder="name" class="form-control mb-3"/>
        <input type="email" name="email" placeholder="email" class="form-control mb-3"/>
        <input type="text" name="description" placeholder="description"class="form-control mr-3 mb-5"/>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        </div>
      </div>
    </body>
  </html>
  `)
})

// Send form values to Telegram using bot
app.post("/send-message", function (req, res) {
  let name = req.body.name
  let email = req.body.email
  let description = req.body.description

  let msg = `Name : ${name}\nEmail : ${email}\nDescription: ${description}
    `
  const chatId = -1001258097224

  bot.sendMessage(chatId, msg)
  res.send("You sent a message to telegram!")
})

// Check for the message object --I got the chatId here
bot.on("message", (msg) => {
  console.log(msg)
  //type other code here
})

app.listen(port)
