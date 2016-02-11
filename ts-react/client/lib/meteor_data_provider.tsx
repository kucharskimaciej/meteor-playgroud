Namespace("utils", function() {
   this.DataProvider = function(wrapped: string, getData: () => any): React.ClassicComponentClass<any> {
       const provider = React.createClass({
           mixins: [ReactMeteorData],
           getMeteorData() {
               return getData();
           },
           render() {
               return React.createElement(wrapped, Object.assign({
                   data: this.data
               }, this.props));
           }
       });

       return provider;
   }
});
