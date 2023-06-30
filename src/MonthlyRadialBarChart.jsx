import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const MonthlyRadialBarChart = ({ className, salary, monthlyPayment }) => {
  const data = [
    {
      name: 'Salaire',
      uv: salary,
      fill: 'rgba(66, 165, 245, 0.75)',
    },
    {
      name: 'Mensualité',
      uv: monthlyPayment,
      fill: 'rgba(0, 194, 251, 0.75)',
    },
    {
      name: 'Mensualité max',
      uv: (salary * 0.35).toFixed(),
      fill: 'rgba(0, 217, 228, 0.75)',
    },
  ];

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius={80} outerRadius={160} barSize={16} data={data}>
          <RadialBar minAngle={15} label={{ position: 'insideEnd', fill: '#fff' }} background clockWise dataKey="uv" />
          <Legend formatter={(value, entry, index) => <span style={{ color: 'white' }}>{value}</span>} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRadialBarChart;
