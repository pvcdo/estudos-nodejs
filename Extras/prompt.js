const prompt = require('prompt');

/* Para passar as perguntas, há duas formas: 

    1- Array de objetos JSON onde cada objeto é uma pergunta com suas propridedade

        const questions = [
            {
                'name': "nome",
                'pattern': /^[a-zA-Z\s\-]+$/,
                'message': 'Name must be only letters, spaces, or dashes',
                'required': true
            },
            {
                'name': "password",
                'hidden': true,
                'replace': '*'
            }
        ]

    2- Um objeto que contém um objeto "properties" e dentro deste os objetos das questões, sendo que cada objeto de questão é o name do result

        const questions = {
            properties:{
                name: {
                    pattern: /^[a-zA-Z\s\-]+$/,
                    message: 'Name must be only letters, spaces, or dashes',
                    required: true
                },
                password: {
                    hidden: true
                },
                example:{
                    hidden: true,
                    replace: '*'
                }
            }
        }

    Esses formatos podem ser passados diretamente como primeiro parâmetro do prompt.get

*/

const questions = {
    properties:{
        nome: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        password: {
            hidden: true
        },
        example:{
            hidden: true,
            replace: '*'
        }
    }
}

prompt.start();

prompt.get(questions, function (err, result) {
    if (err) { return onErr(err); }
    console.log(result.nome);
    console.log(result.password);
});

function onErr(err) {
    console.log(err);
    return 1;
}

/*const prompt = require('prompt');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Email: ' + result.email);
});

function onErr(err) {
    console.log(err);
    return 1;
}*/