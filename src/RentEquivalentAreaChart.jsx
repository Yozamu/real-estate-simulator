import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RentEquivalentAreaChart = ({ className, notaryFees, totalInsuranceCost, interests }) => {
  const data = [];
  const len = interests.length;

  for (let i = 12; i <= len; i += 12) {
    const currentlyPaidInterests = +interests
      .slice(0, i)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed();
    data.push({
      year: i / 12,
      name: `Année ${i / 12}`,
      equivalent: +((currentlyPaidInterests + totalInsuranceCost + notaryFees) / i).toFixed(2),
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const interestsLeft = +payload[0].value;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].fill, padding: '8px' }}>
          <div>{payload[0].payload.name}</div>
          <div>Equivalent loyer : {interestsLeft}€</div>
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
          <Area type="monotone" dataKey="equivalent" stroke="rgba(0, 194, 251, 0.75)" fill="rgba(66, 165, 245, 0.75)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentEquivalentAreaChart;
