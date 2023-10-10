const knex = require('../connection');
const jwt = require('jsonwebtoken');
const secrectKey = require('../secrectKey');


const checkLogin = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json('Não autorizado.');
    }

    try{

        const token = authorization.replace('Bearer', '').trim();

        const {id} = jwt.verify(token, secrectKey);

        const user = await knex('usuarios').where('id', id).first();

        if(!user){
            return res.status(404).json('Usuario não encontrado.');
        }

        delete user.senha;

        req.user = user;

        next();

    } catch(erro){
        return res.status(400).json({message: 'O servidore não entendeu a requisição.'});
    }

    
};

module.exports = checkLogin;