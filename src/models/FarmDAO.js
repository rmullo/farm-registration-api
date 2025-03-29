const {client} = require('../config/dbConnect');


module.exports = {
    async createfarm(farm) {
        const query = {
            text: `INSERT INTO farms (cpf_or_cnpj, producer_name, farm_name, city, state, total_area, agricultural_area, vegetation_area, planted_crops) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            values: Object.values(farm)
        };
        const result = await client.query(query);

        const createdfarm = {
            id: result.rows[0].id,
            cpfOrCnpj: result.rows[0].cpf_or_cnpj,
            producerName: result.rows[0].producer_name,
            farmName: result.rows[0].farm_name,
            city: result.rows[0].city,
            state: result.rows[0].state,
            totalArea: Number(result.rows[0].total_area),
            agriculturalArea: Number(result.rows[0].agricultural_area),
            vegetationArea: Number(result.rows[0].vegetation_area),
            plantedCrops: result.rows[0].planted_crops
        }

        return createdfarm;
    },

    async getfarms() {
        const query = {
            text: `SELECT * FROM farms`
        };
        const result = await client.query(query);
        
        const farms = result.rows.map(row => ({
            id: row.id,
            cpfOrCnpj: row.cpf_or_cnpj,
            producerName: row.producer_name,
            farmName: row.farm_name,
            city: row.city,
            state: row.state,
            totalArea: Number(row.total_area),
            agriculturalArea: Number(row.agricultural_area),
            vegetationArea: Number(row.vegetation_area),
            plantedCrops: row.planted_crops
        }));

        return farms;
    },

    async getfarmById(id) {
        const query = {
            text: `SELECT * FROM farms WHERE id = $1`,
            values: [id]
        };
        const result = await client.query(query);
        if (result.rows.length === 0) {
            return null;
        }
        const createdfarm = {
            id: result.rows[0].id,
            cpfOrCnpj: result.rows[0].cpf_or_cnpj,
            producerName: result.rows[0].producer_name,
            farmName: result.rows[0].farm_name,
            city: result.rows[0].city,
            state: result.rows[0].state,
            totalArea: Number(result.rows[0].total_area),
            agriculturalArea: Number(result.rows[0].agricultural_area),
            vegetationArea: Number(result.rows[0].vegetation_area),
            plantedCrops: result.rows[0].planted_crops
        }

        return createdfarm;
    },

    async getfarmByCpfOrCnpj(cpfOrCnpj) {
        const query = {
            text: `SELECT * FROM farms WHERE cpf_or_cnpj = $1`,
            values: [cpfOrCnpj]
        };
        const result = await client.query(query);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        const createdfarm = {
            id: result.rows[0].id,
            cpfOrCnpj: result.rows[0].cpf_or_cnpj,
            producerName: result.rows[0].producer_name,
            farmName: result.rows[0].farm_name,
            city: result.rows[0].city,
            state: result.rows[0].state,
            totalArea: Number(result.rows[0].total_area),
            agriculturalArea: Number(result.rows[0].agricultural_area),
            vegetationArea: Number(result.rows[0].vegetation_area),
            plantedCrops: result.rows[0].planted_crops
        }

        return createdfarm;
    },


    async updatefarm(id, updates) {
        const query = {
            text: `UPDATE farms
                SET cpf_or_cnpj = COALESCE($2, cpf_or_cnpj),
                    producer_name = COALESCE($3, producer_name),
                    farm_name = COALESCE($4, farm_name),
                    city = COALESCE($5, city),
                    state = COALESCE($6, state),
                    total_area = COALESCE($7, total_area),
                    agricultural_area = COALESCE($8, agricultural_area),
                    vegetation_area = COALESCE($9, vegetation_area),
                    planted_crops = COALESCE($10, planted_crops)
                WHERE id = $1
                RETURNING *`,
            values: [
                id,
                updates.cpfOrCnpj,
                updates.producerName,
                updates.farmName,
                updates.city,
                updates.state,
                updates.totalArea,
                updates.agriculturalArea,
                updates.vegetationArea,
                updates.plantedCrops
            ]
        };
        const result = await client.query(query);
        
        const createdfarm = {
            id: result.rows[0].id,
            cpfOrCnpj: result.rows[0].cpf_or_cnpj,
            producerName: result.rows[0].producer_name,
            farmName: result.rows[0].farm_name,
            city: result.rows[0].city,
            state: result.rows[0].state,
            totalArea: Number(result.rows[0].total_area),
            agriculturalArea: Number(result.rows[0].agricultural_area),
            vegetationArea: Number(result.rows[0].vegetation_area),
            plantedCrops: result.rows[0].planted_crops
        }

        return createdfarm;
    },

    async deletefarm(id) {
        const query = {
            text: `DELETE FROM farms WHERE id = $1`,
            values: [id]
        };
        await client.query(query);
    },

    async countFarms() {
        const query = {
            text: `SELECT COUNT(*) FROM farms`
        };
        const result = await client.query(query);
        return result.rows[0].count;
    },

    async sumTotalArea() {
        const query = {
            text: `SELECT SUM(total_area) FROM farms` 
        }
        const result = await client.query(query);
        return result.rows[0].sum;
    },  

    //Quantas fazendas produzem cada cultivo por estado

    async sumPlantedCropsByState() {
        const query = {
            text: `SELECT 
                        state,
                        crop,
                        COUNT(*) AS crop_count
                    FROM (
                        SELECT state, unnest(planted_crops) AS crop
                        FROM farms
                    ) AS crops
                    GROUP BY state, crop
                    ORDER BY state, crop_count DESC;`
        }
        const result = await client.query(query);
        return result.rows;
    },
}

