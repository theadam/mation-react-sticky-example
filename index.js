import './index.css';
import { render } from 'react-dom';
import React, { Component }from 'react';
import lorem from 'lorem-ipsum';
import Sticky from 'react-sticky';
import Mation, { presets, spring} from 'mation';

class Test extends Component {
  state = {
    top: -100
  };
  initialValue = -150;
  mation = Mation(this.initialValue);
  first = lorem({count: 4, units: 'paragraphs'});
  last = lorem({count: 100, units: 'paragraphs'});
  stuck = false;
  offset = 100;

  constructor(props) {
    super(props)
    this.mation.on(v => this.setState({top: v}));
  }

  handleChange(e) {
    this.stuck = e;
    if(e) {
      this.mation.moveTo(spring(0, presets.wobbly));
      this.offset = 0;
    }
    else {
      this.mation.moveTo(this.initialValue);
      this.offset = 100;
    }
  }

  getStyle() {
    if(this.stuck){
      return {
        top: this.state.top,
        position: 'fixed',
        width: '100%',
        boxShadow: '0px 5px 5px #888888'
      }
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.first}
        <div style={{height: 100}}>
          <Sticky topOffset={this.offset} stickyStyle={{}} onStickyStateChange={v => this.handleChange(v)}>
            <header style={{height: 100, backgroundColor: 'red', width: '100%', ...this.getStyle()}}>IM STUCK!</header>
          </Sticky>
        </div>
        {this.last}
      </div>
    );
  }
}

render(<Test />, document.getElementById('container'));
