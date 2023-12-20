const express = require('express');
const usersRouter = express.Router();
const Persona = require('../dao/model/persona');
const bcrypt = require('bcrypt') ;
const { isValidCredentials,   } = require('../dao/controller/userController');


usersRouter.get('/', async (req, res) => {

  const personas = await Persona.find().lean();
  
  res.json({
    personas: personas
  });

});


usersRouter.post('/crear', async (req, res) => {
  
  const { nombre, password, email ,direccion ,localidad } = req.body;
  
  const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);


  const persona = new Persona({
    nombre: nombre,
    password: passwordHash,
    email: email,
    direccion: direccion,
    localidad: localidad,
    
  });

  await Persona.create(persona);

  console.log(`Soy el back y recibí estos datos ${nombre}, ${password} `)

  res.json({ 
    mensaje: 'Creamos un usuario'
  });
});

usersRouter.put('/delete/:id', async (req, res) => {
  const {id} = req.params
  
  const deleteUserById = async (id) =>{
    return await Persona.findByIdAndDelete({ _id: id});
  }
  await deleteUserById(id)
  res.send('Eliminamos un usuario');
});

  usersRouter.post('/ingresar', async (req, res) => {
 
    const {email, password} = req.body
    console.log(email);
    console.log(password);
    const persona = {email, password}
  
    let result = await isValidCredentials(persona)
    if(result.ok){
        req.session.persona = persona
        res.json({ 
        isValidCredentials:true
        })
    }else{
      res.json({ 
        isValidCredentials:false
      })
    }})

    const getDataById= async (req, res)=>{
      const {id}= req.params
      try {
          const dataById = await Persona.findById({_id:id})
    
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
    const UserUpdate = async( req,res)=>{
      const {id}= req.params
    
      try{
          const putWork= await Persona.findByIdAndUpdate({_id:id}, req.body,{new:true})
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
 
  usersRouter.put('/update/:id',UserUpdate)
  usersRouter.get('/GetById/:id',getDataById)  


module.exports = usersRouter;