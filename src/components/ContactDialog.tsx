import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from '../styles/ContactDialog.module.scss';
import { Button } from "primereact/button";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';


interface Props {
  visible: boolean;
  onHideDialog: () => void;
}

const ReplyDialog: React.FC<Props> = ({visible, onHideDialog}) => {

  const [loading, setLoading] = useState(false);

  const ReplyDialogHeader = () => {
    return (
      <h2>Contact me!</h2>
    )
  }
  

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'up to 20 characters.').required('Please enter your name.'),
      email:  Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ ,'email format is incorrect.').required('please enter your email.'),
      message: Yup.string().required('Please enter your message.'),
    }),
    onSubmit: async(values) => {
      setLoading(true);
      const { name, email, message } = values;
      const emailTemplate = {
        from_name: name,
        from_email: email,
        message: message,
      };
      emailjs.send('service_mon31on', 'template_suhf3bh', emailTemplate, 'yE33VyUELCrKCqeAL').then((result) => {
        if(result.status === 200) {
          alert('Your message has been sent!');
          setLoading(false);
        }}, (error) => {
          alert(error.text);
          setLoading(false);
        });
      formik.resetForm();
    }
  });
    

  const isFormFieldInvalid = (name: 'name' | 'email' | 'message') => {
    return !!(formik.touched[name] && formik.errors[name]);
  };

  const getFormErrorMessage = (name: 'name' | 'email' | 'message') => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  const onClickHideDialog = () => {
    onHideDialog();
    formik.resetForm();
  }

  return (
    <React.Fragment>
      <Dialog
        header={ReplyDialogHeader}
        visible={visible}
        className={styles['contact-dialog']}
        onHide={onClickHideDialog}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="name">
              Name：
            </label>
            <InputText
              {...formik.getFieldProps('name')}
              placeholder="your name"
              maxLength={20}
              className={isFormFieldInvalid('name') ? 'p-invalid' : ''}
            />
            <div>{getFormErrorMessage('name')}</div>
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="email">
              Email：
            </label>
            <InputText
              {...formik.getFieldProps('email')}
              type="email"
              placeholder="your email"
              className={isFormFieldInvalid('email') ? 'p-invalid' : ''}
              onChange={(e) => formik.setFieldValue('email', e.target.value)}
            />
            <div>{getFormErrorMessage('email')}</div>
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="message">
              Message：
            </label>
            <InputTextarea
              {...formik.getFieldProps('message')}
              style={{width: '100%', height: '200px'}}
              placeholder={'What would you like to tell me? any bugs? any suggestion?'}
              autoResize
            />
            <div>{getFormErrorMessage('message')}</div>
          </div>

          <div className={styles['contact-dialog-footer']}>
            <Button label="Cancel" onClick={onHideDialog} severity="secondary"/>
            <Button type="submit" label="Submit" loading={loading} onClick={()=>{formik.handleSubmit()}}/>
          </div>
        </form>
      </Dialog>
      
    </React.Fragment>
  )
}

export default ReplyDialog;