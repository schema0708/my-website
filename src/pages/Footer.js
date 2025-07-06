import React from 'react'

const Footer = ({ linkedin }) => {
  return (
    <footer className="footer">
      <section className="section">
        <section className="section__content">
          <div className="social">
            <a className="social__social-link" href={linkedin} target="_blank">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </div>
        </section>
      </section>
    </footer>
  )
}
export default Footer
