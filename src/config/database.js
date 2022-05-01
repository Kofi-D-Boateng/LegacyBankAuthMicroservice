"use-strict";
const pool = require("pg").Pool;

const dbPool = new pool({});

module.exports = dbPool;
