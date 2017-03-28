import React, { Component } from 'react';
import './Modal.scss';

import Customers from '../../resources/customers';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: null,
            new: null,
            customerLoaded: false,
            customer: {
                email: '',
                description: '',
                account_balance: 0,
                metadata: {
                    firstName: '',
                    lastName: ''
                }
            }
        }

        this.save = this.save.bind(this);
    }

    componentWillMount() {
        if (!this.props.isNew) {
            Customers.get(this.props.item).then((res) => {
                let customer = this.state.customer;

                _.forOwn(res.data, (value, key) => {
                    if (customer.hasOwnProperty(key)) {
                        customer[key] = value;
                    }
                });

                this.setState({
                    item: res.data,
                    new: this.props.isNew,
                    customer: customer,
                    customerLoaded: true
                });
            });
        } else {
            this.setState({ new: this.props.isNew });
        }
    }

    save() {
        if (this.state.new) {
            Customers.create(this.state.customer).then((r) => {
                this.props.created();
            }).catch((err) => {
                console.log(err);
            });
        } else {
            Customers.update(this.props.item, this.state.customer).then((r) => {
                this.props.created();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    setvalue(type, isMetaData, e) {
        let state = this.state.customer;

        if (isMetaData) {
            state.metadata[type] = e.target.value;
        } else {
            state[type] = e.target.value;
        }

        this.setState({
            customer: state
        });
    }

    render() {
        let isVisible = 'modal';

        this.props.isVisible ? isVisible += ' is-active' : '';

        if (!this.state.new && this.state.customerLoaded) {
            const item = this.state.customer;

            return (
                <div className={isVisible}>
                    <div onClick={this.props.closeModal} className="modal-background" />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Customer: {item.email}</p>
                            <button onClick={this.props.closeModal} className="delete"></button>
                        </header>
                        
                        <section className="modal-card-body">

                            <div className="field">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <p className="control">
                                            <input
                                                className="input" 
                                                type="text"
                                                placeholder="Customer email"
                                                defaultValue={item.email}
                                                onChange={this.setvalue.bind(this, 'email', false)}
                                            />
                                        </p>
                                    </div>

                                    <div className="field is-4">
                                        <label className="label">Account balance</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="number"
                                                placeholder="Account balance"
                                                defaultValue={item.account_balance}
                                                onChange={this.setvalue.bind(this, 'account_balance', false)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">First name</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="First name"
                                                defaultValue={item.metadata.firstName}
                                                onChange={this.setvalue.bind(this, 'firstName', true)}
                                            />
                                        </p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Last name</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Last name"
                                                defaultValue={item.metadata.lastName}
                                                onChange={this.setvalue.bind(this, 'lastName', true)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Description</label>
                                <p className="control">
                                    <textarea
                                        className="textarea"
                                        rows="3"
                                        placeholder="Customer description"
                                        defaultValue={item.description}
                                        onChange={this.setvalue.bind(this, 'description', false)}
                                    />
                                </p>
                            </div>

                        </section>

                        <footer className="modal-card-foot">
                            <a onClick={this.save} className="button is-success">Save changes</a>
                            <a onClick={this.props.closeModal} className="button">Cancel</a>
                        </footer>
                    </div>
                </div>
            );
        }

        if (this.state.new) {
            return (
                <div className={isVisible}>
                    <div className="modal-background" />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">New customer</p>
                            <button onClick={this.props.closeModal} className="delete"></button>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <p className="control">
                                            <input
                                                className="input" 
                                                type="text"
                                                placeholder="Customer email"
                                                onChange={this.setvalue.bind(this, 'email', false)}
                                            />
                                        </p>
                                    </div>

                                    <div className="field is-4">
                                        <label className="label">Account balance</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="number"
                                                placeholder="Account balance"
                                                onChange={this.setvalue.bind(this, 'account_balance', false)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">First name</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="First name"
                                                onChange={this.setvalue.bind(this, 'firstName', true)}
                                            />
                                        </p>
                                    </div>

                                    <div className="field">
                                        <label className="label">Last name</label>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Last name"
                                                onChange={this.setvalue.bind(this, 'lastName', true)}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Description</label>
                                <p className="control">
                                    <textarea
                                        className="textarea"
                                        rows="3"
                                        placeholder="Customer description"
                                        onChange={this.setvalue.bind(this, 'description', false)}
                                    />
                                </p>
                            </div>

                        </section>
                        <footer className="modal-card-foot">
                            <a onClick={this.save} className="button is-success">Save changes</a>
                            <a onClick={this.props.closeModal} className="button">Cancel</a>
                        </footer>
                    </div>
                </div>
            );
        }

        return (
            <div className="loading">
                <i className="loader"></i>
            </div>
        );
    }
}

Modal.propTypes = {
    item: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    isNew: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    created: React.PropTypes.func
};

export default Modal;