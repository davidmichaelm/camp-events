import styles from "../eventCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import {DateTime, Interval} from "luxon";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export const EventCard = ({name, imageUrl, startDate, endDate, shortDescription, buttons, loading}) => {
    const dates = getDates(startDate, endDate)

    return (
        <SkeletonTheme color={"#dcdcdc"} >
            <div className={styles.eventCard}>
                {imageUrl ?
                    <img src={imageUrl} className={styles.image} crossOrigin={"anonymous"}  alt={""}/>
                    : <Skeleton height={230} />
                }

                <div className={styles.eventCardHeader}>
                    <h3 className={styles.eventCardTitle}>{name || <Skeleton />}</h3>
                    <div className={styles.eventCardDate}>{dates || <Skeleton />}</div>
                </div>

                <div className={styles.eventCardBody}>
                    {shortDescription ?
                        <BlockContent blocks={shortDescription} />
                        : <Skeleton count={7} />
                    }
                </div>

                <div className={styles.eventButtons}>
                    {buttons ?
                        ( buttons.map(({url, text}, i) => {
                            return (
                                <a href={url} key={i} className={styles.eventButton}>
                                    <div>{text}</div>
                                </a>
                            )
                        }))
                        : loading ?
                            <Skeleton className={styles.eventButton} />
                            : <></>
                    }
                </div>
            </div>
        </SkeletonTheme>
    );
};

function getDates(startDate, endDate) {
    if (!startDate || !endDate) return null;

    startDate = DateTime.fromISO(startDate);
    endDate = DateTime.fromISO(endDate);

    const interval = Interval.fromDateTimes(startDate, endDate);

    if (interval.start.hasSame(interval.end, 'day')) {
        return interval.start.toFormat("MMMM d");
    } else {
        if (interval.start.hasSame(interval.end, 'month')) {
            return interval.start.toFormat("MMMM d") + " – " + interval.end.toFormat("d");
        } else {
            return interval.toFormat("MMMM d");
        }
    }
}
