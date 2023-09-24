import { Button } from 'primereact/button';
import styles from '../styles/Footer.module.scss';

interface Props {
  onClickContact: () => void;
}

const Footer: React.FC<Props> = ({onClickContact}) => {
  return (
    <footer className={styles['page-footer']}>
      2023 May Weng @ Taiwan
      <Button label="contact me ◟(∗ ˊωˋ ∗)◞" onClick={(e) => onClickContact(e)} />
    </footer>
  )
}

export default Footer;