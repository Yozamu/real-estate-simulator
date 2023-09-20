import styled from '@emotion/styled';
import CustomSlider from './CustomSlider';

const Sliders = ({ className, data, updateValue }) => {
  return (
    <div className={className}>
      <CustomSlider
        value={data.price}
        label="Prix du bien"
        field="price"
        setValue={updateValue}
        min={100000}
        max={600000}
        step={10000}
        suffix="€"
        isAdjustable
      />
      <CustomSlider
        value={data.years}
        label="Durée du prêt"
        field="years"
        setValue={updateValue}
        min={5}
        max={25}
        step={1}
        suffix=" ans"
      />
      <CustomSlider
        value={data.interestRate}
        label="Taux du prêt"
        field="interestRate"
        setValue={updateValue}
        min={1}
        max={5}
        step={0.1}
        suffix="%"
        isAdjustable
      />
      <CustomSlider
        value={data.insuranceRate}
        label="Taux d'assurance"
        field="insuranceRate"
        setValue={updateValue}
        min={0.1}
        max={0.5}
        step={0.05}
        suffix="%"
        isAdjustable
      />
      <CustomSlider
        value={data.salary}
        label="Salaire"
        field="salary"
        setValue={updateValue}
        min={1000}
        max={6000}
        step={200}
        suffix="€"
        isAdjustable
      />
      <CustomSlider
        value={data.input}
        label="Apport"
        field="input"
        setValue={updateValue}
        min={0}
        max={200000}
        step={5000}
        suffix="€"
        isAdjustable
      />
      {data.isCouple && (
        <>
          <CustomSlider
            value={data.coSalary}
            label="Salaire co-emprunteur"
            field="coSalary"
            setValue={updateValue}
            min={1000}
            max={6000}
            step={200}
            suffix="€"
            isAdjustable
          />
          <CustomSlider
            value={data.coInput}
            label="Apport co-emprunteur"
            field="coInput"
            setValue={updateValue}
            min={0}
            max={200000}
            step={5000}
            suffix="€"
            isAdjustable
          />
          <CustomSlider
            value={data.coLoanPercent}
            label="% crédit co-emprunteur"
            field="coLoanPercent"
            setValue={updateValue}
            min={0}
            max={100}
            step={5}
            suffix="%"
            isAdjustable
          />
        </>
      )}
    </div>
  );
};

export default styled(Sliders)`
  > div {
    margin: ${(props) => (props.data.isCouple ? '12px 16px' : '24px 16px')};
  }
`;
