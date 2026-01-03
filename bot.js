process.on('uncaughtException', (err) => {
  if (err.message.includes('unknown chat format')) {
    console.log('⚠️  Ignored a chat parsing error (Known 1.21 bug). Bot is still running.')
    return
  }
  console.error('CRITICAL ERROR:', err)
  process.exit(1)
})

const mineflayer = require('mineflayer')

const options = {
  host: 'corgidor.aternos.host',
  port: 64345,
  username: 'Blockname',
  auth: 'offline',
  version: '1.20.4'
}

const botPassword = 'MySecretPassword123'

function createBot() {
  const bot = mineflayer.createBot(options)

  bot.on('messagestr', (message) => {
    const msg = message.toLowerCase()
    if (msg.includes('/register') || msg.includes('please register')) {
      bot.chat(`/register ${botPassword} ${botPassword}`)
    }

    if (msg.includes('/login') || msg.includes('please login')) {
      bot.chat(`/login ${botPassword}`)
    }

    console.log(msg)
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined! Starting Human Simulation...')
    humanBehavior(bot)
  })

  bot.on('kicked', (reason) => console.log('Kicked:', reason))
  bot.on('error', (err) => console.log('Error:', err))
  
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 30 seconds...')
    setTimeout(createBot, 30000) 
  })
}

function humanBehavior(bot) {
  const lookTime = Math.random() * 8000 + 2000 
  setTimeout(() => {
    bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI)
    humanBehavior(bot) 
  }, lookTime)

  const actionTime = Math.random() * 5000 + 3000
  setTimeout(() => {
    if (bot.entity && bot.entity.onGround) {
      const action = Math.floor(Math.random() * 4)
      
      switch(action) {
        case 0:
          bot.setControlState('jump', true)
          bot.setControlState('forward', true) 
          setTimeout(() => { 
            bot.setControlState('jump', false) 
            bot.setControlState('forward', false)
          }, 500)
          break;
          
        case 1:
          bot.swingArm()
          break;
          
        case 2: 
          bot.setControlState('sneak', true)
          setTimeout(() => bot.setControlState('sneak', false), 1000)
          break;
          
        case 3:
           bot.setControlState('back', true)
           setTimeout(() => bot.setControlState('back', false), 500)
           break;
      }
    }
  }, actionTime)
}

createBot()