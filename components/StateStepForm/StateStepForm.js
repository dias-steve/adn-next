import React, {useState, useEffect} from "react";
import styles from "./StateStepForm-styles.module.scss";


export default function StateStepForm({ currentStep = 1 }) {
  const width = currentStep * 33.5 + "%";
  const [up, setUp] = useState(false);
  const [y, setY] = useState(0);

  const handleNavigation = (e) => {
    const window = e.currentTarget;
    if (y-300 > window.scrollY || y <=0) {
  
        setUp(false);
        setY(window.scrollY);
    } else if (y+100 < window.scrollY) {

    setUp(true);
    setY(window.scrollY);
    }
  };

  useEffect(() => {
    setY(window.scrollY);
   
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return window.removeEventListener("scroll",  (e) => handleNavigation(e))
  }, [y]);

  return (
        <div className={[styles.containerGlobal, (up ? styles.headerSmall :  styles.headerBig)].join(" ")}>
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
