import ITaskProps = components.ITaskProps;

@Namespace("components")
class Task extends React.Component<ITaskProps, IEmptyState> {
    static propTypes = {
        task: React.PropTypes.object.isRequired
    };

    render() {
        const {text} = this.props.task;

        return <li>{text}</li>;
    }
}