import { Form, Formik } from 'formik'
import * as yup from 'yup'

import Button from './Button'
import FormGroup from './FormGroup'
import FormikField from './FormikField'

export default {
  title: 'Forms/Formik',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

const schema = yup.object().shape({
  name: yup.string().required().trim().label('Name'),
  email: yup.string().required().email().trim().label('Email'),
  message: yup.string().required().trim().label('Message'),
})

const Story = () => {
  const handleSubmit = (values) => {
    console.log(values) // eslint-disable-line no-console
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormikField name="name" label="Name" required />
        <FormikField type="email" name="email" label="Email" required />
        <FormikField as="textarea" name="message" label="Message" required />
        <FormGroup>
          <Button type="primary" actionType="submit">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </Formik>
  )
}

export const Overview = Story.bind({})
