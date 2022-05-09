import React, {useState} from "react";
import {ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {FormControl, InputLabel, MenuItem, Select, TextField as TextFieldMUI, Typography,} from "@material-ui/core";
import {Diagnosis, Gender} from "../types";
import Input from '@material-ui/core/Input';

// structure of a single option
export type GenderOption = {
    value: Gender;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: GenderOption[];
};

export type EntryTypeOption = {
    value: string;
    label: string;
};

// props for select field component
type EntryTypeSelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
};

const FormikSelect = ({field, ...props}: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({name, label, options}: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{marginBottom: "0.5em"}}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

export const EntryTypeSelectField = ({name, label, options}: EntryTypeSelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{marginBottom: "0.5em"}}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField = ({field, label, placeholder}: TextProps) => {
    return <div style={{marginBottom: "1em"}}>
        <TextFieldMUI
            fullWidth
            label={label}
            placeholder={placeholder}
            {...field}
        />
        <Typography variant="subtitle2" style={{color: "red"}}>
            <ErrorMessage name={field.name}/>
        </Typography>
    </div>;
};

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
    label: string;
    min: number;
    max: number;
}

export const NumberField = ({field, label, min, max}: NumberProps) => {
    // const fieldValue: number = field.value as number
    // const [value, setValue] = useState<number>(fieldValue);
    return <div style={{marginBottom: "1em"}}>
        <TextFieldMUI
            fullWidth
            label={label}
            placeholder={String(min)}
            type="number"
            // value={value}
            {...field}
            onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value === undefined) return;
                if (value > max) return;
                else if (value < min) return;
                else field.onChange(e);
            }}
        />
        <Typography variant="subtitle2" style={{color: "red"}}>
            <ErrorMessage name={field.name}/>
        </Typography>
    </div>;
};

export const DiagnosisSelection = ({
                                       diagnoses,
                                       setFieldValue,
                                       setFieldTouched,
                                   }: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
    const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
    const field = "diagnosisCodes";
    const onChange = (data: string[]) => {
        setDiagnoses([...data]);
        setFieldTouched(field, true);
        setFieldValue(field, selectedDiagnoses);
    };

    const stateOptions = diagnoses.map((diagnosis) => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code,
    }));

    return (
        <FormControl style={{width: "100%", marginBottom: '30px'}}>
            <InputLabel>Diagnoses</InputLabel>
            <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])}
                    input={<Input/>}>
                {stateOptions.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
            <ErrorMessage name={field}/>
        </FormControl>
    );
};
