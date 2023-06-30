import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

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

  const totalInterestCost = +interests.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  const totalInsuranceCost = +(monthlyInsuranceCost * years * 12).toFixed(2);
  const totalLoanCost = totalInterestCost + totalInsuranceCost;
  const totalCost = totalLoanCost + notaryFees;

  const pieData = [
    { name: 'Intérêts', value: totalInterestCost },
    { name: 'Assurance', value: totalInsuranceCost },
    { name: 'Frais de notaire', value: notaryFees },
  ];

  const COLORS = ['rgba(66, 165, 245, 0.75)', 'rgba(0, 194, 251, 0.75)', 'rgba(0, 217, 228, 0.75)'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].payload.fill, padding: '8px' }}>
          {`${payload[0].name} : ${payload[0].value}€`}
        </div>
      );
    }

    return null;
  };

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
      <div style={{ width: '400px', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              innerRadius={75}
              fill="#fff"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend height={36} formatter={(value, entry, index) => <span style={{ color: 'white' }}>{value}</span>} />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimulationResults;
