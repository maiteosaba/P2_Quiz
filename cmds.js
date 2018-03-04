const model = require('./model');
const {log, biglog, errorlog, colorize} = require("./out");

exports.helpCmd = rl => {
    log(" Commandos:");
    log(" h|help - Muestra esta ayuda.");
    log(" list - Listar los quizzes existentes.");
    log(" show <id> - Muestra la pregunta y la respuesta el quiz indicado.");
    log(" add -  Añadir un nuevo quiz interactivamente.");
    log(" delete <id> - Borrar el quiz indicado.");
    log(" edit <id> - Editar el quiz indicado.");
    log(" test <id> -Probar el quiz indicado.");
    log(" p|play -  Jugar a preguntar aleatoriamente todos los quizzes.");
    log(" credits - Créditos.");
    log(" q|quit - Salir del programa.");
    rl.prompt();
};
exports.quitCmd = rl => {
    rl.close();
};
exports.addCmd = rl => {
    rl.question(colorize('Introduzca una pregunta: ', 'red'), question => {
        rl.question(colorize('Introduzca la respuesta ', 'red'),answer => {
            model.add(question, answer);
            log(`${colorize('Se ha añadido', 'magenta')}: ${question}${colorize('=> ', 'magenta')}${answer}`);
            rl.prompt();
        });
    });
};
exports.listCmd = rl => {
    model.getAll().forEach((quiz, id) => {
        log(`[${colorize(id, 'magenta')}]: ${quiz.question}`);
    } );
    rl.prompt();
};
exports.showCmd = (rl, id) => {
    if (typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
    } else {
        try{
            const quiz = model.getByIndex(id);
            log(`[${colorize(id, 'magenta')}]: ${quiz.question}${colorize(' =>', 'magenta')} ${quiz.answer}`);
        }catch (error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};
exports.testCmd = (rl, id) => {
    if (typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
        rl.prompt();
    } else {
        try {
            const quiz = model.getByIndex(id);
            let a = quiz.question;
            let b = '? ';
            let que = a.concat(b);

            rl.question(colorize(que, 'red'), resp => {
                let resp1 = resp.toLowerCase().trim();
                let answer1 = quiz.answer.toLowerCase().trim();
                    if (resp1 === answer1){
                        log ('Su respuesta es:');
                        log ('Correcta');
                        biglog('Correcta' , 'green');
                    }
                    else  {
                        log ('Su respuesta es:');
                        log ('Incorrecta');
                        biglog('Incorrecta' , 'red');
                    }
                    rl.prompt();
                });

        } catch (error){
            errorlog(error.message);
            rl.prompt();
        }
    }
};
exports.playCmd = rl => {
    let score = 0;

    let toBeResolved =




};
exports.deleteCmd = (rl, id)=> {
    if (typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
    } else {
        try{
            model.deleteByIndex(id);
        }catch (error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};
exports.editCmd = (rl, id) => {
    if (typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
        rl.prompt();
    } else {
        try {
            const quiz = model.getByIndex(id);

            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);
            rl.question(colorize('Introduzca una pregunta: ', 'red'), question => {
                process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);
                rl.question(colorize('Introduzca la respuesta ', 'red'),answer => {
                    model.update(id, question, answer);
                    log(`Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question}${colorize('=> ', 'magenta')}${answer}`);
                    rl.prompt();
                });
            });
        } catch (error){
           errorlog(error.message);
           rl.prompt();
         }
    }
};
exports.creditsCmd = rl => {
    log('Autores de la práctica:');
    log('Maite Martínez de Osaba Estévez.', 'green');
    log('Jaime Villaverde Moreno.', 'green');
    rl.prompt();

};