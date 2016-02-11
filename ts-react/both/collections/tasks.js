Namespace("collections", function () {
    var _this = this;
    this.Tasks = new Mongo.Collection("tasks");
    if (Meteor.isClient) {
        Meteor.startup(function () {
            if (_this.Tasks.find().count() === 0) {
                console.log("hello", _this.Tasks.find().fetch());
                _this.Tasks.insert({ text: "Hello Meteor!" });
            }
        });
    }
});
