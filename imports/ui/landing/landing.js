import "./landing.html";
import "./landing.css";

Template.landing.events({
    "click .btn"(event) {
        FlowRouter.go("/" + event.target.dataset.name);
    }
});