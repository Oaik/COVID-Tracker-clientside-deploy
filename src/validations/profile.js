import * as Yup from "yup"

const formProfileSchema = Yup.object().shape({
    name: Yup.string().required()
});

export default formProfileSchema;