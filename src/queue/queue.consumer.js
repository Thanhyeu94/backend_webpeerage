"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_service_1 = __importDefault(require("../auth/auth.service"));
dotenv_1.default.config();
const mailerQueue = new bull_1.default('mailer', {
    redis: {
        host: process.env.REDIS_HOST_DEV,
        port: Number(process.env.REDIS_PORT_DEV),
    },
});
mailerQueue.process(function (job, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobData = job.data;
        console.log("job: ", jobData);
        yield auth_service_1.default.sendMail(jobData.email, jobData.link);
        done(null, true);
    });
});
mailerQueue.on('completed', function (job, result) {
    const jobData = job.data;
    console.log(`job SEND EMAIL completed with result: ${JSON.stringify(result)}`);
});
exports.default = mailerQueue;
