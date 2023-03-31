import CustomSlider from './CustomSlider';

const Sliders = ({ data, updateValue }) => {
  return (
    <div>
      <CustomSlider
        value={data.price}
        label="Prix du bien"
        field="price"
        setValue={updateValue}
        min={100000}
        max={600000}
        step={10000}
        suffix="€"
      />
      <CustomSlider
        value={data.input}
        label="Apport"
        field="input"
        setValue={updateValue}
        min={0}
        max={300000}
        step={5000}
        suffix="€"
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
      />
      <CustomSlider
        value={data.salary}
        label="Salaire"
        field="salary"
        setValue={updateValue}
        min={1000}
        max={10000}
        step={200}
        suffix="€"
      />
    </div>
  );
};

export default Sliders;
