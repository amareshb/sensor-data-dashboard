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

    this.soundChart = this.refs.soundchart.addTimeSeries({}, {
      strokeStyle: 'rgba(255, 0, 0, 1)',
      fillStyle: 'rgba(255, 0, 0, 0.2)',
      lineWidth: 4
    });
    this.lightChart = this.refs.lightchart.addTimeSeries({}, {
      strokeStyle: 'rgba(100, 0, 200, 1)',
      fillStyle: 'rgba(100, 0, 200, 0.2)',
      lineWidth: 4
    });

       this.tempChart = this.refs.tempchart.addTimeSeries({}, {
        strokeStyle: 'rgba(181, 244, 65, 1)',
        fillStyle: 'rgba(181, 244, 65, 0.2)',
        lineWidth: 4
      });

      this.humidtyChart = this.refs.humiditychart.addTimeSeries({}, {
        strokeStyle: 'rgba(66, 86, 244, 1)',
        fillStyle: 'rgba(66, 86, 244, 0.2)',
        lineWidth: 4
      });
      this.heatChart = this.refs.heatchart.addTimeSeries({}, {
        strokeStyle: 'rgba(238, 65, 244, 1)',
        fillStyle: 'rgba(238, 65, 244, 0.2)',
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
        that.tempChart.append(time, that.tempData.val);
        that.soundChart.append(time, that.soundData.val);
        that.lightChart.append(time, that.lightData.val);
        that.humidtyChart.append(time, that.humidityData.val);
        that.heatChart.append(time, that.heatData.val);
      }, 500);
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
        this.tempData.val = response.data.sensorData[0].avgtemperature.toFixed(2);

        this.heatData.time = response.data.sensorData[0].time;
        this.heatData.val = response.data.sensorData[0].avgheatindex.toFixed(2);

        this.humidityData.time = response.data.sensorData[0].time;
        this.humidityData.val = response.data.sensorData[0].avghumidity.toFixed(2);




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
            this.soundData.val = response.data.sensorData[0].avgsound.toFixed(2);
            if(this.soundData.val > 123){
              this.sendDatatoDevice();
            }
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
        <br />
        <div className = "graphParent">
        <div className="graph">
          <p><b>LIGHT</b></p>
          <SmoothieComponent  ref="lightchart" width="300" height="300" tooltip/>
        </div>
        <div className="graph">
        <p><b>SOUND</b></p>
          <SmoothieComponent  ref="soundchart" width="300" height="300" tooltip/>
        </div>
        <div className="graph">
        <p><b>TEMPERATURE</b></p>
          <SmoothieComponent  ref="tempchart" width="300" height="300" tooltip minValue="0" maxValue="100"/>
        </div>
        <div className="graph">
        <p><b>HUMIDITY</b></p>
          <SmoothieComponent  ref="humiditychart" width="300" height="300" tooltip minValue="0" maxValue="100"/>
        </div>
        <div className="graph">
        <p><b>HEAT INDEX</b></p>
          <SmoothieComponent  ref="heatchart" width="300" height="300" tooltip minValue="0" maxValue="100"/>
        </div>
        </div>

        <br/>

        <br />
        <Button onClick={this.sendDatatoDevice}> Send message to device  </Button>
      </div>
    );
  }
}

export default SensorData;
