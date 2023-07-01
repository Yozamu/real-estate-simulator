import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RentEquivalentAreaChart = ({ className, notaryFees, totalInsuranceCost, interests, capital }) => {
  const data = [];
  const len = interests.length;

  for (let i = 12; i <= len; i += 12) {
    const currentlyPaidInterests = +interests
      .slice(0, i)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed();
    const currentlyPaidCapital = +capital
      .slice(0, i)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed();
    const equivalent = +((currentlyPaidInterests + totalInsuranceCost + notaryFees) / i).toFixed(2);
    data.push({
      year: i / 12,
      name: `Année ${i / 12}`,
      equivalent,
      equivalentWithCapital: +(equivalent + currentlyPaidCapital / i).toFixed(2),
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const equivalent = +payload[0].value;
      const equivalentWithCapital = +payload[1].value;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].fill, padding: '8px' }}>
          <div>{payload[0].payload.name}</div>
          <div>Equivalent loyer : {equivalent}€</div>
          <div>Avec capital : {equivalentWithCapital}€</div>
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
          <Area type="monotone" dataKey="equivalent" stroke="rgba(0, 194, 251, 0.75)" fill="rgba(0, 194, 251, 0.75)" />
          <Area
            type="monotone"
            dataKey="equivalentWithCapital"
            stroke="rgba(0, 194, 251, 0.5)"
            fill="rgba(0, 194, 251, 0.5)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentEquivalentAreaChart;
