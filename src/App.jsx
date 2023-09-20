import styled from '@emotion/styled';
import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import SimulationResults from './SimulationResults';
import Sliders from './Sliders';

const App = ({ className }) => {
  const [data, setData] = useState({
    price: 180000,
    input: 40000,
    years: 20,
    interestRate: 3,
    insuranceRate: 0.15,
    salary: 2600,
    isCouple: false,
    coSalary: 1600,
    coInput: 5000,
    coLoanPercent: 50,
  });

  const updateValue = (key, val) => {
    setData({ ...data, [key]: val });
  };

  return (
    <div className={className}>
      <AppBar>
        <Toolbar className="header">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simulateur immobilier
          </Typography>
          Avec co-emprunteur ?
          <Switch color="default" checked={data.isCouple} onChange={(e) => updateValue('isCouple', e.target.checked)} />
        </Toolbar>
      </AppBar>
      <div className="main">
        <Sliders data={data} updateValue={updateValue} />
        <SimulationResults data={data} />
      </div>
    </div>
  );
};

export default styled(App)`
  .header {
    min-height: 48px;
  }

  .main {
    margin-top: 64px;
    display: flex;

    > :first-of-type {
      flex-basis: 40%;
      min-width: 400px;
      margin-right: 24px;
      position: sticky;
      top: 64px;
      align-self: flex-start;
    }
  }
`;
