import mongoose, { Schema, model, models, Document } from "mongoose";

interface UrlDocument extends Document {
  shortId: string;
  originalUrl: string;
  clicks: number;
}

const urlSchema = new Schema<UrlDocument>(
  {
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Url = models.Url || model<UrlDocument>("Url", urlSchema);

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    throw err;
  }
}
