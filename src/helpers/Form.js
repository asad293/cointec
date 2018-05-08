class Form {

    constructor(data = {}, validators = {}) {
        this.data = {}
        this.errors = {}
        this.validators = {}

        for (let name in data) {
            this.data[name] = data[name]

            if (validators[name]) {
                if (validators[name] instanceof Function) {
                    this.validators[name] = validators[name]
                    this.errors[name] = false

                } else if (validators[name] instanceof Object) {
                    this.validators[name] = {}
                    this.errors[name] = {}

                    for (let validator in validators[name]) {
                        (this.validators[name])[validator] = (validators[name])[validator];
                        (this.errors[name])[validator] = false;
                    }
                }
            } else {
                this.validators[name] = () => false
                this.errors[name] = false
            }
        }

        this.valid = false
    }

    setData(name, value) {
        this.data[name] = value

        if (this.errors[name]) {
            if (this.validators[name] instanceof Function) {
                this.errors[name] = this.validators[name](value)
            } else {
                let validatorValid = true
                for (let validator in this.validators[name]) {
                    validatorValid = validatorValid && !(this.errors[name])[validator]
                }

                if (!validatorValid) {
                    for (let validator in this.validators[name]) {
                        (this.errors[name])[validator] = (this.validators[name])[validator](value)
                    }
                }
            }
        }

        let valid = true
        for (let name in this.validators) {
            if (this.validators[name] instanceof Function) {
                valid = valid && !this.validators[name](this.data[name])
            } else {
                let validatorValid = true
                for (let validator in this.validators[name]) {
                    validatorValid = validatorValid && !(this.validators[name])[validator](this.data[name])
                }
                valid = valid && validatorValid
            }
        }

        this.valid = valid
        
    }

    validate(name) {
        if (name) {
            if (this.validators[name] instanceof Function) {
                this.errors[name] = this.validators[name](this.data[name])
            } else {
                for (let validator in this.validators[name]) {
                    (this.errors[name])[validator] = (this.validators[name])[validator](this.data[name])
                }
            }
        }
    }

    validateAll() {
        for (let name in this.data) {
            this.validate(name)
        }
    }

    check(name, errorName = null) {
        if (this.validators[name] instanceof Function) {
            return this.validators[name](this.data[name])
        } else {
            if (errorName) {
                return (this.validators[name])[errorName](this.data[name])
            } else {
                let validatorValid = true
                for (let error in this.validators[name]) {
                    validatorValid = validatorValid && !(this.validators[name])[error](this.data[name])
                }
                return validatorValid
            }
        }
    }

    isValid(name, errorName = null) {
        if (this.validators[name] instanceof Function) {
            return !this.errors[name]
        } else {
            if (errorName) {
                return (this.errors[name])[errorName]
            } else {
                let validatorValid = true
                for (let error in this.errors[name]) {
                    validatorValid = validatorValid && !(this.errors[name])[error]
                }
                return validatorValid
            }
        }
    }

    reset() {
        for (let name in this.data) {
            this.data[name] = ''

            if (this.validators[name]) {
                if (this.validators[name] instanceof Function) {
                    this.errors[name] = false

                } else if (this.validators[name] instanceof Object) {
                    this.errors[name] = {}

                    for (let validator in this.validators[name]) {
                        (this.errors[name])[validator] = false;
                    }
                }
            } else {
                this.errors[name] = false
            }
        }
    }

}

export default Form