export class CandidateElimination {

    constructor() {
        this.numberOfProperties = 4;
        let bigAreaLearningSet = [

            {key: ["green", "yes", "no", "huge"], value: true},
            {key: ["green", "yes", "yes", "huge"], value: true},
            {key: ["green", "yes", "no", "huge"], value: true},
            {key: ["black", "no", "no", "small"], value: false},
            {key: ["blue", "no", "no", "tiny"], value: false}
        ];

        let smallAreaLearningSet = [
            {key: ["black", "yes", "no", "tiny"], value: true},
            {key: ["black", "no", "no", "tiny"], value: true},
            {key: ["black", "yes", "no", "tiny"], value: true},
            {key: ["green", "no", "no", "small"], value: false},
            {key: ["black", "yes", "no", "huge"], value: false},
        ];

        let foodAreaLearningSet = [

            {key: ["black", "no", "yes", "huge"], value: true},
            {key: ["green", "no", "yes", "huge"], value: true},
            {key: ["blue", "no", "no", "huge"], value: true},
            {key: ["green", "yes", "no", "small"], value: false},
            {key: ["black", "yes", "yes", "tiny"], value: false}
        ];

        let hazardLearningSet = [
            {key: ["red", "no", "yes", "huge"], value: true},
            {key: ["red", "no", "no", "small"], value: true},
            {key: ["blue", "no", "yes", "tiny"], value: false},
            {key: ["green", "no", "yes", "tiny"], value: false},
            {key: ["black", "no", "yes", "tiny"], value: false} 
        ];

        this.bigArea = this.learnArea(bigAreaLearningSet);
        this.smallArea = this.learnArea(smallAreaLearningSet);
        this.foodArea = this.learnArea(foodAreaLearningSet);
        this.hazardArea = this.learnArea(hazardLearningSet);


        console.log("big area ", this.bigArea);
        console.log("smallArea area ", this.smallArea);
        console.log("foodArea area ", this.foodArea);
        console.log("hazardArea area ", this.hazardArea);


        let big = ["blue", "yes", "no", "huge"];
        let small = ["blue", "no", "no", "tiny"];
        let food = ["blue", "no", "no", "huge"];
        let hazard = ["red", "no", "yes", "tiny"];


        // this.findDestinationPlace( hazard);


    }

    findDestinationPlace(properties) {
        console.log("Current case properties: " + properties);

        if (this.hypothesisDoesCover(properties, this.foodArea)) {
            console.log("food",properties);
            return "food";
        }
        if (this.hypothesisDoesCover(properties, this.smallArea)) {
            console.log("small",properties);
            return "small";
        }
        if (this.hypothesisDoesCover(properties, this.bigArea)) {
            console.log("big",properties);
            return "big";
        }
        if (this.hypothesisDoesCover(properties, this.hazardArea)) {
            console.log("hazard",properties);
            return "hazard";
        }
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

        if (undefined !==example);
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
        if (hypothesis !== null);

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