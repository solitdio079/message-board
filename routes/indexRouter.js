import { Router } from 'express'
import db from "../db/queries.js"
import { body, validationResult, matchedData } from "express-validator"
const router = Router()

const messages = [{
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
},
{
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
}
]

const links = [{
    name: "Home",
    href: "/"
}, {
    name: "Add Message",
    href: "/new"
}]

router.get("/", async (req, res) => {
    const messages = await db.getAllMessages()
    res.render('index', { title: "All Messages", messages, links })
})

router.get("/new", (req, res) => {
    res.render("form", { links })
})
const validateMessage = [
    body("messageUser").trim()
        .isLength({ min: 1, max: 255 }).withMessage(`User Name must be less than 255 characters`),
    body("messageText").trim()
        .isLength({ min: 1, max: 255 }).withMessage(`Message must be less than 255 characters`),


]

router.post("/new", ...validateMessage, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() })
    }
    const { messageUser, messageText } = matchedData(req)
    await db.insertMessage(req.body.messageUser, req.body.messageText, new Date().toDateString())
    //messages.push({id:messages.length,text:req.body.messageText, user:req.body.messageUser, added: new Date()})
    res.redirect("/")

})
router.get("/message/:id", async (req, res) => {
    const { id } = req.params
    const message = await db.getOneMessage(id)
    //console.log(message)
    res.render('message', { message, links })
})

export default router 