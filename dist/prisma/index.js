"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaclient = void 0;
const client_1 = require("../../prisma/generated/client/client");
;
exports.prismaclient = globalThis.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = exports.prismaclient;
exports.default = exports.prismaclient;
