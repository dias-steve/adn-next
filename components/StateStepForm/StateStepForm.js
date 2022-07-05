import React from "react";
import styles from "./StateStepForm-styles.module.scss";
export default function StateStepForm({ currentStep = 1 }) {
  const width = currentStep * 33.5 + "%";
  return (
        <div className={styles.containerGlobal}>
        <div className={[styles.stepWrapper].join("")}>
            <div className={styles.stepTextWrapper}>
            <span
                className={[
                styles.stepText,
                currentStep >= 1 && styles.stepTextCurrent,
                ].join("")}
            >
                Validation du Panier
            </span>
            <span
                className={[
                styles.stepText,
                currentStep >= 2 && styles.stepTextCurrent,
                ].join("")}
            >
                Livraison
            </span>
            <span
                className={[
                styles.stepText,
                currentStep >= 3 && styles.stepTextCurrent,
                ].join("")}
            >
                Paiement
            </span>
            </div>
            <div className={styles.barBase}>
            <div className={styles.barState} style={{ width: width }} />
            </div>
        </div>
        </div>
  );
}
