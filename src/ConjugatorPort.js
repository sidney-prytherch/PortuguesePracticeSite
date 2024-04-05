import * as VerbForm from './VerbForm.js'

export class ConjugatorPort {

    constructor() {
        this.enabledThirdPersonSing = [true, true, false];
        this.enabledThirdPersonPlur = [true, true, false];
    }



    /**
    * @param {string} infinitive 
    * @returns string
    */
    getVerbClassAndStems(infinitive) {
        if (VerbForm.stringCalculations.hasOwnProperty(infinitive)) {
            return VerbForm.stringCalculations[infinitive](infinitive);
        } else {
            for (let endingLength = 7; endingLength >= 3; endingLength--) {
                let ending = infinitive.slice(-endingLength);
                if (VerbForm.endingStringCalculations[endingLength].hasOwnProperty(ending)) {
                    return VerbForm.endingStringCalculations[endingLength][ending](infinitive)
                }
            }
        }
        switch (infinitive.charAt(infinitive.length - 2)) {
            case 'a': return VerbForm.endingStringCalculations[2]["ar"](infinitive)
            case 'e': return VerbForm.endingStringCalculations[2]["er"](infinitive)
            case 'i': return VerbForm.endingStringCalculations[2]["ir"](infinitive)
        }
    }

    conjugate(infinitiveUnformatted, verbForms, portugal) {
        let infinitive = infinitiveUnformatted.toLowerCase()
        let verbsToReturn = {}
        if (infinitive.length > 1 && !infinitive.includes(" ") && !infinitive.includes("-") && !infinitive.includes("+") &&
            verbForms && verbForms.length > 0 && infinitive.slice(-1) === 'r') {
            const verbData = this.getVerbClassAndStems(infinitive)
            const isOrthographicAr = verbData.eAndIStem !== verbData.stem
            const isOrthographicNonAr = verbData.aAndOStem !== verbData.stem
            for (let verbForm of verbForms) {
                let conjugatedVerbs = this.conjugateVerbForm(
                    verbForm,
                    isOrthographicNonAr,
                    isOrthographicAr,
                    verbData,
                    infinitive,
                    portugal
                )
                let personToVerbMap = {};
                VerbForm.orderedPersons.forEach((person, index) => {
                    personToVerbMap[person] = conjugatedVerbs[index]
                })
                verbsToReturn[verbForm] = personToVerbMap
            }
        }
        return verbsToReturn;
    }

