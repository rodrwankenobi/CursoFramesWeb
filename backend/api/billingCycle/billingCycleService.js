const BillingCycle = require('./billingCycle')
const _ = require('lodash')

BillingCycle.methods(['get','post','put','delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.after('post',sendErrorsOrNext).after('put',sendErrorsOrNext)

function sendErrorsOrNext(req, res, next){
    const bundle = res.locals.bundle

    if(bundle.errors){
        var errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    }
    else{
        next()
    }

    function parseErrors(nodeRestfulErrors){
        console.log('entrou no if errors')
        errors = []
        _.forIn(nodeRestfulErrors, error => errors.push(error.message))
        return errors
    }
}

BillingCycle.route('count', function(req,res){
    BillingCycle.count(function(error,value){
        res.status(500).json({"errors": [ error ]})
    })
})
module.exports = BillingCycle