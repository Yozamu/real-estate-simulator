import styled from '@emotion/styled';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { IconButton, Slider, Typography } from '@mui/material';

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
  isAdjustable = false,
}) => {
  return (
    <div className={className}>
      <div className="slider-title">
        <Typography variant="h6">
          {label}:{' '}
          <strong>
            {value}
            {suffix}
          </strong>
        </Typography>
        {isAdjustable && (
          <div>
            <IconButton color="primary" onClick={() => setValue(field, value + step / 5)} size="small">
              <KeyboardArrowUp />
            </IconButton>
            <IconButton color="primary" onClick={() => setValue(field, Math.max(0, value - step / 5))} size="small">
              <KeyboardArrowDown />
            </IconButton>
          </div>
        )}
      </div>
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
  .slider-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .range {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #ccc;
  }
`;
