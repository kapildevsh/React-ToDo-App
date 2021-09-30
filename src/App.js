import { PureComponent } from 'react';

//import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Alert from '@mui/material/Alert';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      taskName: '',
      time: '',
      list: [],
      successAlert: false,
    };
    
  }

  submit(event) {
    const [hour, minute, seconds] = this.state.time.trim().split(':');
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    date.setSeconds(+seconds);

    let time = this.state.time;
    if(date.getTime() < new Date().getTime()) {
      date.setDate(date.getDate() + 1);
      time = 'Tomorrow '+time;
    } else {
      time = 'Today ' + time;
    }

    const item = { taskName: this.state.taskName, time, completed: false  };
setTimeout(() => this.completeItem(item), date.getTime() - new Date().getTime());

    this.setState({
      list: [
        ...this.state.list,
        item,
      ],
      successAlert: true
    });

    setTimeout(() => this.setState({ successAlert: false }), 5000);
    

    //return (<h1>he</h1>);
    // alert('A New task is created: ' + this.state.taskName);
    // console.log(this.state.taskName, this.state.time);
    event.preventDefault();
  }

  completeItem(item) {
    item.completed = true;
    this.setState({completedItem: item});
    setTimeout(() => this.setState({completedItem: undefined}), 10000);
  }

  render() {
    const { list, taskName, time, successAlert, completedItem } = this.state;

    return (
      <div className="App">
      <h1>To DO App</h1>
      
        <Container fixed>
        {completedItem && (
          <Stack sx={{ width: '100%' }} spacing={10}>
            <Alert severity="success">
              The Task completed {completedItem.taskName}
            </Alert>
          </Stack>
        )}
          <form onSubmit={(event) => this.submit(event)}>
            <Box
              sx={{
                width: 600,
                height: 230,
                margin: 'auto',
                marginTop: 5,
                bgcolor: '#',
                paddingLeft:5,
                paddingRight:5,
                

                border: '2px solid gray',
              }}
            >
              <Stack spacing={3}>
                <TextField
                  type="text"
                  
                  label="Enter Task Name"
                  variant="standard"
                  name="taskName"
                  value={taskName}
                  onChange={(event) =>
                    this.setState({ taskName: event.target.value })
                  }
                />
                <span style={{textAlign: "left"}}>Enter Time</span>
                <input
                  type="time"
                  step="1"
                 
                 
                  label="Enter Time"
                  
                  name="time"
                  value={time}
                  onChange={(event) =>
                    this.setState({ time: event.target.value })
                  }
                />
                <Button variant="contained" type="submit">
                  Add in Task List
                </Button>
              </Stack>
            </Box>
          </form>
          <div style={{paddingTop:50,width: 800,margin: 'auto',}}>
          <TableContainer component={Paper}>
          <Table aria-label="simple table">
          <TableHead style={{fontWeight: "bold"}}>
          <TableRow >
            <TableCell style={{fontWeight: "bold"}}>Task Name</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Time</TableCell>
            <TableCell align="right" style={{fontWeight: "bold"}}>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
          {list.map((item) => (
            <TableRow key={item.taskName} style={{ margin: '0 auto' }} class={item.completed ? 'Completed' : 'Scheduled'}>
              <TableCell>{item.taskName}</TableCell>
              <TableCell align="center">{item.time}</TableCell>
              
              <TableCell align="right" >{item.completed ? 'Completed' : 'Scheduled'}</TableCell>
              
            </TableRow>
          ))}
          </TableBody></Table>
          </TableContainer>
          </div>
        </Container>

        {successAlert && (
          <Stack sx={{ width: '100%' }} spacing={10}>
            <Alert severity="success">
              A New Task {list[list.length - 1].taskName} is created at {list[list.length - 1].time}
            </Alert>
          </Stack>
        )}
        
      </div>
    );
  }
}
