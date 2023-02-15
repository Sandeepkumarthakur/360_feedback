const router = require('express').Router();
const Data = require("../models/data")



router.get('/', async (req, res) => {
    try {
        const empcode = req?.query?.empcode;
        const people = req?.query?.people;
        const location = req.query.location;
        const department = req.query.department;
        const query = {};
        if (empcode !== "") query.empcode = empcode;
        if (people !== "") query.people = people;
        if (location !== "") query.location = location;
        if (department !== "") query.department = department;

        const data = await Data.find(query);
        res.send(data);
    } catch (err) {
        res.send({
            message: "SOMETHING WENT WRONG",
            status: 0
        });
    }
})



router.get('/employees', async (req, res) => {
    let location = req.query.location || "";
    let department = req.query.department || "";
    console.log(location, department)
    try {
        if (location == "" && department != "") {
            const data = await Data.find({ "department": department }).distinct("empcode");
            res.send(data);
        }
        else if (department == "" && location != "") {
            const data = await Data.find({ "location": location }).distinct("empcode");
            res.send(data);
        }
        else if (location != "" && department != "") {
            const data = await Data.find({ "location": location, "department": department }).distinct("empcode");
            res.send(data);
        }
        else if (location == "" && department == "") {
            const data = await Data.find().distinct("empcode");
            res.send(data);
        }
    }
    catch (err) {
        console.log("Data get ----->", err);
        res.send({
            message: "SOMETHING WENT WRONG",
            status: 0
        })
    }
})
router.get('/peoples', async (req, res) => {
    let empcode = req.query.empcode || "";
    let location = req.query.location || "";
    let department = req.query.department || "";
    console.log(location, department)
    try {
        if (location == "" && department != "" && empcode == "") {
            const data = await Data.find({ "department": department }).distinct("people");
            res.send(data);
        }
        else if (department == "" && location != "" && empcode == "") {
            const data = await Data.find({ "location": location }).distinct("people");
            res.send(data);
        }
        else if (department == "" && location == "" && empcode != "") {
            const data = await Data.find({ "empcode": empcode }).distinct("people");
            res.send(data);
        }
        else if (location != "" && department != "" && empcode == "") {
            const data = await Data.find({ "location": location, "department": department }).distinct("people");
            res.send(data);
        }
        else if (location != "" && department == "" && empcode != "") {
            const data = await Data.find({ "location": location, "empcode": empcode }).distinct("people");
            res.send(data);
        }
        else if (location == "" && department != "" && empcode != "") {
            const data = await Data.find({ "empcode": empcode, "department": department }).distinct("people");
            res.send(data);
        }
        else if (location != "" && department != "" && empcode != "") {
            const data = await Data.find({ "location": location, "department": department, "empcode": empcode }).distinct("people");
            res.send(data);
        }
        else if (location == "" && department == "" && empcode == "") {
            const data = await Data.find().distinct("people");
            res.send(data);
        }
    }
    catch (err) {
        console.log("Data get ----->", err);
        res.send({
            message: "SOMETHING WENT WRONG",
            status: 0
        })
    }
})

router.get('/locations', async (req, res) => {
    try {
        const data = await Data.find().distinct("location");

        res.send(data);
    }
    catch (err) {
        console.log("Data get ----->", err);
        res.send({
            message: "SOMETHING WENT WRONG",
            status: 0
        })
    }
})
router.get('/departments', async (req, res) => {

    try {
        const data = await Data.find().distinct("department");

        res.send(data);
    }
    catch (err) {
        console.log("Data get ----->", err);
        res.send({
            message: "SOMETHING WENT WRONG",
            status: 0
        })
    }
})

module.exports = router;