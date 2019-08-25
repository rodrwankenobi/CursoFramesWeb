const lodash = require("lodash")

const BillingCycle = require("../billingCycle/billingCycle")

function GetSummary(req, res){
    BillingCycle.aggregate([
        {
            $project: { 
                credit: {$sum: "$credits.value"},
                debit: {$sum: "$debits.value"}
            }
        },
        {
            $group: {
                _id: null,
                credit: {$sum: "$credit"},
                debit: {$sum: "$debit"}               
            }
        },
        {   
            $project: {
                _id: 0,
                credit: 1,
                debit: 1      
            }
        }
    ]).then(
        function(error, result){
            if(error){
                res.status(500).json({ errors: [error]})
            }
            else{
                res.json(_.defaults(result[0],{credit:0 ,debit:0}))
            }
        }
    )
}

module.exports = { GetSummary }