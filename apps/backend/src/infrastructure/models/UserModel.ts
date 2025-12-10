import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class UserModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "user" | "admin";
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
  },
  { sequelize, modelName: "User" }
);

export default UserModel;
