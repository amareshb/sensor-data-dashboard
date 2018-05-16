import React, {
  Component
} from 'react';
import {AreaChart} from 'react-easy-chart';
import {Button} from 'reactstrap';
import axios from 'axios';

class SensorData extends Component {

  sensorDataURL = "https://getroomdeatils.azurewebsites.net/api/getSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";
  currentDate = new Date().toISOString();
  constructor(props) {
    super(props);
    //console.log("props in sensordata comp: ",props);
    console.log(this.currentDate);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      data:[
        [
          { x: '1-Jan-15', y: 20 },
          { x: '1-Feb-15', y: 10 },
          { x: '1-Mar-15', y: 33 },
          { x: '1-Apr-15', y: 45 },
          { x: '1-May-15', y: 15 }
        ], [
          { x: '1-Jan-15', y: 10 },
          { x: '1-Feb-15', y: 15 },
          { x: '1-Mar-15', y: 13 },
          { x: '1-Apr-15', y: 15 },
          { x: '1-May-15', y: 10 }
        ], [
          { x: '1-Jan-15', y: 20 },
          { x: '1-Feb-15', y: 11 },
          { x: '1-Mar-15', y: 33 },
          { x: '1-Apr-15', y: 4 },
          { x: '1-May-15', y: 74 }
        ]
      ]
    };
  }

  fetchData = () =>  {
    var newData = this.state.data.push(
      [{ x: '1-Jan-15', y: 70 },
        { x: '1-Apr-15', y: 15 },
        { x: '1-May-15', y: 10 }]
    );

    console.log("new data", this.state.data);
    /*this.setState({data:  [[{ x: '1-Jan-15', y: 70 },
      { x: '1-Apr-15', y: 15 },
      { x: '1-May-15', y: 10 }]]})*/

      this.setState({data : this.state.data});
    console.log("data", this.state.data);
    this.sensorDataURL += '&toDate='+this.currentDate;
    axios.get(this.sensorDataURL)
    .then(response => {
      console.log("response from db",response);
      // this.setState(
      //   {data: response.data.sensorData}
      // )
  })
  }

  mapData = () =>  {
    
  }


  render() {
    return (
      <div>
        SensorData charts go in here
        <br />

        <div>
    <div style={{display: 'inline-block'}}>
    <AreaChart
      xType={'time'}
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

  <Button onClick={this.fetchData}> Fetch Data  </Button>
      </div>
    );
  }
}

export default SensorData;
