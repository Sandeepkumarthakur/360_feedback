import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Report = () => {
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
  const [competValue, setCompetValue] = useState([]);
  const [valueValue, setValueValue] = useState([]);
  const [series1, setSeries1] = useState([{
    name: 'competency01',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'competency02',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'competency03',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'competency04',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'competency05',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  }
  ]);

  const [series2, setSeries2] = useState([{
    name: 'value01',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'value02',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'value03',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'value04',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  },
  {
    name: 'value05',
    data: [{ x: 'Q01', y: null },
    { x: 'Q02', y: null },
    { x: 'Q03', y: null },
    { x: 'Total', y: null }]
  }
  ]);

  const options = {
    chart: {
      height: '500',
      width: 500,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: true
    },
    colors: ["#008FFB"],
    title: {
      text: 'HeatMap Chart',
      style: {
        fontSize: '35px'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '20px'
        }
      },
      reversed: true,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '20px'
        }
      },
      position: 'top',
    },
    plotOptions: {

      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 2.99,
              name: 'low',
              color: '#ff0000'
            },
            {
              from: 3,
              to: 3.99,
              name: 'medium',
              color: '#FFA500'
            },
            {
              from: 4,
              to: 5,
              name: 'high',
              color: '#00A100'
            }
          ]
        }
      }
    },
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const s1 = [{ name: 'competency01', data: [] },
      { name: 'competency02', data: [] },
      { name: 'competency03', data: [] },
      { name: 'competency04', data: [] },
      { name: 'competency05', data: [] }
      ];
      const s2 = [{ name: 'value01', data: [] },
      { name: 'value02', data: [] },
      { name: 'value03', data: [] },
      { name: 'value04', data: [] },
      { name: 'value05', data: [] }
      ];

      const data = await axios.get(`http://localhost:8005?empcode=${empcode}&&people=${people}&&location=${location}&&department=${department}`);
      console.log("emp--->", data)

      let totalFeedbacks = data.data.length;
      const competency = Array(15).fill(0);
      const value = Array(15).fill(0);
      const cnt1 = Array(15).fill(0);
      const cnt2 = Array(15).fill(0);

      for (let i = 0; i < totalFeedbacks; i++) {
        for (let j = 0; j < 15; j++) {
          if (data?.data[i]?.competency[j]) {
            cnt1[j]++;
            competency[j] += Number(data?.data[i]?.competency[j]);
          }
          if (data?.data[i]?.value[j]) {
            cnt2[j]++;
            value[j] += Number(data?.data[i]?.value[j]);
          }
        }
      }
      for (let i = 0; i < 15; i++) {
        competency[i] /= cnt1[i];
        value[i] /= cnt2[i];
      }
      const competency1 = Array(20).fill(0);
      const value1 = Array(20).fill(0);
      let k = 0;
      for (let i = 0; i < 20; i++) {
        if (i % 4 === 3) {
          competency1[i] = ((competency1[i - 1] + competency1[i - 2] + competency1[i - 3]) / 3)
          value1[i] = ((value1[i - 1] + value1[i - 2] + value1[i - 3]) / 3)
          continue;
        }
        competency1[i] = competency[k];
        value1[i] = value[k];
        k++;
      }

      let ques = ['Q01', 'Q02', 'Q03', 'Total']
      let x = 0;
      for (let i = 0; i < 20; i += 4) {
        const d = [], d2 = [];
        for (let j = i; j < i + 4; j++) {
          d.push({
            x: ques[j % 4],
            y: parseFloat(competency1[j]).toFixed(2),
          })
          d2.push({
            x: ques[j % 4],
            y: parseFloat(value1[j]).toFixed(2),
          })
        }
        s1[x].data = d;
        s2[x].data = d2;
        x++;
      }

      const competency2 = competency;
      function sortWithIndexAndPrint(competency2) {
        return competency2
          .map((element, index) => ({ element, index }))
          .sort((a, b) => a.element - b.element)
          .map(({ element, index }) => `Original index: ${index} Element: ${element}`)
          .join("\n");
      }

      const sortedCompet = sortWithIndexAndPrint(competency2);
      // console.log(sortedCompet);
      const lines = sortedCompet.split("\n");
      const big_small_value = [];
      const index = [lines[0], lines[1], lines[2], lines[14], lines[13], lines[12]];
      // console.log(index)
      let y = 0;
      let z = 0;
      for (let i = 0; i < index.length; i++) {
        if (i < 3) {
          const [indexString, elementString] = index[i].split(" Element: ");
          big_small_value[y + 6] = Number(indexString.split(" ").pop(), 10);
          big_small_value[y + 7] = Number(parseFloat(elementString, 10).toFixed(2));
          y += 2;
        }
        else {
          const [indexString, elementString] = index[i].split(" Element: ");
          big_small_value[z] = Number(indexString.split(" ").pop(), 10);
          big_small_value[z+1] = Number(parseFloat(elementString, 10).toFixed(2));
          z+=2;
        }
      }

      const value2 = value;
      function sortWithIndexAndPrint1(value2) {
        return value2
          .map((element, index) => ({ element, index }))
          .sort((a, b) => a.element - b.element)
          .map(({ element, index }) => `Original index: ${index} Element: ${element}`)
          .join("\n");
      }

      const sortedValue = sortWithIndexAndPrint1(value2);

      const lines1 = sortedValue.split("\n");
      const big_small_compet = [];

      const index1 = [lines1[0], lines1[1], lines1[2], lines1[14], lines1[13], lines1[12]];
      // console.log(index)
      let y1 = 0;
      let z1 = 0;
      for (let i = 0; i < index.length; i++) {
        if (i < 3) {
          const [indexString, elementString] = index1[i].split(" Element: ");
          big_small_compet[y1 + 6] = Number(indexString.split(" ").pop(), 10);
          big_small_compet[y1 + 7] = Number(parseFloat(elementString, 10).toFixed(2));
          y1 += 2;
        }
        else {
          const [indexString, elementString] = index1[i].split(" Element: ");
          big_small_compet[z1] = Number(indexString.split(" ").pop(), 10);
          big_small_compet[z1+1] = Number(parseFloat(elementString, 10).toFixed(2));
          z1+=2;
        }
      }

      setCompetValue([...big_small_value]);
      setValueValue([...big_small_compet]);
      setSeries1([...s1]);
      setSeries2([...s2]);
      // setNewName([...empname]);
      setRespondantRole(totalFeedbacks);
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // console.log(location,department)
      const emps = await axios.get('http://localhost:8005/employees?location=' + location + '&&department=' + department);
      console.log("employees--->, ", emps)
      setEmployees([...emps.data])
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
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRespondantRole([]);
    fetchData();
  }, [empcode, people, location, department]);

  useEffect(() => {
    fetchEmployees();
  }, [location, department])

  useEffect(() => {
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
    <Container>
      {/* <MultiDropdown/> */}
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ fontSize: '10px' }}>

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
              {/* <MenuItem value={"all"}>All</MenuItem> */}
              {
                peoples?.map(_ => <MenuItem value={_}>{_}</MenuItem>)
              }
            </Select>
          </FormControl>

          <Box style={{ display: 'flex', margin: '-10px 200px', fontSize: '23px' }}>
            {/* <h2 style={{ padding: '0 50px' }}>Employee Name: <span style={{ color: 'green' }}>{newName}</span>
            </h2> */}
            <h2>Number of Respondant Role: <span style={{ color: 'green' }}>{respondantRole}</span></h2>
          </Box>
        </Grid>

        <Grid item xs={5} style={{ display: 'flex' }} >
          {type === 1 && <>
            <div id="chart" style={{ display: 'flex' }}>
              <ReactApexChart options={options} series={series1} type="heatmap" height={450} width={600} style={{ margin: '-20px 10px' }} />
              <Box style={{ marginTop: '20px', marginLeft: '20px', width: '400px' }}>
                <h1>Top 3 Biggest Value: </h1>
                <ol style={{ fontSize: '25px', color: 'green' }}>
                  <li>competency0{parseInt(competValue[0] / 3) + 1}q{competValue[0] % 3 + 1}: {competValue[1]}</li>
                  <li>competency0{parseInt(competValue[2] / 3) + 1}q{competValue[2] % 3 + 1}: {competValue[3]}</li>
                  <li>competency0{parseInt(competValue[4] / 3) + 1}q{competValue[4] % 3 + 1}: {competValue[5]}</li>
                </ol>
                <h1>Top 3 smallest Value: </h1>
                <ol style={{ fontSize: '25px', color: 'green' }}>
                  <li>competency0{parseInt(competValue[6] / 3) + 1}q{competValue[6] % 3 + 1}: {competValue[7]}</li>
                  <li>competency0{parseInt(competValue[8] / 3) + 1}q{competValue[8] % 3 + 1}: {competValue[9]}</li>
                  <li>competency0{parseInt(competValue[10] / 3) + 1}q{competValue[10] % 3 + 1}: {competValue[11]}</li>
                </ol>
              </Box>
            </div>
          </>}
          {type === 2 && <>
            <div id="chart" style={{ display: 'flex' }}>
              <ReactApexChart options={options} series={series2} type="heatmap" height={450} width={600} style={{ margin: '-20px 10px' }} />
              <Box style={{ marginTop: '20px', marginLeft: '20px', width: '400px' }}>
                <h1>Top 3 Biggest Value: </h1>
                <ol style={{ fontSize: '25px', color: 'green' }}>
                  <li>value0{parseInt(valueValue[0] / 3) + 1}q{valueValue[0] % 3 + 1}: {valueValue[1]}</li>
                  <li>value0{parseInt(valueValue[2] / 3) + 1}q{valueValue[2] % 3 + 1}: {valueValue[3]}</li>
                  <li>value0{parseInt(valueValue[4] / 3) + 1}q{valueValue[4] % 3 + 1}: {valueValue[5]}</li>
                </ol>
                <h1>Top 3 smallest Value: </h1>
                <ol style={{ fontSize: '25px', color: 'green' }}>
                  <li>value0{parseInt(valueValue[6] / 3) + 1}q{valueValue[6] % 3 + 1}: {valueValue[7]}</li>
                  <li>value0{parseInt(valueValue[8] / 3) + 1}q{valueValue[8] % 3 + 1}: {valueValue[9]}</li>
                  <li>value0{parseInt(valueValue[10] / 3) + 1}q{valueValue[10] % 3 + 1}: {valueValue[11]}</li>
                </ol>
              </Box>
            </div>
          </>}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Report