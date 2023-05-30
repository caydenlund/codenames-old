import {Words} from "./words";

Meteor.methods({
    "words.clearWords"() {
        return Words.remove({});
    }
});