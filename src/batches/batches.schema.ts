import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// Define a nested schema for the 'schedule' array items
@Schema()
export class ScheduleItem {
  // Day of the week (e.g., "Monday")
  @Prop({ required: true })
  day: string;

  // Start time of the class (e.g., "07:00 AM")
  @Prop({ required: true })
  startTime: string;

  // End time of the class (e.g., "08:00 AM")
  @Prop({ required: true })
  endTime: string;
}

// Hydrated document type for Mongoose
export type BatchDocument = HydratedDocument<Batch>;

// Define the main Batch schema
@Schema({ timestamps: true })
export class Batch {
  // Batch name (e.g., "Morning Hatha Flow")
  @Prop({ required: true, unique: true })
  name: string;

  // Array of schedule items, using the nested schema
  @Prop({ type: [ScheduleItem], required: true })
  schedule: ScheduleItem[];

  // Instructor's name
  @Prop({ required: true })
  instructor: string;

  // Maximum capacity for the batch
  @Prop({ required: true })
  maxCapacity: number;

  // Mongoose automatically adds `createdAt` and `updatedAt` with `timestamps: true`
  createdAt: Date;
  updatedAt: Date;
}

// Create the Mongoose schema from the class
export const BatchSchema = SchemaFactory.createForClass(Batch);
