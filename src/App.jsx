import styled from '@emotion/styled';
import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import SimulationResults from './SimulationResults';
import Sliders from './Sliders';

const App = ({ className }) => {
  const [data, setData] = useState({
    price: 250000,
    input: 30000,
    years: 20,
    interestRate: 3,
    insuranceRate: 0.15,
    salary: 4000,
    isCouple: false,
    coSalary: 0,
    coInput: 0,
    coLoanPercent: 50,
  });

  const updateValue = (key, val) => {
    setData({ ...data, [key]: val });
  };

  return (
    <div className={className}>
      <AppBar>
        <Toolbar>
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
  .main {
    margin-top: 80px;
    display: flex;

    > :first-of-type {
      flex-basis: 25%;
      margin-right: 24px;
    }
  }
`;
