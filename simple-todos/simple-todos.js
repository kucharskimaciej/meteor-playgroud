Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Meteor.subscribe("tasks")

  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {
        sort: {
          createdAt: -1
        }
      });
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();

      var form = event.target;
      var text = form.text.value;

      Meteor.call("addTask", text);

      form.text.value = "";
    }
  });


  Template.task.events({
    "click .toggle-checked": function () {
      Meteor.call("setChecked", this._id, !this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, !this.private);
    }
  });

  Template.task.helpers({
    cssClass: function() {
      var klass = "";
      if(this.checked) {
        klass += " checked";
      }

      if(this.private) {
        klass += " private";
      }

      return klass;
    },
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });



  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find({
      $or: [
        {private: { $ne: true }},
        {owner: this.userId}
      ]
    });
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    addTask: function (text) {
      // Make sure the user is logged in before inserting a task
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Tasks.insert({
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },
    deleteTask: function (taskId) {
      var task = Tasks.findOne(taskId);
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
      var task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }

      Tasks.update(taskId, {$set: {checked: setChecked}});
    },
    setPrivate: function (taskId, setToPrivate) {
      var task = Tasks.findOne(taskId);

      // Make sure only the task owner can make a task private
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Tasks.update(taskId, {$set: {private: setToPrivate}});
    }
  });
}
