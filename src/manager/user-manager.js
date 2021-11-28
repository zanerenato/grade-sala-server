const guid = require('uuid')

class UserManager {
    constructor()
    {
        this.tokens = {};
    }

    addUser(username){
        var token = guid.v4().toString();
        this.tokens[username] = token;
        setTimeout( function() {
            delete this.tokens[username];
            console.log( `Deslogando o usuário ${username}` );
          }, 1000 * 60 * 60 );
        return token;
    }

    isAuthenticated(username){
        return this.tokens[username] != undefined && this.tokens[username] != '';
    }
}

module.exports = new UserManager()