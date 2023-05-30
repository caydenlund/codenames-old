import {Words} from "../words";

Meteor.publish("words", () => {
    return Words.find();
});