import React from 'react'

export default function Footer() {
    let now = new Date();
  return (
    <div className='global-container footer-global-container'>
        <div className="space" />
        <div className="footer-content content-container">
            <div className="footer-link-list-wrapper">
                <ul>
                    <li>
                        Instagram
                    </li>
                    <li>
                        Nous contacter
                    </li>
                    <li>
                        Livraison et retour
                    </li>
                    <li>
                        Collections
                    </li>
                    <li>
                        Shootbooks
                    </li>
                    <li>
                        Mentions Légals
                    </li>
                    <li>
                        Conditions générales de ventes
                    </li>
                    <li>
                        Politique de confidentialité
                    </li>
                </ul>
            </div>
            <div className="copyright-wrapper">
                <span>Tous droits réservés © UNADN {now.getFullYear()}</span>
            </div>
          
        </div>
    </div>
  )
}
