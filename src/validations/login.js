import * as Yup from "yup"

const formLoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    password: Yup.string().min(3).required()
});

export default formLoginSchema;