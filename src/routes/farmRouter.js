const express = require("express");
const {
    create,
    index,
    show,
    update,
    erase,
    count,
    sum,
    sumPlantedCropsByState
} = require("../controllers/farmCtrl");   
const farmRouter = express.Router();

farmRouter.get('/count', count)
farmRouter.get('/sum', sum);
farmRouter.get('/sumPlantedCropsByState', sumPlantedCropsByState);
farmRouter.post('/', create);
farmRouter.get('/', index);
farmRouter.get('/:id', show);
farmRouter.put('/:id', update);
farmRouter.delete('/:id', erase);



module.exports = farmRouter;