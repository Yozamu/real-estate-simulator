const SimulationResults = ({ className, data }) => {
  const { price, input, interestRate, insuranceRate, salary, years } = data;
  const notaryFees = price * 0.08;
  const loanAmount = price - input + notaryFees;
  const monthlyLoanCost = (
    (loanAmount * interestRate) /
    100 /
    12 /
    (1 - Math.pow(1 + interestRate / 100 / 12, -years * 12))
  ).toFixed(2);
  const monthlyInsuranceCost = (loanAmount * (insuranceRate / 100 / 12)).toFixed(2);
  const monthlyPayment = (+monthlyLoanCost + +monthlyInsuranceCost).toFixed(2);
  const indebtedness = (monthlyPayment / salary).toFixed(2);
  const doable = indebtedness <= 0.35;

  const interests = [loanAmount * ((0.01 * interestRate) / 12)];
  const capital = [monthlyLoanCost - interests[0]];
  const leftToPay = [loanAmount - capital[0]];
  for (let i = 1; i < years * 12; i++) {
    interests.push(leftToPay[i - 1] * ((0.01 * interestRate) / 12));
    capital.push(monthlyPayment - interests[i]);
    leftToPay.push(leftToPay[i - 1] - capital[i]);
  }

  const totalInterestCost = interests.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  const totalInsuranceCost = (monthlyInsuranceCost * years * 12).toFixed(2);
  const totalLoanCost = +totalInterestCost + +totalInsuranceCost;
  const totalCost = +totalLoanCost + +notaryFees;
  return (
    <div>
      <div>
        Faisabilité du projet: {doable ? 'OUI' : 'NON'} ({indebtedness * 100}% d'endettement)
      </div>
      <div>Montant du prêt: {loanAmount}€</div>
      <div>
        Mensualité: {monthlyPayment}€ ({monthlyLoanCost}€ de prêt et {monthlyInsuranceCost}€ d'assurance)
      </div>
      <div>Frais de notaire: {notaryFees}€</div>
      <div>
        Coût total du prêt: {totalLoanCost}€ ({totalInterestCost}€ en intérêts, {totalInsuranceCost}€ en assurance)
      </div>
      <div>Coût total de l'opération: {totalCost}€</div>
    </div>
  );
};

export default SimulationResults;
