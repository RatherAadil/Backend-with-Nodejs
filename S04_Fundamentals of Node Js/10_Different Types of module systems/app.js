//Native or Core modules
import fs from 'fs';
//or
import fs from 'node:fs'; //best practice
import net from 'node:net';
import https from 'node:https';
import http from 'node:http';
import dgram from 'node:dgram';
// console.log(fs);

//User defined modules
import { name } from './mod.js';
console.log(name);

//NPM Modules
//These modules need to be installed first
import axios from 'axios';