    conjugateVerbForm(verbForm, isOrthographicNonAr, isOrthographicAr, verbData, infinitive, portugal) {
        switch (verbForm) {
            case VerbForm.TENSES.PRES_IND.code:
                if (isOrthographicNonAr) {
                    return [
                        `${verbData.aAndOStem}o`,
                        `${verbData.stem}es`,
                        `${verbData.stem}e`,
                        `${verbData.stem}emos`,
                        `${verbData.stem}eis`,
                        `${verbData.stem}em`
                    ]
                }
                return conjugatePresInd(infinitive, verbData.verbClass, verbData.presIndStem)
            case VerbForm.IMP_IND:
                return conjugateImpInd(verbData.verbClass, verbData.impIndStem)
            case VerbForm.PRET_IND:
                if (isOrthographicAr) {
                    return [
                        `${verbData.eAndIStem}ei`,
                        `${verbData.stem}aste`,
                        `${verbData.stem}ou`,
                        `${verbData.stem}amos/${verbData.stem}ámos`,
                        `${verbData.stem}astes`,
                        `${verbData.stem}aram`
                    ]
                }
                return conjugatePretInd(verbData.verbClass, verbData.pretIndStem)
            case VerbForm.SIMP_PLUP_IND:
                return conjugateSimpPlupInd(verbData.verbClass, verbData.plupIndStem)

            case VerbForm.SIMP_FUT_IND: return conjugateFutInd(
                verbData.verbClass,
                verbData.futIndStem
            )

            case VerbForm.FUT_IND: return [
                `vou ${infinitive}`,
                `vais ${infinitive}`,
                `vai ${infinitive}`,
                `vamos ${infinitive}`,
                `ides ${infinitive}`,
                `vão ${infinitive}`
            ]

            case VerbForm.COND_IND: return conjugateCondInd(
                verbData.verbClass,
                verbData.condIndStem
            )

            case VerbForm.PRES_PERF: return [
                `tenho ${verbData.participle}`,
                `tens ${verbData.participle}`,
                `tem ${verbData.participle}`,
                `temos ${verbData.participle}`,
                `tendes ${verbData.participle}`,
                `têm ${verbData.participle}`
            ]

            case VerbForm.PLUP: return [
                `tinha ${verbData.participle}`,
                `tinhas ${verbData.participle}`,
                `tinha ${verbData.participle}`,
                `tínhamos ${verbData.participle}`,
                `tínheis ${verbData.participle}`,
                `tinham ${verbData.participle}`
            ]

            case VerbForm.FUT_PERF: return [
                `terei ${verbData.participle}`,
                `terás ${verbData.participle}`,
                `terá ${verbData.participle}`,
                `teremos ${verbData.participle}`,
                `tereis ${verbData.participle}`,
                `terão ${verbData.participle}`
            ]

            case VerbForm.COND_PERF: return [
                `teria ${verbData.participle}`,
                `terias ${verbData.participle}`,
                `teria ${verbData.participle}`,
                `teríamos ${verbData.participle}`,
                `teríeis ${verbData.participle}`,
                `teriam ${verbData.participle}`
            ]

            case VerbForm.PAST_INTENT: return [
                `ia ${infinitive}`,
                `ias ${infinitive}`,
                `ia ${infinitive}`,
                `íamos ${infinitive}`,
                `íeis ${infinitive}`,
                `iam ${infinitive}`
            ]

            case VerbForm.PRES_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estou a ${infinitive}`,
                    `estás a ${infinitive}`,
                    `está a ${infinitive}`,
                    `estamos a ${infinitive}`,
                    `estais a ${infinitive}`,
                    `estão a ${infinitive}`
                ]
            } else {
                [
                    `estou ${verbData.gerund}`,
                    `estás ${verbData.gerund}`,
                    `está ${verbData.gerund}`,
                    `estamos ${verbData.gerund}`,
                    `estais ${verbData.gerund}`,
                    `estão ${verbData.gerund}`
                ]
            }

            case VerbForm.IMP_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estava a ${infinitive}`,
                    `estavas a ${infinitive}`,
                    `estava a ${infinitive}`,
                    `estávamos a ${infinitive}`,
                    `estáveis a ${infinitive}`,
                    `estavam a ${infinitive}`
                ]
            } else {
                [
                    `estava ${verbData.gerund}`,
                    `estavas ${verbData.gerund}`,
                    `estava ${verbData.gerund}`,
                    `estávamos ${verbData.gerund}`,
                    `estáveis ${verbData.gerund}`,
                    `estavam ${verbData.gerund}`
                ]
            }

