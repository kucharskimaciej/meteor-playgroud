Namespace("collections", function() {
    this.Tasks = new Mongo.Collection("tasks");

    if(Meteor.isClient) {
        Meteor.startup(() => {
            if (this.Tasks.find().count() === 0) {
                console.log("hello", this.Tasks.find().fetch());
                this.Tasks.insert({text: "Hello Meteor!"});
            }
        });
    }

});