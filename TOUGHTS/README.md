# Projeto Toughts

## Apresentação

Trata-se de um projeto de uma rede social onde os usuários podem ver "pensamentos" uns dos outros. Para postar um pensamento é necessário que o usuário esteja autenticado, para tanto é necessário se registrar.

## Técnica

A linguagem utilizada para a criação dessa aplicação web foi o Node.js com o framework [express](https://expressjs.com/) e o template engine [Handlebars](https://handlebarsjs.com/). O SGBD foi o MySQL e as ações de CRUD foram feitas a partir da ORM [sequelize](https://sequelize.org/).

O projeto foi estruturado sob a arquitetura MVC.

### Pacotes npm

As dependências baixadas a partir do npm foram:
    
* bcryptjs (criptografia de senhas)
* connect-flash (gerar mensagens "toast", flash-messages)
* cookie-parser, cookie-session (manter sessão na máquina do cliente para que o sistema saiba que o usuário está logado)
* express
* express-handlebars
* express-flash (flash-messages)
* express-session (autenticação no express)
* mysql2 (para conseguir trabalhar com o sequelize)
* sequelize
* nodemon
* session-file-store (salvar sessões e mantê-las em arquivos no servidor)
        
## Próximas etapas

* Curtidas
* Comentários
* Seguidores
* Compartilhamento de pensamentos
