import * as React from "react";

export const useCheckFieldChanges = (editableFields, user) => {
  const [fieldChangesToBeSaved, setFieldChangesToBeSaved] =
    React.useState(false);

  React.useEffect(() => {
    if (
      editableFields.name?.value !== user?.displayName &&
      editableFields.name?.value
    )
      return setFieldChangesToBeSaved(true);

    if (editableFields.profilePictureUrl !== user?.profilePicture?.url)
      return setFieldChangesToBeSaved(true);

    setFieldChangesToBeSaved(false);

    return () => {};
  }, [
    editableFields.name?.value,
    editableFields.profilePictureUrl,
    setFieldChangesToBeSaved,
    user?.displayName,
    user?.profilePicture?.url
  ]);

  return { fieldChangesToBeSaved };
};

export const useEditableFormFields = () => {
  const editableFieldsRef = React.useRef({});

  const [editableFields, setEditableFields] = React.useState(() => {
    return editableFieldsRef.current;
  });

  const handleFieldEdit = (event) => {
    const field = event.target.name;
    const { value } = event.target;

    setEditableFields((state) => ({
      ...state,
      [field]: { ...state[field], value }
    }));
  };

  const makeFieldEditable = (field) => {
    setEditableFields((state) => ({
      ...state,
      [field]: { ...state[field], isEditing: true }
    }));
  };

  const cancelFieldEdit = (field) => {
    setEditableFields((state) => ({
      ...state,
      [field]: { ...state[field], isEditing: false }
    }));
  };

  const registerEditableField = (field = "") => {
    if (field) {
      editableFieldsRef.current[field] = { value: "", isEditing: false };

      return {
        name: field,
        value: editableFields[field]?.value,
        isEditing: editableFields[field]?.isEditing,
        onChange: handleFieldEdit,
        onBlur: () => cancelFieldEdit(field),
        editField: () => makeFieldEditable(field)
      };
    }

    throw new Error("field is required");
  };

  return {
    editableFields,
    setEditableFields,
    registerEditableField
  };
};
