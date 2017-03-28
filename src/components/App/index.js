import React, { Component } from 'react';
import _ from 'lodash';

import Login from '../Login';
import config from '../../config';

import Customers from '../../resources/customers';
import Modal from '../Modal';

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
        this.createNew = this.createNew.bind(this);
        this.onCreated = this.onCreated.bind(this);
    }

    componentWillMount() {
        // this is just for a "dummy database user"
        if (!this.state.user || this.state.user !== 'lucas-superpassword') {
            this.props.router.push('/login');
        }

        this.setCustomers();
    }

    getUserName() {
        return this.state.user.split('-')[0];
    }

    edit(id) {
        this.setState({ edit: id });
    }

    delete(id) {
        if (confirm('Really want to delete the item?')) {
            Customers.delete(id).then((r) => {
                this.setCustomers();
            }).catch((err) => {
                console.log(err);
            });
        } else {
            this.setCustomers();
        }
    }

    getCustomers() {
        const ret = [];

        _.each(this.state.customers, (item) => {
            ret.push(
                <tr key={item.id}>
                    <td>{item.metadata.firstName ? item.metadata.firstName : <i className="ns">Not set</i>}</td>
                    <td>{item.metadata.lastName ? item.metadata.lastName : <i className="ns">Not set</i>}</td>
                    <td>{item.email ? item.email : <i className="ns">Not set</i>}</td>
                    <td>{item.description ? item.description : <i className="ns">Not set</i>}</td>
                    <td>{item.account_balance && item.account_balance > 0 ? item.account_balance : <i className="ns">0</i>}</td>
                    <td>
                        <button className="danger" onClick={this.delete.bind(this, item.id)}>Remove</button>
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

    closeModal() {
        this.setState({ editData: null, edit: null, new: false })
    }

    getLoadingCustomers() {
        return (
            <tr>
                <td colSpan={6}>
                    <i
                        style={{display: 'block', textAlign: 'center'}}
                        className="fa fa-circle-o-notch fa-spin"
                    />
                </td>
            </tr>
        )
    }

    createNew() {
        this.setState({ new: true });
    }

    onCreated() {
        Customers.list().then((res) => {
            this.setState({
                editData: null,
                edit: null,
                new: false,
                customers: res.data.data,
                customersLoaded: true
            });
        });
    }

    render() {
        const username = this.getUserName();
        const customers = this.state.customersLoaded ? this.getCustomers() : this.getLoadingCustomers();

        return (
            <div className="wrapper">
                <div className="columns customer-columns">
                    <div className="column">
                        <h1>React Stripe Application</h1>
                        <span className="current">current user: {username}</span>
                    </div>
                    <div className="column">
                        <button onClick={this.createNew} className="btn green">
                            Add customer
                            <i className="fa fa-user-plus" />
                        </button>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <span className="title">Customer list</span>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                    <th>Balance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.edit ? <Modal closeModal={this.closeModal} created={this.onCreated} isVisible={!!this.state.edit} item={this.state.edit} isNew={false} /> : ''}
                {this.state.new ? <Modal closeModal={this.closeModal} created={this.onCreated} isVisible={this.state.new} item={null} isNew={true} /> : ''}
            </div>
        );
    }
}

App.propTypes = {
    // prop: React.PropTypes.[type of property (object,bool,string,func)]
};

export default App;