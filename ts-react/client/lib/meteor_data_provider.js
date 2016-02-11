Namespace("utils", function () {
    this.DataProvider = function (wrapped, getData) {
        var provider = React.createClass({
            mixins: [ReactMeteorData],
            getMeteorData: function () {
                return getData();
            },
            render: function () {
                return React.createElement(wrapped, Object.assign({
                    data: this.data
                }, this.props));
            }
        });
        return provider;
    };
});
