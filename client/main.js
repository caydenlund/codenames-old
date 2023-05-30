import "../imports/ui/landing/landing";
import "../imports/ui/board/board";
import "../imports/ui/admin/admin";

FlowRouter.route("/", {
    name: "Landing",
    action() {
        BlazeLayout.render("landing");
    }
});

FlowRouter.route("/board", {
    name: "Board",
    action() {
        BlazeLayout.render("board");
    }
});

FlowRouter.route("/admin", {
    name: "Admin",
    action() {
        BlazeLayout.render("admin");
    }
});
