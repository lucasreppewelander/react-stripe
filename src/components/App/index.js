import React, { Component } from 'react';
import _ from 'lodash';

import Login from '../Login';
import config from '../../config';

import Customers from '../../resources/customers';

import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem('user'),
            customers: [],
            customersLoaded: false,
            edit: null,
            editData: null
        }

        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        // this is just for a "dummy database user"
        if (!this.state.user || this.state.user !== 'lucas-superpassword') {
            this.props.router.push('/login');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // this will just send a user back to /login when simulating a logout action
        if (!nextState.user || nextState.user !== 'lucas-superpassword') {
            this.props.router.push('/login');
        }
    }

    getUserName() {
        console.log(this.state.user);
        return this.state.user.split('-')[0];
    }

    edit(id) {
        this.setState({ edit: id });
    }

    getCustomers() {
        const ret = [];

        _.each(this.state.customers, (item) => {
            console.log(item);
            ret.push(
                <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.description}</td>
                    <td>{item.account_balance}</td>
                    <td>{item.metadata.firstName}</td>
                    <td>{item.metadata.lastName}</td>
                    <td>
                        <button onClick={this.edit.bind(this, item.id)}>Edit</button>
                    </td>
                </tr>
            );
        });

        return ret;
    }

    setCustomers() {
        Customers.list().then((res) => {
            this.setState({
                customers: res.data.data,
                customersLoaded: true
            });
        });
    }

    setModalData() {
        Customers.get(this.state.edit).then((res) => {
            const item = res.data;
            this.setState({
                editData: item
            });
        });
    }

    closeModal() {
        this.setState({ editData: null, edit: null })
    }

    getModal() {
        const item = this.state.editData;

        console.log('ITEM', item);
        const ret = (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-content">
                    {item.email}
                </div>
                <button onClick={this.closeModal} className="modal-close"></button>
            </div>
        );

        return ret;
    }

    getLoadingCustomers() {
        return <tr><td colSpan={6}><i style={{display: 'block', textAlign: 'center'}} className="fa fa-circle-o-notch fa-spin" /></td></tr>
    }

    render() {
        let modal = null;

        if (!this.state.customersLoaded) {
            this.setCustomers();
        }

        console.log('this.state.edit', this.state.edit);
        if (this.state.edit && !this.state.editData) {
            this.setModalData();  
        }

        const username = this.getUserName();
        const customers = this.state.customersLoaded ? this.getCustomers() : this.getLoadingCustomers();

        return (
            <div className="columns">
                <div className="column">
                    {this.state.editData ? this.getModal() : ''}
                    <h2>Welcome {username}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Description</th>
                                <th>Balance</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    // prop: React.PropTypes.[type of property (object,bool,string,func)]
};

export default App;