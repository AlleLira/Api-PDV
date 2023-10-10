const knex = require('../connection');

const categories = async (req, res)=>{
    try{

       const category = await knex('categorias').select('*');

       return res.status(200).json(category);

    } catch(error){

        return res.status(400).json({message: 'O servidore não entendeu a requisição.'})

    }
};

module.exports = categories;