import {Selected} from "./selected";

Meteor.methods({
    "selected.clearSelected"() {
        return Selected.remove({});
    }
});