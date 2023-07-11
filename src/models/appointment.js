'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      // define association here

      this.belongsTo(models.beneficial,{ foreignKey:'beneficialId' })
      this.belongsTo(models.User,{foreignKey:'nurseId'})
    }
  }
  Appointment.init({
    id: {
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    nurseId:{
      type:DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    beneficialId:{
      type:DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'beneficials',
        key: 'id'
      },
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'ongoing', 'no show', 'completed'),
      allowNull: false,
      defaultValue: 'scheduled'
    },
    appointmentDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};