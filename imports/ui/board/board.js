import "./board.html";
import "./board.css";

import {Words} from "../../api/words/words";
import {Selected} from "../../api/selected/selected";

import {Streamer} from "../../api/streamer/streamer";

Template.board.onCreated(function () {
    this.subscribe("words");
    this.subscribe("selected");
    Streamer.on("turn", (redTurn) => {
        if (redTurn) {
            Session.set("Turn", "red");
        } else {
            Session.set("Turn", "blue");
        }
    });
});

Template.board.helpers({
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

Template.board.events({
    "click #back-button"() {
        FlowRouter.go("/");
    }
});