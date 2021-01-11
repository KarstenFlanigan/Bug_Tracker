import { useState } from 'react'

export const useFormFields = (initialState) => {
    const [fieldValues, setfieldValues] = useState(initialState);
    return [
        fieldValues,
        (event) => {
            setfieldValues(
                {
                    ...fieldValues,
                    [event.target.id]: event.target.value
                }
            )
        }
    ]
}