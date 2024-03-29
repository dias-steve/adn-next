import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Button from "../Button";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import styles from "./baseformcheckout-component-styles.module.scss";

export default function BaseFormCheckout({
  total,
  totalLabel,
  handelNextStep,
  handlePreviousStep,
  nextStepLabel = "Suivant",
  PreviousStepLabel = "Précédent",
  nbItems,
  isPaying
}) {
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.nbArticleText}>
        <p>
          {nbItems} article{nbItems > 1 && "s"} dans le panier
        </p>
      </div>
      <div className={styles.totalPrice}>
        <p>
          {totalLabel}: {parseFloat(total).toFixed(2)}€
        </p>
      </div>

      <div className={styles.wrapperBotton}>
        {!isPaying && (
          <>
            <ButtonSecondary
              label={PreviousStepLabel}
              handleOnClick={(e) => {
                e.preventDefault();
                handlePreviousStep();
              }}
            />
            <div className={styles.primaryButtonWrapper}>
              <ButtonPrimary
                label={nextStepLabel}
                handleClick={(e) => {
                  e.preventDefault();
                  handelNextStep();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
