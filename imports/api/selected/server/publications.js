import {Selected} from "../selected";

Meteor.publish("selected", () => {
    return Selected.find();
});