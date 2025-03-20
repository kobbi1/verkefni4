import React from "react";
import styles from "./Footer.module.css"; // Import the CSS module

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Verkefni 4. Jakob Daníel Vigfússon.</p>
        </footer>
    );
};

export default Footer;
