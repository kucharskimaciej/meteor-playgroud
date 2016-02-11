Meteor.startup(function () {
    ReactDOM.render(React.createElement(components.List, null), document.getElementById("app"));
});
