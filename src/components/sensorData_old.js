import React, {
  Component
} from 'react';
import {AreaChart} from 'react-easy-chart';
import {Button} from 'reactstrap';
import axios from 'axios';

class SensorData extends Component {

  sensorDataURL = "https://getroomdeatils.azurewebsites.net/api/getSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";
  latestSensorDataURL = "https://getroomdeatils.azurewebsites.net/api/getLatestSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg=="
  currentDate = new Date().toISOString();
  tempData = [];
  xAxisVal = 0;
  constructor(props) {
    super(props);
    //console.log("props in sensordata comp: ",props);
    console.log(this.currentDate);
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      data:[]
    };
    this.fetchInitalData();
  }

fetchData = () =>  {
  /*var newData = this.state.data.push(
    [{ x: '1', y: 25 },
  { x: '11', y: 25 },
  { x: '17', y: 25 }]
  );

  this.setState({data : this.state.data});
  console.log("this.state.data after ",this.state.data);
  var newData = this.state.data[0].push(
    { x: '13', y: 25 }
  );

  this.setState({data : this.state.data});*/
  axios.get(this.latestSensorDataURL)
  .then(response => {
    console.log("response from db latest Data",response);

    //var newData = this.state.data[0].push({x:response.data.sensorData[0].time,y:response.data.sensorData[0].avgtemperature});
    var newData = this.state.data[0].push({x:this.xAxisVal++,y:response.data.sensorData[0].avgtemperature});

    this.setState({data : this.state.data});
    // this.setState(
    //   {data: response.data.sensorData}
    // )
  })
}

  fetchInitalData = () =>  {
    /*var newData = this.state.data.push(
      [{ x: '1-Jan-15', y: 70 },
        { x: '1-Apr-15', y: 15 },
        { x: '1-May-15', y: 10 }]
    );

    console.log("new data", this.state.data);
    this.setState({data:  [[{ x: '1-Jan-15', y: 70 },
      { x: '1-Apr-15', y: 15 },
      { x: '1-May-15', y: 10 }]]})*/

      //this.setState({data : this.state.data});
    console.log("data", this.state.data);
    this.sensorDataURL += '&toDate='+this.currentDate;
    axios.get(this.sensorDataURL)
    .then(response => {
      console.log("response from db",response);
      this.mapData(response.data.sensorData);
      // this.setState(
      //   {data: response.data.sensorData}
      // )
  })
  }

  mapData = (data) => {
    for(var i = 0; i < data.length; i++) {
      this.tempData.push({x:this.xAxisVal++, y:data[i].avgtemperature});
    }
    console.log("tempData: ", this.tempData);
    this.setState(
       {data: [this.tempData]})
  }


  render() {
    return (
      <div>
        SensorData charts go in here
        <br />

        <div>
    <div style={{display: 'inline-block'}}>
    <AreaChart
xType={'text'}
      axes
      dataPoints
      xTicks={5}
      yTicks={3}
      grid
      areaColors={['orange', 'purple', 'green','red','blue']}
      noAreaGradient
      clickHandler={(d) => this.setState({
        dataDisplay: `The value of x is ${d.x} and y is ${d.y}`
      })}
      tickTimeDisplayFormat={'%d %m'}
      interpolate={'cardinal'}
      width={750}
      height={250}
      data={this.state.data}
    />
    </div>
    <div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '20px'}}>
      {this.state.dataDisplay ? this.state.dataDisplay : 'Click on a point to show the value'}
    </div>
  </div>

<br/>
  <Button onClick={this.fetchData}> Fetch Data  </Button>
      </div>
    );
  }
}

export default SensorData;
