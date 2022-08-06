import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormFields({ className, fields = [] }) {
  const blurFieldOnEnter = (event) => {
    if (event.which === 13) event.target.blur();
  };

  return (
    <div className={className}>
      {fields.map((field) => {
        const {
          readOnly,
          readOnlyStyle,
          label,
          name,
          value,
          isEditing,
          onChange,
          onBlur,
          editField
        } = field;

        return !readOnly ? (
          <div key={name} className="field">
            <label>{label}:</label>
            {isEditing ? (
              <input
                autoFocus
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={blurFieldOnEnter}
                value={value}
              />
            ) : (
              <p>{value || ""}</p>
            )}

            <div
              role="button"
              tabIndex={0}
              aria-hidden="true"
              onClick={editField}
              className={`edit-icon hoverable ${isEditing ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </div>
        ) : (
          <div key={name} className="field">
            <label>{label}:</label>
            <p style={readOnlyStyle || { color: "var(--primary-light)" }}>
              {value || ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default FormFields;
