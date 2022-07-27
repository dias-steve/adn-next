import React from 'react';
import NewslettreSubscribForm from '../NewsletterSubcribForm/NewslettreSubscribForm';
import styles from './MaintenancePage.module.scss'

export default function MaintenancePage() {
  return (
    <div className={styles.globalContainer}>
        <h1>MaintenancePage</h1>
        <NewslettreSubscribForm />
    </div>
  )
}
