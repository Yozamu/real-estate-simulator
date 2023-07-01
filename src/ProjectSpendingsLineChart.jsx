import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectSpendingsLineChart = ({ className, monthlyPayment, data }) => {
  const { input, coInput, years, coLoanPercent, isCouple } = data;
  const lineChartData = [];

  for (let i = 1; i <= years; i++) {
    lineChartData.push({
      year: i,
      name: `Année ${i}`,
      A: +(input + ((100 - coLoanPercent) / 100) * monthlyPayment * i * 12).toFixed(),
      B: +(coInput + (coLoanPercent / 100) * monthlyPayment * i * 12).toFixed(),
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].color, padding: '8px' }}>
          <div>{payload[0].payload.name}</div>
          <div>
            {payload[0].name} : {payload[0].value}€
          </div>
          {isCouple && (
            <div>
              {payload[1].name} : {payload[1].value}€
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={lineChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="year" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(value, entry, index) => <span style={{ color: 'white' }}>{value}</span>} />
          <Line type="monotone" name="Emprunteur" dataKey="A" stroke="rgba(66, 165, 245, 0.8)" dot={false} />
          {isCouple && (
            <Line type="monotone" name="Co-Emprunteur" dataKey="B" stroke="rgba(0, 194, 251, 0.8)" dot={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectSpendingsLineChart;
