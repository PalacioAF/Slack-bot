const { RTMClient } = require('@slack/rtm-api')
const { WebClient } = require('@slack/web-api')
const conectarDB=require('./config/db');
require('dotenv').config({path:'variables.env'});
const { addUser, getUsers } = require('./controllers/userController')

const rtm = new RTMClient(process.env.TOKEN_ID);
const web = new WebClient(process.env.TOKEN_ID);

rtm.start()
  .catch(console.error);

rtm.on('ready', async () => {
    console.log('bot started')
    conectarDB();
})

rtm.on('message', async (data) => {
    if (data.type !== 'message' || data.subtype == 'bot_message' || !data.text) return;
    const args = data.text.split(' ');
    const command = args.splice(1, 1)[0];
    const user = data.user
    console.log({ command, user });

    if (command === 'add') {
        try {
            addUser(user)
            sendMessage('#proyecto', `usuario agregado : <@${user}>`)
        } catch (e) {
            console.log(e)
        }
    }

    if (command === 'list') {
        try {
            const list = await getUsers()
            sendMessage('#proyecto', list)
        } catch (e) {
            console.log(e)
        }
    }
});

rtm.on('error', (error) => console.log(error))

const sendMessage = async (channel, message) => {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}
