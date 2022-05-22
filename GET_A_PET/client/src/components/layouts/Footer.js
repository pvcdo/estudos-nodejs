import styles from './Footer.module.css'

function Footer(){
  return(
    <footer className={styles.footer}>
      <p>
        <span className="bold">Get a pet</span> &copy; 2022 - Todos os direitos reservados
      </p>
    </footer>
  )
}

export default Footer
