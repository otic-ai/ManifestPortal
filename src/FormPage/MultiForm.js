import React, { useEffect, useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const MultiTextFields = ({ options }) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (options && options.length > 0) {
      const initialFields = options.map((item, index) => ({
        id: (index + 1).toString(),
        value: item,
      }));
      setFields(initialFields);
    } else {
      // Initialize with a single empty field if options are empty
      setFields([{ id: '1', value: '' }]);
    }
  }, [options]);

  const handleChange = (event, index) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleAdd = () => {
    const newId = fields.length > 0 ? parseInt(fields[fields.length - 1].id) + 1 : 1;
    setFields([...fields, { id: newId.toString(), value: '' }]);
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      const newFields = [...fields];
      newFields.splice(index, 1);
      setFields(newFields);
    }
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <TextField
            required
            name={`Category-option ${index + 1}`}
            id={`Category-option ${index + 1}`}
            label={`Category-option ${index + 1}`}
            variant="standard"
            value={field.value}
            onChange={(event) => handleChange(event, index)}
          />
          <IconButton onClick={() => handleRemove(index)}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      ))}
      <IconButton onClick={handleAdd} aria-label="add">
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};

export default MultiTextFields;
