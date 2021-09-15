import {useEffect, useState} from "react";
import BlockContent from "@sanity/block-content-to-react";
import styles from "./eventCard.module.css";

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const groq = `*[_type == 'event' && active == true] {
                active,
                name,
                "imageUrl": image.asset->url,
                startDate,
                endDate,
                shortDescription,
                buttons
            }`;
            const query = `?query=${encodeURIComponent(groq)}`;
            let response = await fetch(`https://m5ik5me8.api.sanity.io/v1/data/query/production${query}`);
            response = await response.json();
            console.log(response.result);
            setEvents(response.result);
        }

        fetchEvents();
    }, []);

    console.log(styles);

    return (
        <div className={styles.campEventsApp}>
            <h1 className={styles.eventsHeader}>What's going on at Camp?</h1>
            <div className={styles.eventsContainer}>
                {
                    events.map((e, index) => {
                        return (
                            <div key={index} className={styles.eventCard}>
                                <img src={e.imageUrl} className={styles.image} />

                                <div className={styles.eventCardHeader}>
                                    <h3 className={styles.eventCardTitle}>{e.name}</h3>
                                    <div className={styles.eventCardDate}>{new Date(e.startDate).toLocaleDateString("en", {
                                        day: "numeric",
                                        month: "long"
                                    })}</div>
                                </div>

                                <div className={styles.eventCardBody}>
                                    <BlockContent blocks={e.shortDescription} />
                                </div>

                                <div className={styles.eventButtons}>
                                    {
                                        e.buttons.map((b, i) => {
                                            return (
                                                <a href={b.url} key={i} className={styles.eventButton}>
                                                    <div>{b.text}</div>
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default App;
