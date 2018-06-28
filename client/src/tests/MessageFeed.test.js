import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageFeed from '../components/MessageFeed';
import Message from '../components/Message';

Enzyme.configure({ adapter: new Adapter() });

describe('<MessageFeed />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageFeed />, div);
  });
  it('renders any number of <Message /> components', () => {
    const wrapper = shallow(<MessageFeed />);
    expect(wrapper.find(Message)).to.have.length(0);
  });
  // it('has a function called handleClick', () => {
  //   const wrapper = shallow(<MessageFeed />);
  //   expect(typeof wrapper.instance().handleClick).toBe('function');
  // });
  // it('has a click event that propagates up from the child component', () => {
  //   const handleClick = sinon.spy();
  //   const wrapper = shallow(<MessageFeed key={0} clickHandler={handleClick} />);
  //   wrapper
  //     .find(Button)
  //     .last()
  //     .simulate('click');
  //   expect(handleClick.calledOnce).toBeTruthy;
  // });
});
