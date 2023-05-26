const Comida = require('../models/Comida');
const multer = require('multer');

// Configurar la ruta y el nombre de destino para las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads'); // Reemplaza 'ruta/de/destino' con la ruta donde deseas guardar las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Guarda el nombre original del archivo
  }
});

// Configurar el middleware de multer
const upload = multer({ storage });

exports.getComidas = async (req, res) => {
    try{
        const comidas = await Comida.find();
        res.json(comidas);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


exports.postComidas = async (req, res) => {
    try {

          const comida = new Comida({
            ...req.body,
           
          });
     
          await comida.save();
          res.send(comida);
        }
    
       catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
      }
};




exports.actualizarComida = async (req, res) => {

    try {

        const {_id, nombre, categoria } = new Comida(req.body);
        let comidas = await Comida.findById(req.params.id);

        if(!comidas){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        nombre._id = _id;
        comidas.nombre = nombre;
        comidas.categoria = categoria;

        console.log(comidas)

        comidas = await Comida.findOneAndUpdate({ _id: req.params.id }, comidas, { new: true } );
        res.json(comidas);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.verComida = async (req, res) => {

    try {

        let comidas = await Comida.findById(req.params.id);

        if(!comidas){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        res.json(comidas);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarComida = async (req, res) => {
    
    try {

        let comidas = await Comida.findById(req.params.id);
        

        if(!comidas){
            res.status(404).json({ msg: 'No existe el producto'});
        }

        comidas = await Comida.findByIdAndRemove(req.params.id);

        res.json({ msg: 'El producto: ' + comidas.nombre + ' se ha eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}