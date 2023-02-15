
const Data = require('../models/data')
const csv = require('csv-parser')
const fs = require('fs')
module.exports.feedData = () => {
    var feederData = [];
    fs.createReadStream('./datas/datas.csv')
    .pipe(csv())
    .on('data', async (data) => {
        let d = new Data({
            empcode: data["Employee Code"],
            empname: data["Employee Name"],
            people:data["Respondant Role "],
            location:data["Location"],
            department:data["Department"],
            value: [
                data["VALUE01Q1"],
                data["VALUE01Q2"],
                data["VALUE01Q3"],
                data["VALUE02Q1"],
                data["VALUE02Q2"],
                data["VALUE02Q3"],
                data["VALUE03Q1"],
                data["VALUE03Q2"],
                data["VALUE03Q3"],
                data["VALUE04Q1"],
                data["VALUE04Q2"],
                data["VALUE04Q3"],
                data["VALUE05Q1"],
                data["VALUE05Q2"],
                data["VALUE05Q3"],
            ],
            competency : [
                data["COMPETENCY01Q1"],
                data["COMPETENCY01Q2"],
                data["COMPETENCY01Q3"],
                data["COMPETENCY02Q1"],
                data["COMPETENCY02Q2"],
                data["COMPETENCY02Q3"],
                data["COMPETENCY03Q1"],
                data["COMPETENCY03Q2"],
                data["COMPETENCY03Q3"],
                data["COMPETENCY04Q1"],
                data["COMPETENCY04Q2"],
                data["COMPETENCY04Q3"],
                data["COMPETENCY05Q1"],
                data["COMPETENCY05Q2"],
                data["COMPETENCY05Q3"],
            ]
        })  
        d.save();         
    })
    .on('end', () => {
       console.log("data feeded")
    });
}



// value: [
//     data["VALUE01Q1"],
//     data["VALUE01Q2"],
//     data["VALUE01Q3"],
//     data["VALUE02Q1"],
//     data["VALUE02Q2"],
//     data["VALUE02Q3"],
//     data["VALUE03Q1"],
//     data["VALUE03Q2"],
//     data["VALUE03Q3"],
//     data["VALUE04Q1"],
//     data["VALUE04Q2"],
//     data["VALUE04Q3"],
//     data["VALUE05Q1"],
//     data["VALUE05Q2"],
//     data["VALUE05Q3"],
// ],
// competency : [
//     data["COMPETENCY01Q1"],
//     data["COMPETENCY01Q2"],
//     data["COMPETENCY01Q3"],
//     data["COMPETENCY02Q1"],
//     data["COMPETENCY02Q2"],
//     data["COMPETENCY02Q3"],
//     data["COMPETENCY03Q1"],
//     data["COMPETENCY03Q2"],
//     data["COMPETENCY03Q3"],
//     data["COMPETENCY04Q1"],
//     data["COMPETENCY04Q2"],
//     data["COMPETENCY04Q3"],
//     data["COMPETENCY05Q1"],
//     data["COMPETENCY05Q2"],
//     data["COMPETENCY05Q3"],
// ]





