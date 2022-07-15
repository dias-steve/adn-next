import FormButton from '../../components/form/FormButton'

export default {
    title:"Component/FormButtom",
    component:FormButton,
    argTypes: {
       name: { control: 'text' },
      },

};

export const FormButtomComponent = (args) => <FormButton {...args}/>;



