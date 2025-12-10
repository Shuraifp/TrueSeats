import sequelize from "./database";
import "../models/UserModel"

export const initDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log("DB Connected");
  
      await sequelize.sync({ alter: true }); 
      console.log("DB Synced");
    } catch (error) {
      console.error("DB Error:", error);
    }
  };