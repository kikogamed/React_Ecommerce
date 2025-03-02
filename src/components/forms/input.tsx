import { Form, FormControl } from "react-bootstrap"
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TInput<TFieldValue extends FieldValues> = {
    label: string,
    name: Path<TFieldValue>,
    error: string,
    register: UseFormRegister<TFieldValue>,
    type?: string,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    checkMessage?: string,
    successMessage?: string,
}

const Input = <TFieldValue extends FieldValues>({ 
    label,
    name, 
    error, 
    register, 
    type="text", 
    onBlur, 
    checkMessage, 
    successMessage
}: TInput<TFieldValue>) => {
    return (
    <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control 
          type= {type}
          {...register(name)}
          isInvalid={error ? true : false}
          isValid={successMessage ? true : false}
          onBlur={onBlur}

        />
        <FormControl.Feedback type="invalid">
          {error}
        </FormControl.Feedback>
        <FormControl.Feedback type="valid">
          {successMessage}
        </FormControl.Feedback>
        {
            checkMessage &&
            <Form.Text className="text-muted">
                {checkMessage}
            </Form.Text>           
        }
    </Form.Group>
    )
}

export default Input;