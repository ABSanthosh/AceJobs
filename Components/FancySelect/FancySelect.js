import "./FancySelect.scss";

function FancySelect({ options, onChange }) {
  return (
    <div className="FancySelectWrapper  "
      data-icon={String.fromCharCode(58831)}
    >
      <select
        className="FancySelect"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default FancySelect;
