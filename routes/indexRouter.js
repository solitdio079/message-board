import {Router} from 'express'

const router = Router()

const messages = [{
    id:0,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
},
{
    id:1,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
}
]

const links = [{
    name:"Home",
    href: "/"
},{
    name:"Add Message",
    href: "/new"
}]

router.get("/", (req,res) => {
    res.render('index', {title:"All Messages", messages,links})
})

router.get("/new", (req,res) => {
    res.render("form",{links})
})

router.post("/new", (req,res) => {
    messages.push({id:messages.length,text:req.body.messageText, user:req.body.messageUser, added: new Date()})
    res.redirect("/")

})
router.get("/message/:id", (req,res) => {
    const {id} = req.params 
    const message = messages.filter(message => message.id ==id)[0]
    //console.log(message)
    res.render('message', {message,links})
})

export default router 