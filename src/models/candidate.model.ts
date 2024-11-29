import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Candidate extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public skills!: string;  // Changed to string
  public status!: string;
  public recruited!: boolean;
  public recruitmentYear?: number;
}

Candidate.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    skills: {
      type: DataTypes.STRING, // Changed to store comma-separated values
      allowNull: false,
      get() {
        const value = this.getDataValue('skills');
        return value ? value.split(',') : []; // Convert back to array when fetching
      },
      set(value: string[]) {
        this.setDataValue('skills', value.join(',')); // Convert array to comma-separated string
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recruited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    recruitmentYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Candidate",
    tableName: "candidates",
    timestamps: false,
  }
);

export default Candidate;
