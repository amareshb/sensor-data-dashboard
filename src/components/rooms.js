import React, {
  Component
} from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,  Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : 'sample title',
      description : 'sample desc',
      data:[]
    };
    //this.fetchDeviceData();
    this.fetchDeviceData = this.fetchDeviceData.bind(this);
  }

  fetchDeviceData = () => {
    console.log("in here fn: ",this.state.title);
    /*var data = [
      {
        id:'201',
        title:'Room #201',
        description : 'sample desc',
        temp:'70',
        humidity:'25',
        pressure:'65'
      }, {
        id:'202',
        title:'Room #202',
        description : 'sample desc',
        temp:'76',
        humidity:'27',
        pressure:'67'
      }
    ];
    this.setState(
      {data: data}
    );*/
    axios.get('https://getroomdeatils.azurewebsites.net/api/queryRooms?code=wOwO/UjOyHcdeoCkQJ7ReOpW48AQ4z2Jsh1EVBdS6zDk/MAR58TKrg==&name=amar')
    .then(response => {
      console.log("response from db",response);
      this.setState(
        {data: response.data.data}
      )
  })
  }


  render() {
    var roomCards = [];
    for (var i = 0; i < this.state.data.length; i++) {
      console.log("item number: ", i);
      var imageName = this.state.data[i].title
      var re = /[^a-zA-Z0-9_-]/gi
      var image ='/images/' +  imageName.replace(re,'') + '.jpg';
      roomCards.push(
        <Card key={i}>
         <CardBody>
           <CardTitle>{this.state.data[i].title}</CardTitle>
           <CardSubtitle>{this.state.data[i].Location}</CardSubtitle>
         </CardBody>
         <img width="100%" src={image} onError={(e)=>{e.target.src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"}}  alt="Card image cap" />
         <CardBody>
           <CardText>{this.state.data[i].Description}</CardText>
           <Link to={'/sensorData/'+this.state.data[i].id }>Show Sensor Data</Link>
         </CardBody>
       </Card>
     );
    }
    return (
      <div className="cardsPage">
      <Button onClick={this.fetchDeviceData}> Show Rooms  </Button>
      <br />
        <div className="cardContainer">
        {roomCards}
</div>




      </div>
    );
  }
}

export default Rooms;
