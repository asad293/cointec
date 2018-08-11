import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { addAccount } from '../../../Redux/actions'
import cn from 'classnames'

const errorMap = {
  default: 'Bank must Faster Payments enabled',
  400: 'Please check your account details.',
  406: 'Account is not Faster-Payments enabled.',
  409: 'You have already added this account.'
}

class AddBankAccount extends Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      error: {
        text: null,
        status: null
      }
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.bank) {
      this.setState({ loading: props.bank.loading })

      if (props.bank.error) {
        const { status } = props.bank.error.response
        this.setState({ error: { text: errorMap[status], status } })
      }
      else
        this.setState({ error: { text: errorMap.default, status: null } })

      if (props.bank.addFN && props.bank.addFN.Success) {
        this.props.close(true)
      }
    }
  }

  renderButton() {
    return (
      <button
        type="submit"
        className="btn btn-block btn-success btn-lg text-white">
          Add Bank Account
      </button>
    )
  }

  renderField(field) {
    const { placeholder, valid, meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-warning' : ''} ${valid === true ? 'has-success' : ''}  ${valid === false ? 'has-warning' : ''}`
    
    return (
      <div className={className}>
        <input
          placeholder={placeholder}
          className="form-control"
          {...field.input} />

        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  normalizeSortCode(value) {
    if (!value) {
      return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 2) {
      return onlyNums
    }
    if (onlyNums.length <= 4) {
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`
    }
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 4)}-${onlyNums.slice(4, 6)}`
  }

  normalizeAccountNumber(value) {
    if (!value) {
      return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')

    return onlyNums.slice(0, 8)
  }

  onSubmit(values) {
    this.props.addAccount(5, values)
  }

  handleClick() {
    this.props.close()
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="modal fade" id="add-bank-account-modal" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-subscribe" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>

              <h5 className="modal-heading mt-0 mb-4">Add a new bank account</h5>

              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <label className="subscribe-email-label mt-0">Account Name</label>
                    <Field
                      name="accountName"
                      component={this.renderField}
                      placeholder={'Account 1'} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="subscribe-email-label mt-0">Sort Code</label>
                    <Field
                      name="sortCode"
                      normalize={this.normalizeSortCode}
                      component={this.renderField}
                      placeholder='XX-XX-XX' />
                  </div>
                  <div className="col-6">
                    <label className="subscribe-email-label mt-0">Account No.</label>
                    <Field
                      name="accountNo"
                      normalize={this.normalizeAccountNumber}
                      component={this.renderField}
                      placeholder='XXXXXXXX' />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="inline-headers info">{this.state.error.text}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {this.renderButton()}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function validate(values, props) {
  const errors = {}
  // validate inputs from 'values'
  if (!values.accountName) {
    errors.accountName = "Enter Account Name"
  }

  if (!values.sortCode) {
    errors.sortCode = "Enter Sort Code"
  }

  if (!values.accountNo) {
    errors.accountNo = "Enter Account No"
  }

  return errors
}


const mapStateToProps = (state) => {
  return { bank: state.bank }
}

export default reduxForm({
  form: 'AddBankForm',
  validate
})(connect(mapStateToProps, { addAccount })(AddBankAccount))
