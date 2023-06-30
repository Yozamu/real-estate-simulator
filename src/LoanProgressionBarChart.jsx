import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoanProgressionBarchart = ({ className, interests, capital }) => {
  const data = [];
  const len = interests.length;

  for (let i = 0; i < len; i += 12) {
    data.push({
      year: i / 12 + 1,
      name: `Année ${i / 12 + 1}`,
      interests: Math.max(
        0,
        interests
          .slice(i, len)
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed()
      ),
      capital: capital
        .slice(i, len)
        .reduce((acc, curr) => acc + curr, 0)
        .toFixed(),
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].fill, padding: '8px' }}>
          <div>{payload[0].payload.name}</div>
          <div>{`${payload[0].name} : ${payload[0].value}€`}</div>
          <div>{`${payload[1].name} : ${payload[1].value}€`}</div>
          <div>Total restant : {+payload[0].value + +payload[1].value}€</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
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
          <Bar dataKey="interests" stackId="a" fill="rgba(66, 165, 245, 0.75)" name="Intérêts restants" />
          <Bar dataKey="capital" stackId="a" fill="rgba(0, 194, 251, 0.5)" name="Capital restant" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanProgressionBarchart;
