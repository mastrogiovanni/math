
const telegraphBotId = '<BotId>'

const Telegraf = require('telegraf');
const bot = new Telegraf(telegraphBotId);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

function generator() {
    var a = getRandomInt(2, 9)
    var b = getRandomInt(2, 10)
    return {
        text: a + " per " + b + " = ?",
        value: a * b
    }
}

function scores(generator) {

    this.giuste = 0
    this.sbagliate = 0
    this.risultato = generator()
    this.response = ''

    this.punteggio = function() {
        if (this.sbagliate == 0) {
            return "Sono tutte " + this.giuste + " giuste!!! Sei un campione!!!"
        }
        else {
            return "Il tuo punteggio è " + this.giuste + " contro " + this.sbagliate + " sbagliate"
        }
    }

    this.test = function(value) {
        console.log("Ha messo " + value + " e il risultato è " + this.risultato.value)
        if ("" + this.risultato.value === "" + value) {
            this.giuste = this.giuste + 1
            this.response = 'Ben fatto!!!\n' + this.punteggio() + "\n"
        }
        else {
            this.sbagliate = this.sbagliate + 1
            this.response = 'Ahia!!! Il risultato era ' + this.risultato.value + '\n' + this.punteggio() + "\n"
        }
    }

}

var giocatori = {}

bot.start((message) => {
    console.log('started:', JSON.stringify(message.from))
    if (giocatori[message.from.id] === undefined) {
        giocatori[message.from.id] = new scores(generator)
        return message.reply(
            'Benvenuto ' + message.from.first_name + ' nella gara di moltiplicazioni, pronto per iniziare?\n' + 
            giocatori[message.from.id].risultato.text
        );
    }
})

bot.on('text', message => {
    giocatori[message.from.id].test(message.message.text)
    message.reply(giocatori[message.from.id].response)
    giocatori[message.from.id].risultato = generator()
    message.reply(giocatori[message.from.id].risultato.text)
})

bot.startPolling();

