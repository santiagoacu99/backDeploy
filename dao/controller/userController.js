const bcrypt = require('bcrypt') 

const Persona = require("../model/persona")


const isValidCredentials = async (persona) =>{
    const userFound = await Persona.findOne({email: persona.email})
    console.log('hola', userFound)
    console.log(persona)
    if(userFound){
        console.log(userFound.password, persona.password)
        const passwordMatched = await bcrypt.compare(persona.password, userFound.password)

        if(passwordMatched){
            return {ok: true, userFound}
        }
    }
    return {ok: false, message: 'No existe un usuario con esas credenciales!'}
}
const getDataById= async (req, res)=>{
    const {id}= req.params
    try {
        const dataById = await Product.findById({_id:id})
  
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
  
        console.log(dataById)
        res.json({mensaje:'Obtencion de tarea exitosa', dataById})
    } catch (error) {
        console.log(error)
        res.json({mensaje:'No pudimos encontrar tu tarea'})
    }
  }
  const TareasUpdate = async( req,res)=>{
    const {id}= req.params
  
    try{
        const putWork= await Product.findByIdAndUpdate({_id:id}, req.body,{new:true})
        console.log(putWork)
        res.json({
            mensaje:'Tarea actualizada exitosamente',
            putWork
        })
    }catch(err){
        console.error('error en ele servidor al actualizar Tarea')
        console.error(err)
    }
  
  }

module.exports = { isValidCredentials}