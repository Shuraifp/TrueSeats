import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/database';
import UserModel from './UserModel';

interface EventAttributes {
  id: number;
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
  creatorId: number;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

class EventModel extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;
  public availableSeats!: number;
  public creatorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EventModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(512),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  {
    tableName: 'events',
    sequelize,
  }
);

EventModel.belongsTo(UserModel, { foreignKey: 'creatorId' });

export default EventModel;
