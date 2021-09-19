import styles from "../eventCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import {DateTime, Interval} from "luxon";

export const EventCard = ({name, imageUrl, startDate, endDate, shortDescription, buttons}) => {
    startDate = DateTime.fromISO(startDate);
    endDate = DateTime.fromISO(endDate);
    const interval = Interval.fromDateTimes(startDate, endDate);

    let dates;
    if (interval.start.hasSame(interval.end, 'day'))
        dates = interval.start.toFormat("MMMM d");
    else
        dates = interval.toFormat("MMMM d");

    return (
        <div className={styles.eventCard}>
            <img src={imageUrl} className={styles.image} crossOrigin={"anonymous"}  alt={""}/>

            <div className={styles.eventCardHeader}>
                <h3 className={styles.eventCardTitle}>{name}</h3>
                <div className={styles.eventCardDate}>{dates}</div>
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
