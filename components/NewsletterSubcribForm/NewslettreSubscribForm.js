import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SubscribForm from './SubscribForm/SubscribForm';

export default function NewslettreSubscribForm() {
    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL_NEWSLETTER;
    console.log(MAILCHIMP_URL);
    return (
      <MailchimpSubscribe
        url={ MAILCHIMP_URL }
        render={ ( props ) => {
          const { subscribe, status, message } = props || {};
          return (
            <SubscribForm
              status={ status }
              message={ message }
              onValidated={ formData => subscribe( formData ) }
            />
          );
        } }
      />
    );
}
