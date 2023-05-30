import "./admin.html";
import "./admin.css";

import {Words} from "../../api/words/words";
import {Selected} from "../../api/selected/selected";

import {Streamer} from "../../api/streamer/streamer";

import {mainList} from "../../api/lists/mainList";

Template.admin.onCreated(function () {
    this.subscribe("words");
    this.subscribe("selected");
    Streamer.on("turn", (redTurn) => {
        Session.set("Turn", redTurn ? "red" : "blue");
    });
});

Template.admin.helpers({
    turn() {
        return Session.get("Turn");
    },
    words() {
        const words = Words.find().fetch();
        const selectedList = Selected.find().fetch();
        let wordList = [];
        for (let index = 0; index < words.length; index++) {
            let word = words[index].name;
            let selected = false;
            let color = words[index].color;
            for (let i = 0; i < selectedList.length; i++) {
                if (selectedList[i].name === word) {
                    selected = true;
                }
            }
            wordList.push({
                word,
                index,
                selected,
                color
            });
        }
        return wordList;
    }
});

Template.admin.events({
    "click #back-button"() {
        FlowRouter.go("/");
    },
    "click .card div"(event) {
        if (!Selected.findOne({name: event.target.dataset.word})) {
            Selected.insert({name: event.target.dataset.word});
        }
    },
    "click .js-switch-turn"() {
        Streamer.emit("turn", Session.get("Turn") === "blue");
    },
    "click .js-shuffle-board"() {
        Meteor.call("words.clearWords");
        Meteor.call("selected.clearSelected");
        const shuffle = (arr) => {
            let curr = arr.length;
            let temp = "";
            let index = 0;
            while (curr > 0) {
                index = Math.floor(Math.random() * curr);
                curr -= 1;
                temp = arr[curr];
                arr[curr] = arr[index];
                arr[index] = temp;
            }
            return arr;
        };
        let masterList = shuffle(mainList).slice(0, 25);
        let wordList = [];
        for (let i = 0; i < 25; i++) {
            wordList.push({
                name: masterList[i],
                color: "nothing"
            });
        }
        const redTurn = Math.floor(Math.random() + .5) > 0;
        let redPieces = redTurn ? 9 : 8;
        let bluePieces = redTurn ? 8 : 9;
        let assassins = 1;
        while (redPieces > 0) {
            const index = Math.floor(Math.random() * 25);
            if (wordList[index].color === "nothing") {
                wordList[index].color = "red";
                redPieces -= 1;
            }
        }
        while (bluePieces > 0) {
            const index = Math.floor(Math.random() * 25);
            if (wordList[index].color === "nothing") {
                wordList[index].color = "blue";
                bluePieces -= 1;
            }
        }
        while (assassins > 0) {
            const index = Math.floor(Math.random() * 25);
            if (wordList[index].color === "nothing") {
                wordList[index].color = "black";
                assassins -= 1;
            }
        }
        for (let i = 0; i < 25; i++) {
            Words.insert(wordList[i]);
        }
        Streamer.emit("turn", redTurn);
    }
});