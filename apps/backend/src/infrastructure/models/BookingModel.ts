import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/database';
import UserModel from './UserModel';
import EventModel from './EventModel';

interface BookingAttributes {
  id: number;
  userId: number; // Foreign key to User
  eventId: number; // Foreign key to Event
  ticketsBooked: number;
  bookingDate: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {}

class BookingModel extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public userId!: number;
  public eventId!: number;
  public ticketsBooked!: number;
  public bookingDate!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BookingModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
    eventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: EventModel,
        key: 'id',
      },
    },
    ticketsBooked: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'bookings',
    sequelize,
  }
);

// Define associations
BookingModel.belongsTo(UserModel, { foreignKey: 'userId' });
BookingModel.belongsTo(EventModel, { foreignKey: 'eventId' });
UserModel.hasMany(BookingModel, { foreignKey: 'userId' });
EventModel.hasMany(BookingModel, { foreignKey: 'eventId' });

export default BookingModel;
