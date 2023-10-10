const knex = require('../connection');
const bcrypt = require('bcrypt');
const secretKey = require('../secrectKey');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) =>{
    const {nome, email, senha} = req.body;
    const field = [];
    if(!nome){
        campo.push('nome')
    }
    if(!email){
        campo.push('email')
    }
    if(!senha){
        campo.push('senha')
    }
    if(field.length > 0 ){
        return res.status(400).json({medsage: `O campo ${field} é obrigatório`})
    }

    try{

        const existingUser = await knex('usuarios').where('email', email);

        if(existingUser){
            return res.status(400).json({message: 'Email já cadastrado.'})
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const user = await knex('usuarios').insert({
            nome,
            email,
            senha: encryptedPassword
        });

        if(!user){
            return res.status(400).json('O suário não foi cadastrado.');
        }

        return res.status(200).json('O suario foi cadastrado com sucesso!');

    } catch(error){
        return res.status(400).json({message: 'O servidore não entendeu a requisição.'})
    }
};

const login = async (req, res) =>{
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.status(404).json('É obrigatório Usuário e senha.');
    }

    try{
        const user = await knex('usuarios').where('email', email).first();

        if(!user){
            return res.status(400).json('O usuário não foi encontrado.');
        }

        const correctPassword = await bcrypt.compare(senha, user.senha);

        if(!correctPassword){
            return res.status(401).json('Usuário e senha não conferem.')
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '8h' });

        const { senha: _, ...dadosUser } = user;

        return res.status(200).json({
            usaurio: dadosUser,
            token
        });

    } catch (error){
        return res.status(400).json({message: 'O servidore não entendeu a requisição.'});
    }
};

const detailUser = async(req, res) =>{
    
    return res.status(200).json(req.user);
}

const updateUser = async (req, res) =>{
    const { nome, email, senha } = req.body;

    const {id} = req.user;
    
    try{
        const existingUser = await knex('usuarios')
        .where('email', email)
        .whereNot('id', id)
        .first();

        if(existingUser) {
            return res.status(400).json({message: 'O e-mail informado já está sendo utilizado por outro usuário.'})
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        await knex('usuarios')
        .where('id', id)
        .update({
            nome,
            email, 
            senha: encryptedPassword
        });

        return res.status(204).send();
    } catch(error){
        return res.status(400).json({ message: 'O servidor não entendeu a requisição.'})
    }
};

module.exports = {
    registerUser,
    login,
    detailUser,
    updateUser
};

