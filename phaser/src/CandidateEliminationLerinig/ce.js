export class CandidateElimination {

    constructor() {
        this.numberOfProperties = 4;
        // let properties = ["red", "labelled", "middleweight", "solid"];
        // let hazardBigFridgeArea = ["?", "labelled", "?", "?"];
        // let hazardSmallFridge = ["brown", "wooden", "?", "?"];
        // if (this.hypothesisDoesCover(properties, hazardBigFridgeArea)) {
        //     console.log("Brown");
        // }
        // if (this.hypothesisDoesCover(properties, hazardSmallFridge)) {
        //     console.log("Red");
        // }
        let bigAreaLearningSet = [

            {key:   ["big", "no", "no", "big"], value: true},
            {key:   ["big", "no", "no", "small"], value: false}
        ];

        let prepareBigFridgeAreaLearningSet = [
            {key: ["big", "yes", "no", "big-fridge"], value: true},
            {key: ["big", "no", "no", "hazard-big"], value: false}
        ];

        let prepareHazardBigLearningSet = [
            {key: ["big", "no", "yes", "hazard-big"], value: true},
            {key: ["big", "no", "no", "hazard-big"], value: false}
        ];

        let prepareSmallFridgeAreaLearningSet = [
            {key:  ["small", "yes", "no", "small-fridge"], value: true},
            {key:  ["big", "yes", "no", "small-fridge"], value: false}
        ];

        let prepareSmallAreaLearningSet = [
            {key:  ["small", "no", "no", "small"], value: true},
            {key:  ["big", "yes", "no", "small-fridge"], value: false}
        ];


        let hazardBigFridgeAreaLearningSet = [
            {key: ["big", "yes", "yes", "hazard-big-fridge"], value: true},
            {key: ["big", "no", "no", "big"], value: false}
        ];


        let hazardSmallAreaLearningSet = [

            {key: ["small", "no", "yes", "hazard-small"], value: true},
            {key: ["big", "no", "no", "hazard-small"], value: false}
        ];


        let hazardSmallFridgeAreaLearningSet = [

            {key: ["small", "yes", "yes", "hazard-small-fridge"], value: true},
            {key: ["big", "yes", "yes", "hazard-small"], value: false}
        ];

        // console.log(this.lookup(prepareBlackAreaLearningSet, ["gray", "metal", "heavy", "solid"]));


        // let bigArea = this.learnArea(prepareBlackAreaLearningSet);
        // console.log("Black area ", bigArea);
        this.bigArea = this.learnArea(bigAreaLearningSet);
        this.hazardBigFridgeArea = this.learnArea(hazardBigFridgeAreaLearningSet);
        this.bigFridgeArea = this.learnArea(prepareBigFridgeAreaLearningSet);
        this.smallFridgeArea = this.learnArea(prepareSmallFridgeAreaLearningSet);
        this.smallArea = this.learnArea(prepareSmallAreaLearningSet);
        this.hazardBigArea= this.learnArea(prepareHazardBigLearningSet);
        this.hazardSmallFridge = this.learnArea(hazardSmallFridgeAreaLearningSet);
        this.hazardSmallArea = this.learnArea(hazardSmallAreaLearningSet);


        console.log("big area ", this.bigArea);
        console.log("hazard-big-fridge area ", this.hazardBigFridgeArea);
        console.log("Blue area ", this.bigFridgeArea);
        console.log("Green area ", this.smallArea);
        console.log("Yellow area ", this.hazardSmallArea);
        console.log("Red area ", this.hazardSmallFridge);


        var training_data = [
            {"size":"big", "fridge":"yes", "hazard":"no", "shelf":"big-fridge"},
            {"size":"big", "fridge":"no", "hazard":"no", "shelf":"big"},
            {"size":"small", "fridge":"yes", "hazard":"no", "shelf":"small-fridge"},
            {"size":"small", "fridge":"no", "hazard":"no", "shelf":"small"},
            {"size":"big", "fridge":"yes", "hazard":"yes","shelf":"hazard-big-fridge"},
            {"size":"big", "fridge":"no", "hazard":"yes", "shelf":"hazard-big"},
            {"size":"small", "fridge":"yes", "hazard":"yes", "shelf":"hazard-small-fridge"},
            {"size":"small", "fridge":"no", "hazard":"yes", "shelf":"hazard-small"}
        ];




        let big = ["big", "no", "no", "big"];
        let hazardbigfridge = ["big", "yes", "yes", "hazard-big-fridge"];
        let bigFridge = ["big", "yes", "no", "big-fridge"];
        let smallFridge = ["small", "yes", "no", "small-fridge"];
        let small = ["small", "no", "no", "small"];
        let hazardBig = ["big", "no", "yes", "hazard-big"];
        let hazardSmallFridge = ["small", "yes", "yes", "hazard-small-fridge"];
        let hazardSmall = ["small", "no", "yes", "hazard-small"];

        this.findDestinationPlace(hazardSmall);


    }

    findDestinationPlace(properties) {
        console.log("Current case properties: " + properties);

        if (this.hypothesisDoesCover(properties, this.bigArea)) console.log("big");
        if (this.hypothesisDoesCover(properties, this.hazardBigFridgeArea)) console.log("hazard-big-fridge");
        if (this.hypothesisDoesCover(properties, this.bigFridgeArea)) console.log("bigFridge");
        if (this.hypothesisDoesCover(properties, this.smallFridgeArea)) console.log("smallFridge");
        if (this.hypothesisDoesCover(properties, this.smallArea)) console.log("small");
        if (this.hypothesisDoesCover(properties, this.hazardBigArea)) console.log("hazardBig");
        if (this.hypothesisDoesCover(properties, this.hazardSmallFridge)) console.log("hazardSmallFridge");
        if (this.hypothesisDoesCover(properties, this.hazardSmallArea)) console.log("hazardSmall");
    }


    lookup(tab, key) {
        try {
            var lookup = {};
            for (var i = 0, len = tab.length; i < len; i++) {
                lookup[tab[i].key] = tab[i];
            }
            return lookup[key].value
        } catch (e) {
            return 'not found ' + key;

        }


    }

    learnArea(blackAreaLearningSet) {
        let generalHypothesis = [];
        let specificHypothesis = [];

        let zgeneralHypothesis = [];
        let zspecificHypothesis = [];

        for (let i = 0; i < 4; i++) {
            zgeneralHypothesis.push("?");
            zspecificHypothesis.push("0");
        }


        generalHypothesis.push(zgeneralHypothesis);
        specificHypothesis.push(zspecificHypothesis);


        blackAreaLearningSet.forEach(example => {
            this.parseExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis);
        });

        /*
         console.log(generalHypothesis[0]);
         console.log(specificHypothesis[0]);
         */

        return specificHypothesis[0];
    }

    parseExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis) {


        if (this.exampleIsPositive(example, blackAreaLearningSet)) {

            this.parsePositiveExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis);
        } else {

            this.parseNegativeExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis);
        }
    }

    parseNegativeExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis) {


    }

    parsePositiveExample(blackAreaLearningSet, example, generalHypothesis, specificHypothesis) {
        generalHypothesis.forEach(hypothesis => {
            if ((!this.hypothesisDoesCover(example, hypothesis))) {

                console.log(`${hypothesis}  doesn't cover`, example.key, ` so it's deleted (general positive)`);
            } else {
                console.log(`${hypothesis}  does cover`, example.key, ` (general positive)`);

            }
        });

        specificHypothesis.forEach(hypothesis=> {
            if ((!this.hypothesisDoesCover(example, hypothesis))) {
                console.log(`${hypothesis}  doesn't cover`, example.key, ` so it's deleted (specific positive)`);
                this.removeHypothesis(specificHypothesis, hypothesis);
                this.addMinimalGeneralizations(specificHypothesis, hypothesis, generalHypothesis, example);
                this.deleteMoreGeneralHypothesis(specificHypothesis, hypothesis);
            }
        })
    }

    deleteMoreGeneralHypothesis(specificHypothesis, hypothesis) {

    }

    findPossibleMinimalGeneralizations(hypothesis, example) {

        let possibleGeneralizations = [];

        let current = [];
        for (let i = 0; i < this.numberOfProperties; i++) {
            if (!(hypothesis[i] === example.key[i]) && !(hypothesis[i] === "0")) {
                current.push("?");
            } else {

                current.push(example.key[i]);
            }
        }

        possibleGeneralizations.push(current);


        return possibleGeneralizations;

    }

    addMinimalGeneralizations(specificHypothesis, hypothesis, generalHypothesis, example) {

        let possibleMinimalGeneralizations = this.findPossibleMinimalGeneralizations(hypothesis, example);


        possibleMinimalGeneralizations.forEach(possibleGeneralization=> {


            if (this.generalHasMoreGeneralHypothesis(possibleGeneralization, generalHypothesis)) {


                specificHypothesis.push(possibleGeneralization);
            }
        });
    }

    generalHasMoreGeneralHypothesis(possibleGeneralization, generalHypothesis) {
        return true;
    }

    removeHypothesis(specificHypothesis, hypothesis) {
        var index = specificHypothesis.indexOf(hypothesis);
        if (index > -1) {
            specificHypothesis.splice(index, 1);
        }

        // specificHypothesis.remove(hypothesis);

    }


    exampleIsPositive(example, learningSet) {

        return this.lookup(learningSet, example.key)

    }


    hypothesisDoesCover(example, hypothesis) {

        for (let i = 0; i < 4; i++) {
            if (!(hypothesis[i] === example[i]) && !(hypothesis[i] === "?")) {

                return false;
            }
        }
        return true;
    }


}