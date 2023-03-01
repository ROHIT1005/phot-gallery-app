import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema({
    name: { type: String, required: true , unique : true, dropDups: true},
    artist: { type: String, required: true },
    buyer: { type: String },
    img: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

export const ArtModel = mongoose.model('Art', ArtSchema);