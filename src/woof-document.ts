import { Document } from "mongodb";

export interface WoofDocument extends Document {
  _id: number;
  count: number;
}
