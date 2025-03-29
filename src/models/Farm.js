const farmSchema = {
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true
    },
    cpfOrCnpj: {
        type: String,
        required: true,
        unique: true
    },
    producerName: {
        type: String,
        required: true
    },
    farmName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    totalArea: {
        type: Number,
        required: true
    },
    agriculturalArea: {
        type: Number,
        required: true
    },
    vegetationArea: {
        type: Number,
        required: true
    },
    plantedCrops: {
        type: [String],
        enum: ['Soja', 'Milho', 'Algodão', 'Café', 'Cana-de-Açucar'],
        required: true
    }
};

module.exports = { farmSchema };