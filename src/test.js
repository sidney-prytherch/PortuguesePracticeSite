import { ConjugatorPort } from './ConjugatorPort.js'

const conj = new ConjugatorPort()
console.log(conj.getVerbClassAndStems("faler"));
console.log(conj.conjugate("faler", ["PRES_IND"], false))