import IEmptyState = components.IEmptyState;
import ITaskListProps = components.ITaskListProps;


@Namespace("components")
class ListInner extends React.Component<ITaskListProps, IEmptyState> {
    static propTypes = {
        tasks: React.PropTypes.array.isRequired
    };

    static mixins = [ReactMeteorData];

    render() {
        console.log(this.props.data);
        return (
            <section className="container">
                <header>
                    <h1>Todos</h1>
                </header>
                <ul>
                    {this.props.data.tasks.map((t) => <components.Task task={t} key={t._id}/> )}
                </ul>
            </section>
        );
    }
}

Namespace("components", function() {
    this.List = utils.DataProvider(this.ListInner, function() {
       return {
            tasks: collections.Tasks.find().fetch()
       };
    });
});