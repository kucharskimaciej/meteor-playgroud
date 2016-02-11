var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ListInner = (function (_super) {
    __extends(ListInner, _super);
    function ListInner() {
        _super.apply(this, arguments);
    }
    ListInner.prototype.render = function () {
        console.log(this.props.data);
        return (React.createElement("section", {"className": "container"}, React.createElement("header", null, React.createElement("h1", null, "Todos")), React.createElement("ul", null, this.props.data.tasks.map(function (t) { return React.createElement(components.Task, {"task": t, "key": t._id}); }))));
    };
    ListInner.propTypes = {
        tasks: React.PropTypes.array.isRequired
    };
    ListInner.mixins = [ReactMeteorData];
    ListInner = __decorate([
        Namespace("components"), 
        __metadata('design:paramtypes', [])
    ], ListInner);
    return ListInner;
})(React.Component);
Namespace("components", function () {
    this.List = utils.DataProvider(this.ListInner, function () {
        return {
            tasks: collections.Tasks.find().fetch()
        };
    });
});
