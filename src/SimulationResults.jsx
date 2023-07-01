import styled from '@emotion/styled';
import MonthlyRadialBarChart from './MonthlyRadialBarChart';
import ProjectCostPieChart from './ProjectCostPieChart';
import LoanProgressionBarchart from './LoanProgressionBarChart';
import RentEquivalentAreaChart from './RentEquivalentAreaChart';
import CoBuyerRadarChart from './CoBuyerRadarChart';

const SimulationResults = ({ className, data }) => {
  const { price, input, interestRate, insuranceRate, salary, years, isCouple, coSalary, coInput } = data;
  const totalSalary = salary + (isCouple ? coSalary : 0);
  const totalInput = input + (isCouple ? coInput : 0);
  const notaryFees = price * 0.08;
  const loanAmount = price - totalInput + notaryFees;
  const monthlyLoanCost = (
    (loanAmount * interestRate) /
    100 /
    12 /
    (1 - Math.pow(1 + interestRate / 100 / 12, -years * 12))
  ).toFixed(2);
  const monthlyInsuranceCost = (loanAmount * (insuranceRate / 100 / 12)).toFixed(2);
  const monthlyPayment = (+monthlyLoanCost + +monthlyInsuranceCost).toFixed(2);
  const indebtedness = (monthlyPayment / totalSalary).toFixed(3);
  const doable = indebtedness <= 0.35;

  const interests = [loanAmount * ((0.01 * interestRate) / 12)];
  const capital = [monthlyLoanCost - interests[0]];
  const leftToPay = [loanAmount - capital[0]];
  for (let i = 1; i < years * 12; i++) {
    interests.push(leftToPay[i - 1] * ((0.01 * interestRate) / 12));
    capital.push(monthlyLoanCost - interests[i]);
    leftToPay.push(leftToPay[i - 1] - capital[i]);
  }

  const totalInterestCost = +interests.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  const totalInsuranceCost = +(monthlyInsuranceCost * years * 12).toFixed(2);
  const totalLoanCost = totalInterestCost + totalInsuranceCost;
  const totalCost = (totalLoanCost + notaryFees).toFixed();

  return (
    <div className={className}>
      <div>
        <div>Coût total de l'opération: {totalCost}€</div>
        <br />
        <ProjectCostPieChart
          totalInterestCost={totalInterestCost}
          totalInsuranceCost={totalInsuranceCost}
          notaryFees={notaryFees}
        />
      </div>
      <div>
        <div>
          Faisabilité du projet: <em style={{ color: doable ? 'lime' : 'red' }}>{doable ? 'OUI' : 'NON'}</em> (
          {(indebtedness * 100).toFixed()}% d'endettement)
        </div>
        <MonthlyRadialBarChart
          salary={totalSalary}
          monthlyLoanCost={monthlyLoanCost}
          monthlyInsuranceCost={monthlyInsuranceCost}
          monthlyPayment={monthlyPayment}
        />
      </div>
      <div>
        <div>Montant du prêt: {loanAmount}€</div>
        <LoanProgressionBarchart
          interests={interests}
          capital={capital}
          loanAmount={loanAmount}
          totalInterestCost={totalInterestCost}
        />
      </div>
      <div>
        <RentEquivalentAreaChart
          notaryFees={notaryFees}
          totalInsuranceCost={totalInsuranceCost}
          interests={interests}
          capital={capital}
        />
        <div>Equivalence en loyer en cas de revente sans perte</div>
      </div>
      <div>
        <CoBuyerRadarChart data={data} loanAmount={loanAmount} monthlyPayment={monthlyPayment} />
      </div>
    </div>
  );
};

export default styled(SimulationResults)`
  display: flex;
  flex-wrap: wrap;

  > div {
    text-align: center;
    > div > div {
      text-align: left;
    }
  }
`;
