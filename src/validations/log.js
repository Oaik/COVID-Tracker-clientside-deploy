import * as Yup from "yup"

const formLogSchema = Yup.object().shape({
    age: Yup.number().required(),
    temperature: Yup.number().min(21).max(43).required(),
    isVaccinated: Yup.boolean(),
    gender: Yup.mixed().oneOf(['Male', 'Female'])
});

export default formLogSchema;