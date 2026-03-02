const mongoose = require("mongoose");
const { Schema } = mongoose;

const datasetSchema = new Schema(
    {
        workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null, },
        name: { type: String, required: true, trim: true },
        engine: { type: String, enum: ["postgres", "mysql", "sqlserver", "sqlite"], default: "sqlite" },
        schemaRef: { type: String, required: true },
        seedRef: { type: String, required: true },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

// 1. Unique name per workspace
// Taki ek company apne datasets ko naam se pehchan sake
datasetSchema.index({ workspaceId: 1, name: 1 }, { unique: true });

// 2. Engine filter
// Maslan: "Mujhe sirf Postgres ke datasets dikhao"
datasetSchema.index({ engine: 1 });

// 3. Schema & Seed Reference
// Agar aap search karna chahte hain ke kis cheez se dataset banaya hai
datasetSchema.index({ schemaRef: 1 });
datasetSchema.index({ seedRef: 1 });

// unlcera schemaRef + seedRef

const Dataset = mongoose.model("Dataset", datasetSchema);

module.exports = Dataset;
