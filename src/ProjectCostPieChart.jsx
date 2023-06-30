import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ProjectCostPieChart = ({ className, totalInterestCost, totalInsuranceCost, notaryFees }) => {
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
  );
};

export default ProjectCostPieChart;
