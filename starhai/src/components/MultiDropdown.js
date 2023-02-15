import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
// import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MultiDropdown = () => {
    const [type, setType] = useState("");
    const [people, setPeople] = useState("");
    const [empcode, setEmpCode] = useState("");
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [employees, setEmployees] = useState([]);
    const [peoples, setPeoples] = useState([]);
    const [locations, setLocations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [respondantRole, setRespondantRole] = useState([])


    const fetchEmployees = async () => {
        try {
            setLoading(true);
            // console.log(location,department)
            const emps = await axios.get('http://localhost:8005/employees?location=' + location + '&&department=' + department);
            console.log("employees--->, ", emps)
            setEmployees([...emps.data])
            const temp = [];
            emps?.data?.map(_ => {
                temp.push(_);
            })
            // setEmpempcode([...temp])
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    const fetchPeoples = async () => {
        // alert("called")
        try {
            setLoading(true);
            // console.log("people called data---->",department, empcode,location);
            const emps = await axios.get('http://localhost:8005/peoples?empcode=' + empcode + '&&department=' + department + '&&location=' + location);
            console.log("peoples--->", emps)
            setPeoples([...emps.data])
            const temp = [];
            emps?.data?.map(_ => {
                temp.push(_);
            })
            // setEmppeople([...temp])
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    const fetchLocation = async () => {
        try {
            setLoading(true);
            const emps = await axios.get('http://localhost:8005/locations');
            // console.log(emps)
            setLocations([...emps.data])
            // const temp = [];
            // emps?.data?.map(_ => {
            //     temp.push(_);
            // })
            // const temp1 = [];
            // emps?.data?.map(_ => {
            //     temp1.push({ name: _, isChecked: false });
            // })
            // console.log("temp1--->", temp1)
            // setCheckedState(temp1)
            // setEmplocation([...temp]);
            // setUsers([...temp]);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }
    const fetchDepartment = async () => {
        try {
            setLoading(true);
            const emps = await axios.get('http://localhost:8005/departments');
            // console.log(emps)
            setDepartments([...emps.data])
            // const temp = [];
            // emps?.data?.map(_ => {
            //     temp.push(_);
            // })
            // setEmpdepartment([...temp])
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchEmployees();
    }, [location, department])

    useEffect(() => {
        // alert("effect called")
        fetchPeoples();
    }, [empcode, department, location])

    useEffect(() => {
        fetchLocation();

    }, [])
    useEffect(() => {
        fetchDepartment();
    }, [])

    if (loading)
    return <CircularProgress />
    return (
        <>
            <Grid item xs={12} style={{ fontSize: '10px' }}>
                <Grid style={{ display: 'flex' }}>
                    <FormControl style={{ width: '16%' }}>
                        <InputLabel id="location" style={{ fontSize: '20px' }}>Location</InputLabel>

                        <Select
                            labelId="location"
                            id="location"
                            value={location}

                            onChange={(e) => setLocation(e.target.value)}
                            label="Location"
                        >
                            {/* <MenuItem value={""}>None</MenuItem> */}
                            {
                                locations?.map(_ => <MenuItem value={_}>{_}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: '50px', width: '16%' }}>
                        <InputLabel id="department" style={{ fontSize: '20px' }}>Department</InputLabel>

                        <Select
                            labelId="department"
                            id="department"
                            value={department}

                            onChange={(e) => setDepartment(e.target.value)}
                            label="Department"
                        >
                            {/* <MenuItem value={""}>None</MenuItem> */}
                            {
                                departments?.map(_ => <MenuItem value={_}>{_}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: '50px', width: '16%' }}>
                        <InputLabel id="subtype" style={{ fontSize: '20px' }}>EmpCode</InputLabel>
                        <Select
                            labelId="empcode"
                            id="empcode"
                            value={empcode}

                            onChange={(e) => setEmpCode(e.target.value)}
                            label="EmpCode"
                        >
                            {/* <MenuItem value={""}>None</MenuItem> */}
                            {
                                employees?.map(_ => <MenuItem value={_}>{_}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: '50px', width: '16%' }}>
                        <InputLabel id="type" style={{ fontSize: '20px' }}>Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={type}

                            onChange={(e) => setType(e.target.value)}
                            label="Type"
                        >
                            {/* <MenuItem value={0}>None</MenuItem> */}
                            <MenuItem value={1}>Competency</MenuItem>
                            <MenuItem value={2}>Values</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: '50px', width: '16%' }}>
                        <InputLabel id="people" style={{ fontSize: '20px' }}>People</InputLabel>

                        <Select
                            labelId="people"
                            id="people"
                            value={people}

                            onChange={(e) => setPeople(e.target.value)}
                            label="People"
                        >
                            {/* <MenuItem value={""}>None</MenuItem> */}
                            {
                                peoples?.map(_ => <MenuItem value={_}>{_}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Box style={{ display: 'flex', margin: '-10px 200px', fontSize: '23px' }}>
                    {/* <h2 style={{ padding: '0 50px' }}>Employee Name: <span style={{ color: 'green' }}>{newName}</span>
                        </h2> */}
                    <h2>Number of Respondant Role: <span style={{ color: 'green' }}>{respondantRole}</span></h2>
                </Box>
            </Grid>
        </>
    )
}

export default MultiDropdown