            case VerbForm.PRET_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estive a ${infinitive}`,
                    `estiveste a ${infinitive}`,
                    `esteve a ${infinitive}`,
                    `estivemos a ${infinitive}`,
                    `estivestes a ${infinitive}`,
                    `estiveram a ${infinitive}`
                ]
            } else {
                [
                    `estive ${verbData.gerund}`,
                    `estiveste ${verbData.gerund}`,
                    `esteve ${verbData.gerund}`,
                    `estivemos ${verbData.gerund}`,
                    `estivestes ${verbData.gerund}`,
                    `estiveram ${verbData.gerund}`
                ]
            }

            case VerbForm.SIMP_PLUP_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estivera a ${infinitive}`,
                    `estiveras a ${infinitive}`,
                    `estivera a ${infinitive}`,
                    `estivéramos a ${infinitive}`,
                    `estivéreis a ${infinitive}`,
                    `estiveram a ${infinitive}`
                ]
            } else {
                [
                    `estivera ${verbData.gerund}`,
                    `estiveras ${verbData.gerund}`,
                    `estivera ${verbData.gerund}`,
                    `estivéramos ${verbData.gerund}`,
                    `estivéreis ${verbData.gerund}`,
                    `estiveram ${verbData.gerund}`
                ]
            }

            case VerbForm.FUT_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estarei a ${infinitive}`,
                    `estarás a ${infinitive}`,
                    `estará a ${infinitive}`,
                    `estaremos a ${infinitive}`,
                    `estareis a ${infinitive}`,
                    `estarão a ${infinitive}`
                ]
            } else {
                [
                    `estarei ${verbData.gerund}`,
                    `estarás ${verbData.gerund}`,
                    `estará ${verbData.gerund}`,
                    `estaremos ${verbData.gerund}`,
                    `estareis ${verbData.gerund}`,
                    `estarão ${verbData.gerund}`
                ]
            }

            case VerbForm.COND_PROG: if (portugal || verbData.gerund == null) {
                [
                    `estaria a ${infinitive}`,
                    `estarias a ${infinitive}`,
                    `estaria a ${infinitive}`,
                    `estaríamos a ${infinitive}`,
                    `estaríeis a ${infinitive}`,
                    `estariam a ${infinitive}`
                ]
            } else {
                [
                    `estaria ${verbData.gerund}`,
                    `estarias ${verbData.gerund}`,
                    `estaria ${verbData.gerund}`,
                    `estaríamos ${verbData.gerund}`,
                    `estaríeis ${verbData.gerund}`,
                    `estariam ${verbData.gerund}`
                ]
            }

            case VerbForm.PRES_PERF_PROG: if (portugal || verbData.gerund == null) {
                [
                    `tenho estado a ${infinitive}`,
                    `tens estado a ${infinitive}`,
                    `tem estado a ${infinitive}`,
                    `temos estado a ${infinitive}`,
                    `tendes estado a ${infinitive}`,
                    `têm estado a ${infinitive}`
                ]
            } else {
                [
                    `tenho estado ${verbData.gerund}`,
                    `tens estado ${verbData.gerund}`,
                    `tem estado ${verbData.gerund}`,
                    `temos estado ${verbData.gerund}`,
                    `tendes estado ${verbData.gerund}`,
                    `têm estado ${verbData.gerund}`
                ]
            }

            case VerbForm.PLUP_PROG: if (portugal || verbData.gerund == null) {
                [
                    `tinha estado a ${infinitive}`,
                    `tinhas estado a ${infinitive}`,
                    `tinha estado a ${infinitive}`,
                    `tínhamos estado a ${infinitive}`,
                    `tínheis estado a ${infinitive}`,
                    `tinham estado a ${infinitive}`
                ]
            } else {
                [
                    `tinha estado ${verbData.gerund}`,
                    `tinhas estado ${verbData.gerund}`,
                    `tinha estado ${verbData.gerund}`,
                    `tínhamos estado ${verbData.gerund}`,
                    `tínheis estado ${verbData.gerund}`,
                    `tinham estado ${verbData.gerund}`
                ]
            }

            case VerbForm.FUT_PERF_PROG: if (portugal || verbData.gerund == null) {
                [
                    `terei estado a ${infinitive}`,
                    `terás estado a ${infinitive}`,
                    `terá estado a ${infinitive}`,
                    `teremos estado a ${infinitive}`,
                    `tereis estado a ${infinitive}`,
                    `terão estado a ${infinitive}`
                ]
            } else {
                [
                    `terei estado ${verbData.gerund}`,
                    `terás estado ${verbData.gerund}`,
                    `terá estado ${verbData.gerund}`,
                    `teremos estado ${verbData.gerund}`,
                    `tereis estado ${verbData.gerund}`,
                    `terão estado ${verbData.gerund}`
                ]
            }

            case VerbForm.COND_PERF_PROG:
                if (portugal || verbData.gerund == null) {
                    return [
                        `teria estado a ${infinitive}`,
                        `terias estado a ${infinitive}`,
                        `teria estado a ${infinitive}`,
                        `teríamos estado a ${infinitive}`,
                        `teríeis estado a ${infinitive}`,
                        `teriam estado a ${infinitive}`
                    ]
                } else {
                    return [
                        `teria estado ${verbData.gerund}`,
                        `terias estado ${verbData.gerund}`,
                        `teria estado ${verbData.gerund}`,
                        `teríamos estado ${verbData.gerund}`,
                        `teríeis estado ${verbData.gerund}`,
                        `teriam estado ${verbData.gerund}`
                    ]
                }

            case VerbForm.PRES_SUBJ:
                if (isOrthographicAr) {
                    return [
                        `${verbData.eAndIStem}e`,
                        `${verbData.eAndIStem}es`,
                        `${verbData.eAndIStem}e`,
                        `${verbData.eAndIStem}emos`,
                        `${verbData.eAndIStem}eis`,
                        `${verbData.eAndIStem}em`
                    ]
                } else if

                    (isOrthographicNonAr) {
                    return [
                        `${verbData.aAndOStem}a`,
                        `${verbData.aAndOStem}as`,
                        `${verbData.aAndOStem}a`,
                        `${verbData.aAndOStem}amos`,
                        `${verbData.aAndOStem}ais`,
                        `${verbData.aAndOStem}am`
                    ]
                }

                else {
                    return conjugatePresSubj(verbData.verbClass, verbData.presSubjStem)
                }

            case VerbForm.PRES_PERF_SUBJ:
                return [
                    `tenha ${verbData.participle}`,
                    `tenhas ${verbData.participle}`,
                    `tenha ${verbData.participle}`,
                    `tenhamos ${verbData.participle}`,
                    `tenhais ${verbData.participle}`,
                    `tenham ${verbData.participle}`
                ]

            case VerbForm.IMP_SUBJ: return conjugateImpSubj(
                verbData.verbClass,
                verbData.impSubjStem
            )

            case VerbForm.PLUP_SUBJ: return [
                `tivesse ${verbData.participle}`,
                `tivesses ${verbData.participle}`,
                `tivesse ${verbData.participle}`,
                `tivéssemos ${verbData.participle}`,
                `tivésseis ${verbData.participle}`,
                `tivessem ${verbData.participle}`
            ]

            case VerbForm.FUT_SUBJ: return conjugateFutSubj(
                verbData.verbClass,
                verbData.futSubjStem
            )

            case VerbForm.FUT_PERF_SUBJ: return [
                `tiver ${verbData.participle}`,
                `tiveres ${verbData.participle}`,
                `tiver ${verbData.participle}`,
                `tivermos ${verbData.participle}`,
                `tiverdes ${verbData.participle}`,
                `tiveram ${verbData.participle}`
            ]

            case VerbForm.IMP_AFF:
                if (isOrthographicAr) {
                    return [
                        null,
                        `${verbData.stem}a`,
                        `${verbData.eAndIStem}e`,
                        `${verbData.eAndIStem}emos`,
                        `${verbData.stem}ai`,
                        `${verbData.eAndIStem}em`
                    ]
                }

                else if (isOrthographicNonAr) {
                    return [
                        null,
                        `${verbData.stem}e`,
                        `${verbData.aAndOStem}a`,
                        `${verbData.aAndOStem}amos`,
                        `${verbData.stem}ei`,
                        `${verbData.aAndOStem}am`
                    ]
                }

                else {
                    return conjugateImpAff(
                        infinitive,
                        verbData.verbClass,
                        verbData.impAffStem
                    )
                }

            case VerbForm.IMP_NEG:
                if (isOrthographicAr) {
                    return [
                        null,
                        `${verbData.eAndIStem} es`,
                        `${verbData.eAndIStem} e`,
                        `${verbData.eAndIStem} emos`,
                        `${verbData.eAndIStem} eis`,
                        `${verbData.eAndIStem} em`
                    ]
                }

                if (isOrthographicNonAr) {
                    return [
                        null,
                        `${verbData.aAndOStem} as`,
                        `${verbData.aAndOStem} a`,
                        `${verbData.aAndOStem} amos`,
                        `${verbData.aAndOStem} ais`,
                        `${verbData.aAndOStem} am`
                    ]
                }

                else {
                    return conjugateImpNeg(verbData.verbClass, verbData.impNegStem)
                }


            case VerbForm.PERS_INF: return conjugatePersInf(verbData.verbClass, verbData.persInfStem)
        }
    }

    conjugatePresInd(infinitive, verbClass, presIndStem) {
        switch (verbClass) {
            case VerbForm.VerbClass.REG_AR :
                return arrayOf(
                `${presIndStem}o`,
                `${presIndStem}as`,
                `${presIndStem}a`,
                `${presIndStem}amos`,
                `${presIndStem}ais`,
                `${presIndStem}am`
            )

            case VerbForm.VerbClass.REG_ER:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}es`,
                `${presIndStem}e`,
                `${presIndStem}emos`,
                `${presIndStem}eis`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.REG_IR, VerbForm.VerbClass.ABRIR, VerbForm.VerbClass.GANIR, VerbForm.VerbClass.BARRIR, VerbForm.VerbClass.DEF_ORIR, VerbForm.VerbClass.ODIR, VerbForm.VerbClass.ATIR:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}es`,
                `${presIndStem}e`,
                `${presIndStem}imos`,
                `${presIndStem}is`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.UZIR:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}es`,
                presIndStem,
                `${presIndStem}imos`,
                `${presIndStem}is`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.TER:  arrayOf(
                `${presIndStem}enho`,
                (infinitive == "ter") ? `${presIndStem}ens` : `${presIndStem}éns`,
                (infinitive == "ter") ? `${presIndStem}em` : `${presIndStem}ém`,
                `${presIndStem}emos`,
                `${presIndStem}endes`,
                `${presIndStem}êm`
            )

            case VerbForm.VerbClass.FAZER:  arrayOf(
                `${presIndStem}ço`,
                `${presIndStem}zes`,
                `${presIndStem}z`,
                `${presIndStem}zemos`,
                `${presIndStem}zeis`,
                `${presIndStem}zem`
            )

            case VerbForm.VerbClass.AIR:  arrayOf(
                `${presIndStem}io`,
                `${presIndStem}is`,
                `${presIndStem}i`,
                `${presIndStem}ímos`,
                `${presIndStem}ís`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.POR2:
            case VerbForm.VerbClass.POR1 : arrayOf(
                `${presIndStem}onho`,
                `${presIndStem}ões`,
                `${presIndStem}õe`,
                `${presIndStem}omos`,
                `${presIndStem}ondes`,
                `${presIndStem}õem`
            )

            case VerbForm.VerbClass.DIZER:
            case VerbForm.VerbClass.TRAZER:  arrayOf(
                `${presIndStem}go`,
                `${presIndStem}zes`,
                `${presIndStem}z`,
                `${presIndStem}zemos`,
                `${presIndStem}zeis`,
                `${presIndStem}zem`
            )

            case VerbForm.VerbClass.SEGUIR:  arrayOf(
                `${presIndStem}igo`,
                `${presIndStem}egues`,
                `${presIndStem}egue`,
                `${presIndStem}eguimos`,
                `${presIndStem}eguis`,
                `${presIndStem}eguem`
            )

            case VerbForm.VerbClass.CRER:
            case VerbForm.VerbClass.LER:  arrayOf(
                `${presIndStem}eio`,
                `${presIndStem}ês`,
                `${presIndStem}ê`,
                `${presIndStem}emos`,
                `${presIndStem}edes`,
                `${presIndStem}eem`
            )

            case VerbForm.VerbClass.COBRIR:  arrayOf(
                `${presIndStem}ubro`,
                `${presIndStem}obres`,
                `${presIndStem}obre`,
                `${presIndStem}obrimos`,
                `${presIndStem}obris`,
                `${presIndStem}obrem`
            )

            case VerbForm.VerbClass.QUERER:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}es`,
                `${presIndStem}/` + `${presIndStem}e`,
                `${presIndStem}emos`,
                `${presIndStem}eis`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.VALER:  arrayOf(
                `${presIndStem}ho`,
                `${presIndStem}es`,
                `${presIndStem}e/` + presIndStem,
                `${presIndStem}emos`,
                `${presIndStem}eis`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.GREDIR:  arrayOf(
                `${presIndStem}ido`,
                `${presIndStem}ides`,
                `${presIndStem}ide`,
                `${presIndStem}edimos`,
                `${presIndStem}edis`,
                `${presIndStem}idem`
            )

            case VerbForm.VerbClass.EDIR:  arrayOf(
                `${presIndStem}ço`,
                `${presIndStem}des`,
                `${presIndStem}de`,
                `${presIndStem}dimos`,
                `${presIndStem}dis`,
                `${presIndStem}dem`
            )

            case VerbForm.VerbClass.ENTIR:  arrayOf(
                `${presIndStem}into`,
                `${presIndStem}entes`,
                `${presIndStem}ente`,
                `${presIndStem}entimos`,
                `${presIndStem}entis`,
                `${presIndStem}entem`
            )

            case VerbForm.VerbClass.ENIR:  arrayOf(
                `${presIndStem}ino`,
                `${presIndStem}ines`,
                `${presIndStem}ine`,
                `${presIndStem}enimos`,
                `${presIndStem}enis`,
                `${presIndStem}inem`
            )

            case VerbForm.VerbClass.DELIR:
            case VerbForm.VerbClass.DESPIR:  arrayOf(
                null,
                `${presIndStem}es`,
                `${presIndStem}e`,
                `${presIndStem}imos`,
                `${presIndStem}is`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.ELIR:  arrayOf(
                `${presIndStem}ilo`,
                `${presIndStem}eles`,
                `${presIndStem}ele`,
                `${presIndStem}elimos`,
                `${presIndStem}elis`,
                `${presIndStem}elem`
            )

            case VerbForm.VerbClass.ERIR:  arrayOf(
                `${presIndStem}iro`,
                `${presIndStem}eres`,
                `${presIndStem}ere`,
                `${presIndStem}erimos`,
                `${presIndStem}eris`,
                `${presIndStem}erem`
            )

            case VerbForm.VerbClass.ETIR:  arrayOf(
                `${presIndStem}ito`,
                `${presIndStem}etes`,
                `${presIndStem}ete`,
                `${presIndStem}etimos`,
                `${presIndStem}etis`,
                `${presIndStem}etem`
            )

            case VerbForm.VerbClass.EAR:  arrayOf(
                `${presIndStem}io`,
                `${presIndStem}ias`,
                `${presIndStem}ia`,
                `${presIndStem}amos`,
                `${presIndStem}ais`,
                `${presIndStem}iam`
            )

            case VerbForm.VerbClass.OIBIR:  arrayOf(
                `${presIndStem}íbo`,
                `${presIndStem}íbes`,
                `${presIndStem}íbe`,
                `${presIndStem}ibimos`,
                `${presIndStem}ibis`,
                `${presIndStem}íbem`
            )

            case VerbForm.VerbClass.UINAR:  arrayOf(
                `${presIndStem}íno`,
                `${presIndStem}ínas`,
                `${presIndStem}ína`,
                `${presIndStem}inamos`,
                `${presIndStem}inais`,
                `${presIndStem}ínam`
            )

            case VerbForm.VerbClass.MOBILIAR:  arrayOf(
                `${presIndStem}ílio`,
                `${presIndStem}ílias`,
                `${presIndStem}ília`,
                `${presIndStem}iliamos`,
                `${presIndStem}iliais`,
                `${presIndStem}iliam`
            )

            case VerbForm.VerbClass.RESFOLEGAR:  arrayOf(
                `${presIndStem}ólego`,
                `${presIndStem}ólegas`,
                `${presIndStem}ólega`,
                `${presIndStem}olegamos`,
                `${presIndStem}olegais`,
                `${presIndStem}olegam`
            )

            case VerbForm.VerbClass.AGUAR:  arrayOf(
                `${presIndStem}águo`,
                `${presIndStem}águas`,
                `${presIndStem}água`,
                `${presIndStem}aguamos`,
                `${presIndStem}aguais`,
                `${presIndStem}águam`
            )

            case VerbForm.VerbClass.OER:  arrayOf(
                `${presIndStem}oo`,
                `${presIndStem}óis`,
                `${presIndStem}ói`,
                `${presIndStem}oemos`,
                `${presIndStem}oeis`,
                `${presIndStem}oem`
            )

            case VerbForm.VerbClass.VESTIR:  arrayOf(
                `${presIndStem}isto`,
                `${presIndStem}estes`,
                `${presIndStem}este`,
                `${presIndStem}estimos`,
                `${presIndStem}estis`,
                `${presIndStem}estem`
            )

            case VerbForm.VerbClass.TUIR:
            case VerbForm.VerbClass.BUIR:
            case VerbForm.VerbClass.STRUIR:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}is`,
                `${presIndStem}i`,
                `${presIndStem}ímos`,
                `${presIndStem}ís`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.ERVIR:
            case VerbForm.VerbClass.SERVIR:  arrayOf(
                `${presIndStem}irvo`,
                `${presIndStem}erves`,
                `${presIndStem}erve`,
                `${presIndStem}ervimos`,
                `${presIndStem}ervis`,
                `${presIndStem}ervem`
            )

            case VerbForm.VerbClass.CABER:  arrayOf(
                `${presIndStem}ibo`,
                `${presIndStem}bes`,
                `${presIndStem}be`,
                `${presIndStem}bemos`,
                `${presIndStem}beis`,
                `${presIndStem}bem`
            )

            case VerbForm.VerbClass.ESTAR:  arrayOf(
                `${presIndStem}ou`,
                `${presIndStem}ás`,
                `${presIndStem}á`,
                `${presIndStem}amos/` + `${presIndStem}ámos`,
                `${presIndStem}ais`,
                `${presIndStem}ão`
            )

            case VerbForm.VerbClass.GEAR:
            case VerbForm.VerbClass.NEVAR:  arrayOf(null, null, presIndStem, null, null, null)

            case VerbForm.VerbClass.HAVER:  arrayOf(
                `${presIndStem}ei`,
                `${presIndStem}ás`,
                `${presIndStem}á`,
                `${presIndStem}avemos/` + `${presIndStem}emos`,
                `${presIndStem}aveis/` + `${presIndStem}eis`,
                `${presIndStem}ão`
            )

            case VerbForm.VerbClass.IR:  arrayOf(
                `${presIndStem}vou`,
                `${presIndStem}vais`,
                `${presIndStem}vai`,
                `${presIndStem}vamos/` + `${presIndStem}imos`,
                `${presIndStem}ides`,
                `${presIndStem}vão`
            )

            case VerbForm.VerbClass.OUVIR:  arrayOf(
                `${presIndStem}uço/` + `${presIndStem}iço`,
                `${presIndStem}uves`,
                `${presIndStem}uve`,
                `${presIndStem}uvimos`,
                `${presIndStem}uvis`,
                `${presIndStem}uvem`
            )

            case VerbForm.VerbClass.PERDER:  arrayOf(
                `${presIndStem}co`,
                `${presIndStem}des`,
                `${presIndStem}de`,
                `${presIndStem}demos`,
                `${presIndStem}deis`,
                `${presIndStem}dem`
            )

            case VerbForm.VerbClass.PODER:  arrayOf(
                `${presIndStem}sso`,
                `${presIndStem}des`,
                `${presIndStem}de`,
                `${presIndStem}demos`,
                `${presIndStem}deis`,
                `${presIndStem}dem`
            )

            case VerbForm.VerbClass.PROVER:
            case VerbForm.VerbClass.VER:  arrayOf(
                `${presIndStem}ejo`,
                `${presIndStem}ês`,
                `${presIndStem}ê`,
                `${presIndStem}emos`,
                `${presIndStem}edes`,
                `${presIndStem}eem`
            )

            case VerbForm.VerbClass.SABER:  arrayOf(
                `${presIndStem}ei`,
                `${presIndStem}abes`,
                `${presIndStem}abe`,
                `${presIndStem}abemos`,
                `${presIndStem}abeis`,
                `${presIndStem}abem`
            )

            case VerbForm.VerbClass.SER:  arrayOf(
                `${presIndStem}sou`,
                `${presIndStem}és`,
                `${presIndStem}é`,
                `${presIndStem}somos`,
                `${presIndStem}sois`,
                `${presIndStem}são`
            )

            case VerbForm.VerbClass.TOSSIR:  arrayOf(
                `${presIndStem}usso`,
                `${presIndStem}osses`,
                `${presIndStem}osse`,
                `${presIndStem}ossimos`,
                `${presIndStem}ossis`,
                `${presIndStem}ossem`
            )

            case VerbForm.VerbClass.ENGOLIR: 
            case VerbForm.VerbClass.OLIR:  arrayOf(
                `${presIndStem}ulo`,
                `${presIndStem}oles`,
                `${presIndStem}ole`,
                `${presIndStem}olimos`,
                `${presIndStem}olis`,
                `${presIndStem}olem`
            )

            case VerbForm.VerbClass.FUGIR:  arrayOf(
                `${presIndStem}ujo`,
                `${presIndStem}oges`,
                `${presIndStem}oge`,
                `${presIndStem}ugimos`,
                `${presIndStem}ugis`,
                `${presIndStem}ogem`
            )

            case VerbForm.VerbClass.UBIR:  arrayOf(
                `${presIndStem}ubo`,
                `${presIndStem}obes`,
                `${presIndStem}obe`,
                `${presIndStem}ubimos`,
                `${presIndStem}ubis`,
                `${presIndStem}obem`
            )

            case VerbForm.VerbClass.UMIR:  arrayOf(
                `${presIndStem}umo`,
                `${presIndStem}omes`,
                `${presIndStem}ome`,
                `${presIndStem}umimos`,
                `${presIndStem}umis`,
                `${presIndStem}omem`
            )

            case VerbForm.VerbClass.USPIR:  arrayOf(
                `${presIndStem}uspo`,
                `${presIndStem}ospes`,
                `${presIndStem}ospe`,
                `${presIndStem}uspimos`,
                `${presIndStem}uspis`,
                `${presIndStem}ospem`
            )

            case VerbForm.VerbClass.UPIR:  arrayOf(
                `${presIndStem}upo`,
                `${presIndStem}opes`,
                `${presIndStem}ope`,
                `${presIndStem}upimos`,
                `${presIndStem}upis`,
                `${presIndStem}opem`
            )

            case VerbForm.VerbClass.ULIR:  arrayOf(
                `${presIndStem}ulo`,
                `${presIndStem}oles`,
                `${presIndStem}ole`,
                `${presIndStem}ulimos`,
                `${presIndStem}ulis`,
                `${presIndStem}olem`
            )

            case VerbForm.VerbClass.UDIR:  arrayOf(
                `${presIndStem}udo`,
                `${presIndStem}odes`,
                `${presIndStem}ode`,
                `${presIndStem}udimos`,
                `${presIndStem}udis`,
                `${presIndStem}odem`
            )

            case VerbForm.VerbClass.ERTIR:  arrayOf(
                `${presIndStem}irto`,
                `${presIndStem}ertes`,
                `${presIndStem}erte`,
                `${presIndStem}ertimos`,
                `${presIndStem}ertis`,
                `${presIndStem}ertem`
            )

            case VerbForm.VerbClass.ERGIR:  arrayOf(
                `${presIndStem}irjo`,
                `${presIndStem}erges`,
                `${presIndStem}erge`,
                `${presIndStem}ergimos`,
                `${presIndStem}ergis`,
                `${presIndStem}ergem`
            )

            case VerbForm.VerbClass.SAUDAR:  arrayOf(
                `${presIndStem}údo`,
                `${presIndStem}údas`,
                `${presIndStem}úda`,
                `${presIndStem}udamos`,
                `${presIndStem}udais`,
                `${presIndStem}údam`
            )

            case VerbForm.VerbClass.REUNIR:  arrayOf(
                `${presIndStem}úno`,
                `${presIndStem}únes`,
                `${presIndStem}úne`,
                `${presIndStem}unimos`,
                `${presIndStem}unis`,
                `${presIndStem}únem`
            )

            case VerbForm.VerbClass.REMIR:  arrayOf(
                `${presIndStem}dimo/` + `${presIndStem}dimes/` + `${presIndStem}dime/` + `${presIndStem}mimos`,
                `${presIndStem}mis`,
                `${presIndStem}dimem`
            )

            case VerbForm.VerbClass.DORMIR:  arrayOf(
                `${presIndStem}urmo`,
                `${presIndStem}ormes`,
                `${presIndStem}orme`,
                `${presIndStem}ormimos`,
                `${presIndStem}ormis`,
                `${presIndStem}ormem`
            )

            case VerbForm.VerbClass.PRAZER:  arrayOf(
                "{d}" + `${presIndStem}o`,
                "{d}" + `${presIndStem}es`,
                presIndStem,
                "{d}" + `${presIndStem}emos`,
                "{d}" + `${presIndStem}eis`,
                "{d}" + `${presIndStem}em`
            )

            case VerbForm.VerbClass.DOER:  arrayOf(
                "{d}" + `${presIndStem}oo`,
                "{d}" + `${presIndStem}óis`,
                `${presIndStem}ói`,
                "{d}" + `${presIndStem}oemos`,
                "{d}" + `${presIndStem}oeis`,
                `${presIndStem}oem`
            )

            case VerbForm.VerbClass.FALIR:  arrayOf(
                null,
                null,
                null,
                `${presIndStem}mos`,
                `${presIndStem}s`,
                null
            )

            case VerbForm.VerbClass.VIR:  arrayOf(
                `${presIndStem}enho`,
                `${presIndStem}ens`,
                `${presIndStem}em`,
                `${presIndStem}imos`,
                `${presIndStem}indes`,
                `${presIndStem}êm`
            )

            case VerbForm.VerbClass.IAR:  arrayOf(
                `${presIndStem}eio`,
                `${presIndStem}eias`,
                `${presIndStem}eia`,
                `${presIndStem}iamos`,
                `${presIndStem}iais`,
                `${presIndStem}eiam`
            )

            case VerbForm.VerbClass.DAR:  arrayOf(
                `${presIndStem}ou`,
                `${presIndStem}ás`,
                `${presIndStem}á`,
                `${presIndStem}amos`,
                `${presIndStem}ais`,
                `${presIndStem}ão`
            )

            case VerbForm.VerbClass.RIR:  arrayOf(
                `${presIndStem}o`,
                `${presIndStem}s`,
                presIndStem,
                `${presIndStem}mos`,
                `${presIndStem}des`,
                `${presIndStem}em`
            )

            case VerbForm.VerbClass.OIAR:  arrayOf(
                `${presIndStem}óio`,
                `${presIndStem}óias`,
                `${presIndStem}óia`,
                `${presIndStem}oiamos`,
                `${presIndStem}oiais`,
                `${presIndStem}óiam`
            )
        }
    }

}