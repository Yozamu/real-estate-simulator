import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SavingsAreaChart = ({ className, monthlyPayment, years, salary }) => {
  const data = [];
  const leftToLive = salary - monthlyPayment;

  for (let i = 1; i <= years; i++) {
    data.push({
      year: i,
      name: `Année ${i}`,
      savings80: +(leftToLive * 0.8 * i * 12).toFixed(),
      savings60: +(leftToLive * 0.6 * i * 12).toFixed(),
      savings40: +(leftToLive * 0.4 * i * 12).toFixed(),
      savings20: +(leftToLive * 0.2 * i * 12).toFixed(),
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].fill, padding: '8px' }}>
          <div>{payload[0].payload.name}</div>
          <div>Reste à vivre mensuel: {leftToLive.toFixed()}€</div>
          <div>
            80% d'épargne ({(leftToLive * 0.8).toFixed()}€) : {payload[0].value}€
          </div>
          <div>
            60% d'épargne ({(leftToLive * 0.6).toFixed()}€) : {payload[1].value}€
          </div>
          <div>
            40% d'épargne ({(leftToLive * 0.4).toFixed()}€) : {payload[2].value}€
          </div>
          <div>
            20% d'épargne ({(leftToLive * 0.2).toFixed()}€) : {payload[3].value}€
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="year" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="savings80" stroke="rgba(0, 194, 251, 0.75)" fill="rgba(0, 194, 251, 0.75)" />
          <Area type="monotone" dataKey="savings60" stroke="rgba(0, 194, 251, 0.75)" fill="rgba(0, 194, 251, 0.5)" />
          <Area type="monotone" dataKey="savings40" stroke="rgba(0, 217, 228, 0.75)" fill="rgba(0, 217, 228, 0.5)" />
          <Area type="monotone" dataKey="savings20" stroke="rgba(17, 235, 186, 0.75)" fill="rgba(17, 235, 186, 0.5)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsAreaChart;
