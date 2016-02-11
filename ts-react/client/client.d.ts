/// <reference path="../typings/browser.d.ts" />
declare var ReactDOM: any;
import React = __React;

declare var Namespace: any;
declare var ReactMeteorData:any;

declare namespace components {
    interface IEmptyProps {
    }
    interface IEmptyState {
    }

    interface ITask {
        _id: string | number;
        text: string;
    }

    interface ITaskProps {
        task: ITask;
        key?: any;
    }

    interface ITaskListProps {
        tasks: ITask[]
    }

    class Task extends React.Component<ITaskProps, IEmptyState> {}
    class List  extends React.Component<ITaskListProps, IEmptyState> {}
}

declare namespace collections {

    var Tasks: Mongo.Collection<components.ITask>;
}