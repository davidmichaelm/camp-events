import styles from "../eventCard.module.css";
import BlockContent from "@sanity/block-content-to-react";

export const EventCard = ({name, imageUrl, startDate, shortDescription, buttons}) => {
    return (
        <div className={styles.eventCard}>
            <img src={imageUrl} className={styles.image} crossOrigin={"anonymous"}  alt={""}/>

            <div className={styles.eventCardHeader}>
                <h3 className={styles.eventCardTitle}>{name}</h3>
                <div className={styles.eventCardDate}>{new Date(startDate).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long"
                })}</div>
            </div>

            <div className={styles.eventCardBody}>
                <BlockContent blocks={shortDescription} />
            </div>

            <div className={styles.eventButtons}>
                {
                    buttons.map(({url, text}, i) => {
                        return (
                            <a href={url} key={i} className={styles.eventButton}>
                                <div>{text}</div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
};
