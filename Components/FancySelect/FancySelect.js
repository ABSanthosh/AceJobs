import "./FancySelect.scss";

function FancySelect({ options, onChange, defaultValue }) {
  return (
    <div
      className="FancySelectWrapper  "
      data-icon={String.fromCharCode(58831)}
    >
      <select
        className="FancySelect"
        onChange={(e) => onChange(e.target.value)}
        value={defaultValue}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FancySelect;
