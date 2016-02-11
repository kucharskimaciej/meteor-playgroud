/// <reference path="../typings/browser.d.ts" />

Meteor.startup(() => {
   ReactDOM.render(<components.List />, document.getElementById("app"))
});