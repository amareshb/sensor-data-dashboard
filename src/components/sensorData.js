import React, {
  Component
} from 'react';
import {
  AreaChart
} from 'react-easy-chart';
import {
  Button
} from 'reactstrap';
import axios from 'axios';
var SmoothieComponent = require('react-smoothie');

class SensorData extends Component {

  sensorDataURL = "https://getroomdeatils.azurewebsites.net/api/getSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";
  dhtSensorDataURL = "https://getroomdeatils.azurewebsites.net/api/getLatestSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg=="
  sendDatatoDeviceURL = "https://getroomdeatils.azurewebsites.net/api/sendMessageC2D?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";

  lightDataURL = "https://getroomdeatils.azurewebsites.net/api/getLightSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";
  soundDataURL = "https://getroomdeatils.azurewebsites.net/api/getSoundSensorData?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==";

  currentDate = new Date().toISOString();
  tempData = [];
  xAxisVal = 0;
  avgtemperature = 0;
  avgpressure = 0;
  avghumidity = 0;
  tempData = {
    time:0,
    val:0
  };
  humidityData = {
    time:0,
    val:0
  };
  heatData = {
    time:0,
    val:0
  };
  lightData = {
    time:0,
    val:0
  };
  soundData = {
    time:0,
    val:0
  };
  resTime = 0;

  constructor(props) {
    super(props);
    //console.log("props in sensordata comp: ",props);
    console.log(this.currentDate);
    this.fetchInitalData = this.fetchInitalData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.sendDatatoDevice = this.sendDatatoDevice.bind(this);

    this.state = {
      data: []
    };
    this.fetchInitalData();
  }



  componentDidMount() {
       this.dhtChart = this.refs.chart.addTimeSeries({}, {
        strokeStyle: 'rgba(0, 255, 0, 1)',
        fillStyle: 'rgba(0, 255, 0, 0.2)',
        lineWidth: 4
      });
      this.soundChart = this.refs.chart.addTimeSeries({}, {
        strokeStyle: 'rgba(255, 0, 0, 1)',
        fillStyle: 'rgba(255, 0, 0, 0.2)',
        lineWidth: 4
      });
      this.lightChart = this.refs.chart.addTimeSeries({}, {
        strokeStyle: 'rgba(100, 0, 200, 1)',
        fillStyle: 'rgba(0, 0, 255, 0.2)',
        lineWidth: 4
      });
      this.humidtyChart = this.refs.chart.addTimeSeries({}, {
        strokeStyle: 'rgba(10, 40, 80, 1)',
        fillStyle: 'rgba(10, 40, 80, 0.2)',
        lineWidth: 4
      });
      this.heatChart = this.refs.chart.addTimeSeries({}, {
        strokeStyle: 'rgba(0, 65, 25, 1)',
        fillStyle: 'rgba(0, 65, 25, 0.2)',
        lineWidth: 4
      });
      var that = this;
      this.dataGenerator = setInterval(function() {
        that.xAxisVal++;
        that.fetchData();
        //var time = new Date(that.lightData.time).getTime();
        var time = new Date().getTime();
        if(that.xAxisVal > 10) {
          that.dhtChart = [];
        }
        //that.dhtChart.append(time, that.tempData.val);
        that.soundChart.append(time, that.soundData.val);
        that.lightChart.append(time, that.lightData.val);
        //that.humidtyChart.append(time, that.humidityData.val);
        //that.heatChart.append(time, that.heatData.val);
      }, 3000);
    }

    componentWillUnmount() {
      clearInterval(this.dataGenerator);
    }

  fetchData = () => {
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
    axios.get(this.dhtSensorDataURL)
      .then(response => {
        console.log("response from db dht Data", response);

        //var newData = this.state.data[0].push({x:response.data.sensorData[0].time,y:response.data.sensorData[0].avgtemperature});
        /*var newData = this.state.data[0].push({
          x: this.xAxisVal++,
          y: response.data.sensorData[0].avgtemperature
        });

        this.setState({
          data: this.state.data
        });*/

        //this.time = response.data.sensorData[0].time;

        this.tempData.time = response.data.sensorData[0].time;
        this.tempData.val = response.data.sensorData[0].avgtemperature;

        this.heatData.time = response.data.sensorData[0].time;
        this.heatData.val = response.data.sensorData[0].avgheatindex;

        this.humidityData.time = response.data.sensorData[0].time;
        this.humidityData.val = response.data.sensorData[0].avghumidity;




        /*var that = this;
        this.dataGenerator = setInterval(function() {
          var time = new Date().getTime();
          //var time = response.data.sensorData[0].time;
          that.ts1.append(time, response.data.sensorData[0].avgtemperature);
          that.ts2.append(time, response.data.sensorData[0].avgpressure);
          that.ts3.append(time,response.data.sensorData[0].avghumidity);
        }, 500);*/

        // this.setState(
        //   {data: response.data.sensorData}
        // )
      });

      axios.get(this.lightDataURL)
        .then(response => {
          console.log("light val", response);
          this.lightData.time = response.data.sensorData[0].time;
          this.lightData.val = response.data.sensorData[0].avglight;
        });

        axios.get(this.soundDataURL)
          .then(response => {
            console.log("sound val", response);
            this.soundData.time = response.data.sensorData[0].time;
            this.soundData.val = response.data.sensorData[0].avgsound;
          });
  }

  fetchInitalData = () => {
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
    this.sensorDataURL += '&toDate=' + this.currentDate;
    axios.get(this.sensorDataURL)
      .then(response => {
        console.log("response from db", response);
        //this.mapData(response.data.sensorData);
        // this.setState(
        //   {data: response.data.sensorData}
        // )
      })
  }

  /*mapData = (data) => {
    for (var i = 0; i < data.length; i++) {
      this.tempData.push({
        x: this.xAxisVal++,
        y: data[i].avgtemperature
      });
    }
    console.log("tempData: ", this.tempData);
    this.setState({
      data: [this.tempData]
    })
  }*/

sendDatatoDevice = () => {
  axios.get(this.sendDatatoDeviceURL)
    .then(response => {
      console.log("response sendDatatoDeviceURL: ", response);
    });
}

  render() {
    return (
      <div>
        SensorData charts go in here
        <br />
        <div>
        <SmoothieComponent ref="chart" width="1000" height="300" tooltip/>

        </div>
        <br/>
        <Button onClick={this.fetchData}> Fetch Data  </Button>
        <br />
        <Button onClick={this.sendDatatoDevice}> Send message to device  </Button>
      </div>
    );
  }
}

export default SensorData;
