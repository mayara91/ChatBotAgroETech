import { Router } from "express";
import DFController from '../Controller/DFCtrl.js';

const rotaDF = new Router();
const dfControl = new DFController();
rotaDF.post('/', dfControl.processarIntencoes.bind(dfControl))

export default rotaDF;