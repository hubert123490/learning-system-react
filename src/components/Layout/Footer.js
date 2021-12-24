import classes from "./Footer.module.css"

const Footer = () => {
    return <footer className={classes["main-footer"]}>
    <nav>
        <ul className={classes["main-footer__links"]}>
            <li className={classes["main-footer__link"]}>
                <a href="test">Wsparcie</a>
            </li>
            <li className={classes["main-footer__link"]}>
                <a href="test">Warunki korzystania</a>
            </li>
        </ul>
    </nav>
</footer>
}

export default Footer;