const validateCpfOrCnpj = require('../utils/validateCpfOrCnpj');
const farmDAO = require('../models/FarmDAO');
const farm = require('../models/Farm');
const client = require('../config/dbConnect');
const { count } = require('console');



module.exports = {
    async create(req, res) {
        const { cpfOrCnpj, producerName, farmName, city, state, totalArea, agriculturalArea, vegetationArea, plantedCrops } = req.body;

        try {
            //check if farm already exists
            const farmExists = await farmDAO.getfarmByCpfOrCnpj(cpfOrCnpj);
            if (farmExists) {
                return res.status(400).json({ error: 'farm already exists' });
            }
            
            //check if CPF or CNPJ is valid
            if (!validateCpfOrCnpj(cpfOrCnpj)) {
                return res.status(400).json({ error: 'Invalid CPF or CNPJ' });
            }

            //check if agriculturalArea + vegetationArea is less than totalArea
            if (agriculturalArea + vegetationArea > totalArea) {
                return res.status(400).json({ error: 'Agricultural area + vegetation area must be less than total area' });
            }

            //check if plantedCrops is valid
            if (!plantedCrops.every(crop => ['Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-Açucar'].includes(crop))) {
                return res.status(400).json({ error: 'Invalid planted crops' });
            }
            let farm = await farmDAO.createfarm({
                cpfOrCnpj,
                producerName,
                farmName,
                city,
                state,
                totalArea,
                agriculturalArea,
                vegetationArea,
                plantedCrops
            });
            farm.plantedCrops = farm.plantedCrops
                .replace(/[{}]/g, '') 
                .split(',');

            return res.json(farm);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        
        }
    },

    async index(req, res) {
        let farms = await farmDAO.getfarms();

        // Converter `plantedCrops` para array
        farms.forEach(farm => {
            farm.plantedCrops = farm.plantedCrops
                .replace(/[{}]/g, '') 
                .split(',');
        });

        return res.json(farms);
    },

    async show(req, res) {
        const { id } = req.params;

        try {
            let farm = await farmDAO.getfarmById(id);
            if (!farm) {
                return res.status(400).json({ error: 'farm not found' });
            }

            farm.plantedCrops = farm.plantedCrops
                .replace(/[{}]/g, '') 
                .split(',');

            return res.json(farm);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            //check if cpf or cnpj is valid
            if (req.body.cpfOrCnpj && !validateCpfOrCnpj(req.body.cpfOrCnpj)) {
                return res.status(400).json({ error: 'Invalid CPF or CNPJ' });
            }

            //check if agriculturalArea + vegetationArea is less than totalArea
           
            if (req.body.agriculturalArea + req.body.vegetationArea > req.body.totalArea) {
                return res.status(400).json({ error: 'Agricultural area + vegetation area must be less than total area' });
            }

            //check if plantedCrops is valid
            if (!req.body.plantedCrops.every(crop => ['Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-Açucar'].includes(crop))) {
                return res.status(400).json({ error: 'Invalid planted crops' });
            }

            let farm = await farmDAO.updatefarm(id, req.body);

            if (!farm) {
                return res.status(400).json({ error: 'farm not found' });
            }

            farm.plantedCrops = farm.plantedCrops
                .replace(/[{}]/g, '') 
                .split(',');

            return res.json(farm);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async erase(req, res) {
        const { id } = req.params;

        try {
            await farmDAO.deletefarm(id);

            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async count(req, res) {
        try {
            const count = await farmDAO.countFarms();
            return res.json({ count });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async sum(req, res) {
        try {
            const sum = await farmDAO.sumTotalArea();
            return res.json({ sum });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async sumPlantedCropsByState(req, res) {
        try {
            const sum = await farmDAO.sumPlantedCropsByState();
            return res.json(sum);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}

