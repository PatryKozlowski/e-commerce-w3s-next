import Link from 'next/link'
import { MdCreditCard, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import { FaCcAmex, FaFacebookSquare, FaInstagram, FaSnapchatSquare, FaPinterestP, FaTwitter, FaLinkedin } from 'react-icons/fa'
import styles from './Contact.module.scss'
import Input from '../Input/Input'
const Contact = (): JSX.Element => {
  const aboutItems = [
    { title: 'About us', href: '/' },
    { title: 'We\'re hiring', href: '/' },
    { title: 'Support', href: '/' },
    { title: 'Find store', href: '/' },
    { title: 'Shipment', href: '/' },
    { title: 'Payment', href: '/' },
    { title: 'Gift card', href: '/' },
    { title: 'Return', href: '/' },
    { title: 'Help', href: '/' }
  ]

  const sotreItems = [
    { title: 'Company Name', icon: <MdLocationOn /> },
    { title: '0044123123', icon: <MdPhone /> },
    { title: 'ex@mail.com', icon: <MdEmail /> }
  ]

  const paymentItems = [
    { title: 'Amex', icon: <FaCcAmex /> },
    { title: 'Credit Card', icon: <MdCreditCard /> }
  ]

  const socialItems = [
    { icon: <FaFacebookSquare />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaInstagram />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaSnapchatSquare />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaPinterestP />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaLinkedin />, href: 'https://github.com/PatryKozlowski' },
    { icon: <FaTwitter />, href: 'https://github.com/PatryKozlowski' }
  ]

  const contactInput = [
    { placeholder: 'Name' },
    { placeholder: 'Email' },
    { placeholder: 'Subject' },
    { placeholder: 'Message' }
  ]

  return (
    <div className={styles.container}>
      <form className={styles.contact_wrapper}>
        <h4 className={styles.title}>Contact</h4>
        <p className={styles.subtitle}>Questions? Go ahead.</p>
        {
        contactInput.map(({ placeholder }, index) => (
          <Input
            key={index}
            placeholder={placeholder}
          />
        ))
        }

        <button className={styles.btn}>
          Send
        </button>
      </form>
      <div className={styles.about_wrapper}>
        <h4 className={styles.title}>About</h4>
        <div className={styles.links_wrapper}>
          {
              aboutItems.map(({ title, href }, index) => (
                <Link
                  key={index}
                  href={href}
                > {title}
                </Link>
              ))
            }
        </div>
      </div>
      <div className={styles.store_wrapper}>
        <div className={styles.wrapper}>
          <h4 className={styles.title}>Store</h4>
          {
              sotreItems.map(({ title, icon }, index) => (
                <div
                  className={styles.icon_wrapper}
                  key={index}
                >
                  {icon}
                  <p>
                    {title}
                  </p>
                </div>
              ))
            }
        </div>
        <div className={styles.payment_wrapper}>
          <h4 className={styles.title}>We accept</h4>
          {
              paymentItems.map(({ title, icon }, index) => (
                <div
                  className={styles.icon_wrapper}
                  key={index}
                >
                  {icon}
                  <p>
                    {title}
                  </p>
                </div>
              ))
            }
        </div>
        <div className={styles.social_wrapper}>
          {
            socialItems.map(({ icon, href }, index) => (
              <Link
                className={styles.link}
                key={index}
                href={href}
                target={'_blank'}
              >
                {icon}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Contact
