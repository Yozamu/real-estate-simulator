import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CoBuyerRadarChart = ({ className, data, loanAmount, monthlyPayment }) => {
  const { isCouple, coLoanPercent, salary, coSalary, input, coInput, price } = data;
  const quota = (((((100 - coLoanPercent) / 100) * loanAmount + input) / (price * 1.08)) * 100).toFixed();
  const leftToLive = (((salary - (monthlyPayment * (100 - coLoanPercent)) / 100) / salary) * 100).toFixed();
  const coLeftToLive = (((coSalary - (monthlyPayment * coLoanPercent) / 100) / coSalary) * 100).toFixed();
  const radarData = isCouple
    ? [
        {
          subject: '% Crédit',
          A: 100 - coLoanPercent,
          B: coLoanPercent,
          fullMark: 100,
        },
        {
          subject: '% Salaire',
          A: ((salary / (salary + coSalary)) * 100).toFixed(),
          B: ((coSalary / (salary + coSalary)) * 100).toFixed(),
          fullMark: 100,
        },
        {
          subject: '% Apport',
          A: ((input / (input + coInput)) * 100).toFixed(),
          B: ((coInput / (input + coInput)) * 100).toFixed(),
          fullMark: 100,
        },
        {
          subject: '% Quotités',
          A: quota,
          B: 100 - quota,
          fullMark: 100,
        },
        {
          subject: '% Reste',
          A: leftToLive,
          B: coLeftToLive,
          fullMark: 100,
        },
      ]
    : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: payload[0].fill, padding: '8px' }}>
          <div>{payload[0].payload.subject}</div>
          <div>
            {payload[0].name} : {payload[0].value}%
          </div>
          <div>
            {payload[1].name} : {payload[1].value}%
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
          <PolarGrid stroke="white" />
          <PolarAngleAxis dataKey="subject" stroke="white" />
          <PolarRadiusAxis angle={45} domain={[0, 100]} stroke="white" />
          <Radar
            name="Emprunteur"
            dataKey="A"
            stroke="rgba(66, 165, 245, 0.9)"
            fill="rgba(66, 165, 245, 0.75)"
            fillOpacity={0.5}
          />
          <Radar
            name="Co-Emprunteur"
            dataKey="B"
            stroke="rgb(0, 194, 251)"
            fill="rgb(0, 194, 251)"
            fillOpacity={0.25}
          />
          <Legend formatter={(value, entry, index) => <span style={{ color: 'white' }}>{value}</span>} />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoBuyerRadarChart;
