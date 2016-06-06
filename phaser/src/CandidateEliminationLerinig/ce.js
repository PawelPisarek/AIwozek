export class CandidateElimination {

    constructor() {
        this.numberOfProperties = 4;
        // let properties = ["red", "labelled", "middleweight", "solid"];
        // let brownArea = ["?", "labelled", "?", "?"];
        // let redArea = ["brown", "wooden", "?", "?"];
        // if (this.hypothesisDoesCover(properties, brownArea)) {
        //     console.log("Brown");
        // }
        // if (this.hypothesisDoesCover(properties, redArea)) {
        //     console.log("Red");
        // }
        let prepareBlueAreaLearningSet = [
            {key: ["white", "metal", "light", "liquid"], value: true},
            {key: ["yellow", "metal", "light", "liquid"], value: true},
            {key: ["red", "paper", "light", "liquid"], value: false},
            {key: ["gray", "metal", "light", "solid"], value: false},
            {key: ["gray", "metal", "heavy", "liquid"], value: true}
        ];


        let prepareGreenAreaLearningSet = [
            {key: ["white", "transparent", "light", "solid"], value: true},
            {key: ["yellow", "transparent", "light", "solid"], value: true},
            {key: ["red", "paper", "light", "liquid"], value: false},
            {key: ["gray", "metal", "light", "liquid"], value: false},
            {key: ["gray", "paper", "heavy", "solid"], value: false},
            {key: ["red", "transparent", "light", "solid"], value: true}
        ];

        let prepareBrownAreaLearningSet = [
            {key: ["white", "labelled", "light", "solid"], value: true},
            {key: ["yellow", "labelled", "light", "solid"], value: true},
            {key: ["red", "labelled", "light", "liquid"], value: true},
            {key: ["gray", "metal", "light", "liquid"], value: false},
            {key: ["gray", "paper", "heavy", "solid"], value: false},
            {key: ["red", "labelled", "light", "solid"], value: true},
            {key: ["red", "labelled", "heavy", "solid"], value: true}
        ];

        let prepareYellowAreaLearningSet = [

            {key: ["white", "paper", "light", "solid"], value: true},
            {key: ["yellow", "paper", "light", "solid"], value: true},
            {key: ["red", "paper", "light", "liquid"], value: true},
            {key: ["gray", "metal", "light", "liquid"], value: false},
            {key: ["gray", "paper", "heavy", "solid"], value: false},
            {key: ["red", "paper", "light", "solid"], value: true}
        ];

        let prepareRedAreaLearningSet = [

            {key: ["brown", "wooden", "heavy", "solid"], value: true},
            {key: ["yellow", "metal", "heavy", "solid"], value: false},
            {key: ["gray", "metal", "light", "solid"], value: false},
            {key: ["yellow", "metal", "light", "liquid"], value: false},
            {key: ["brown", "wooden", "heavy", "solid"], value: true},
            {key: ["brown", "wooden", "light", "liquid"], value: true},
            {key: ["red", "metal", "heavy", "solid"], value: false}
        ]


        let prepareBlackAreaLearningSet = [

            {key: ["gray", "metal", "heavy", "solid"], value: true},
            {key: ["yellow", "metal", "heavy", "solid"], value: true},
            {key: ["gray", "metal", "light", "solid"], value: false},
            {key: ["gray", "metal", "heavy", "liquid"], value: false},
            {key: ["gray", "wood", "heavy", "solid"], value: false},
            {key: ["red", "metal", "heavy", "solid"], value: true}
        ];

        // console.log(this.lookup(prepareBlackAreaLearningSet, ["gray", "metal", "heavy", "solid"]));


        // let blackArea = this.learnArea(prepareBlackAreaLearningSet);
        // console.log("Black area ", blackArea);
        this.blackArea = this.learnArea(prepareBlackAreaLearningSet);
        this.blueArea = this.learnArea(prepareBlueAreaLearningSet);
        this.greenArea = this.learnArea(prepareGreenAreaLearningSet);
        this.brownArea = this.learnArea(prepareBrownAreaLearningSet);
        this.yellowArea = this.learnArea(prepareYellowAreaLearningSet);
        this.redArea = this.learnArea(prepareRedAreaLearningSet);


        console.log("Black area ", this.blackArea);
        console.log("Blue area ", this.blueArea);
        console.log("Green area ", this.greenArea);
        console.log("Brown area ", this.brownArea);
        console.log("Yellow area ", this.yellowArea);
        console.log("Red area ", this.redArea);

        let green = ["blue", "transparent", "light", "solid"];
        let brown = ["red", "labelled", "middleweight", "solid"];
        let blue = ["yellow", "metal", "middleweight", "liquid"];
        let red = ["brown", "wooden", "heavy", "solid"];
        this.findDestinationPlace(blue);


    }

    findDestinationPlace(properties) {
        console.log("Current case properties: " + properties);

        if (this.hypothesisDoesCover(properties, this.blackArea)) console.log("Black");
        if (this.hypothesisDoesCover(properties, this.blueArea)) console.log("Blue");
        if (this.hypothesisDoesCover(properties, this.greenArea)) console.log("Green");
        if (this.hypothesisDoesCover(properties, this.yellowArea)) console.log("Yellow");
        if (this.hypothesisDoesCover(properties, this.brownArea)) console.log("Brown");
        if (this.hypothesisDoesCover(properties, this.redArea)) console.log("Red");
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