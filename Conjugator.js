import random from './Helper.js'
import * as VerbForm from './VerbForm.js'

class Conjugator {

    constructor () {
        //?
    }

    /**
     * 
     * @param {number} index
     * @returns SubjectObject
     */
    selectSubjectObject(index) {
        if (index === 2) {
            let enabledThird = (this.enabledThirdPersonSing.includes(true)) ? this.enabledThirdPersonSing : [true, true, false];
            return random(VerbForm.persons[index].filter((_, i) => enabledThird[i] ).flat())
        } else if (index === 5) {
            let enabledThird = (this.enabledThirdPersonPlur.includes(true)) ? this.enabledThirdPersonPlur : [true, true, false];
            return random(VerbForm.persons[index].filter((_, i) => enabledThird[i] ).flat())
        } else {
            return VerbForm.persons[index][0][0]
        }
    }
}

console.log("scooby".slice(0,-3))
if (true) {
    let a = b = 3;
    console.log(a, b)
    a = 4
    console.log(a, b)
    b = 5
    console.log(a, b)
}


console.log(a, b)