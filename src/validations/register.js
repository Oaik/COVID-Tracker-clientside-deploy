import * as Yup from "yup"

const formRegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    name: Yup.string().required(),
    password: Yup.string().min(3).required()
});

export default formRegisterSchema;