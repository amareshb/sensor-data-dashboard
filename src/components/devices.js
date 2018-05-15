import React, {
  Component
} from 'react';
import { Link } from 'react-router-dom';

class Devices extends Component {
  render() {
    return (
      <div>
        Device Logic goes in here
        <Link to='try'>TRY component
        </Link>
      </div>
    );
  }
}

export default Devices;
