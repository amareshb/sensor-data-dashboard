import React, {
  Component
} from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,  Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : 'sample title',
      description : 'sample desc',
      data:[]
    };
    //this.fetchDeviceData();
  }

  fetchDeviceData = () => {
    console.log("in here fn: ",this.state.title);
    var data = [
      {
        studyRoomId:'201',
        title:'Room #201',
        description : 'sample desc',
        temp:'70',
        humidity:'25',
        pressure:'65'
      }, {
        studyRoomId:'202',
        title:'Room #202',
        description : 'sample desc',
        temp:'76',
        humidity:'27',
        pressure:'67'
      }
    ];
    this.setState(
      {data: data}
    );
  }


  render() {
    var roomCards = [];
    for (var i = 0; i < this.state.data.length; i++) {
      console.log("item number: ", i);
      roomCards.push(
        <Card key={i}>
         <CardBody>
           <CardTitle>{this.state.data[i].title}</CardTitle>
           <CardSubtitle>{this.state.data[i].description}</CardSubtitle>
         </CardBody>
         <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
         <CardBody>
           <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
           <CardLink href="/sensorData">Sensor Data</CardLink>
         </CardBody>
       </Card>
     );
    }
    return (
      <div>
      <Button onClick={this.fetchDeviceData}> Fetch Data  </Button>
       <br />


        {roomCards}



           <br />

        <Link to="try">TRY component
        </Link>
      </div>
    );
  }
}

export default Rooms;
