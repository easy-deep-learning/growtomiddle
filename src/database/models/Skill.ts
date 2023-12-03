import mongoose, { Schema, Document } from "mongoose";

/**
 * @example
 *
 * {
 *  "_id": "5f7f9d5c9d6f6b1d7c9d6f6b",
 *  "name": "HTML Forms",
 *  "description": "Collect data from user and send it to server",
 *  "materials": [],
 *  }
 */

export interface ISkill extends Document {
  _id: string;
  name: string;
  description: string;
}
