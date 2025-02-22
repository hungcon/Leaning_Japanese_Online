import React from 'react';
import {NavLink} from 'react-router-dom';

class ComponentName extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3" />
                <div className="col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters text-left">
                                <div className="col mr-2">
                                    <div className="h5 font-weight-bold text-dark text-uppercase mb-1 lesson--title">
                                        <NavLink to={'/test/' + this.props.lesson} className="lesson--details">
                                            Lesson : {this.props.title}
                                        </NavLink>
                                    </div>
                                    <div className="row no-gutters ">
                                        <div className="col">
                                            <div className="mb-0 text-gray-800 small">Process
                                                <span className="float-right small mr-2">{this.props.mark*10} %</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-left">
                                        <div className="col-8">
                                            <div className="mb-0 text-gray-800">The level of understanding</div>
                                        </div>
                                        <div className="col-4">
                                            <div className="progress progress-md mr-2">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: this.props.mark*10 + '%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>

        );
    }
}

ComponentName.propTypes = {};

export default ComponentName;