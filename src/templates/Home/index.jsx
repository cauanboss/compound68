import { Children, cloneElement, useState, createContext, useContext } from 'react';
import Prop from 'prop-types';

const s = {
  style: {
    fontSize: '60px',
  },
};

const TurnOnOffContext = createContext();

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return <TurnOnOffContext.Provider value={{ isOn, onTurn }}>{children}</TurnOnOffContext.Provider>;
};

TurnOnOff.propTypes = {
  children: Prop.node.isRequired,
};

const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};
const TurnedOff = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};
const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  return (
    <button onClick={onTurn} {...props}>
      Turn {isOn ? 'OFF' : 'ON'}
    </button>
  );
};

const Home = () => {
  return (
    <TurnOnOff>
      <TurnedOn>Aqui as coisas vão acontecer ON</TurnedOn>
      <p>Oi</p>
      <TurnedOff>Aqui as coisas vão acontecerOFF</TurnedOff>
      <TurnButton {...s} />
    </TurnOnOff>
  );
};

export default Home;
