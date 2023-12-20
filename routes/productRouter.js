const express = require('express')
const Product = require('../dao/model/product')


const productRouter = express.Router()

productRouter.get('/', async (req, res) => {

    const products = await Product.find();
   
    res.json({
      products: products
    });
  
  });
 
  
  productRouter.post('/crear', async (req, res) => {
    
    const { nombre, stock, precio, img, categoria } = req.body;
  
    const products = new Product({
      nombre: nombre,
      stock: stock,
      precio: precio,  
      img: img,
      categoria: categoria,

      
    });
    await Product.create(products);
    console.log(`Soy el back y recibí estos datos ${nombre}, ${precio} `)

    res.json({ 
      mensaje: 'Creamos un usuario'
    });
  });


 productRouter.put('/delete/:id', async (req, res) => {
    const {id} = req.params
    
    const deleteProductById = async (id) =>{
      return await Product.findByIdAndDelete({ _id: id});
    }
    await deleteProductById(id)
    res.send('Eliminamos un usuario');
  });



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
const ProductUpdate = async( req,res)=>{
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

productRouter.put('/update/:id',ProductUpdate)
productRouter.get('/GetById/:id',getDataById)  
    module.exports = productRouter