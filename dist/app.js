"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const app = express_1.default();
const morganOptions = config_1.default.NODE_ENV === "production" ? "tiny" : "common";
const compressionOptions = {
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
            return false;
        }
        return compression_1.default.filter(req, res);
    },
};
app.use(morgan_1.default(morganOptions));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(compression_1.default(compressionOptions));
app.get("/", (req, res) => {
    res.send("hello world!");
});
exports.default = app;
