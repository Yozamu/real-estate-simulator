import styled from '@emotion/styled';
import { Slider, Typography } from '@mui/material';

const CustomSlider = ({
  className,
  field,
  label = 'Slider',
  value,
  setValue = () => {},
  step = 10,
  min = 0,
  max = 100,
  suffix = '',
}) => {
  return (
    <div className={className}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="h5">
        {value}
        {suffix}
      </Typography>
      <Slider
        onChange={(e, newVal) => setValue(field, newVal)}
        marks
        defaultValue={value}
        step={step}
        min={min}
        max={max}
      />
      <div className="range">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
};

export default styled(CustomSlider)`
  margin: 24px 16px;
  .range {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #ccc;
  }
`;
