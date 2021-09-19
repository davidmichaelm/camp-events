import {useEffect, useState} from "react";
import styles from "../eventCard.module.css";
import {EventCard} from "./EventCard";

function CampEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const groq = `*[_type == 'event' && active == true]  | order(startDate asc)
            {
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
            <div className={styles.eventsHeader}>
                <h1>What's going on at Camp?</h1>
            </div>

            <div className={styles.eventsContainer}>
                {
                    events.map((event, index) => {
                        return <EventCard {...event} key={index} />;
                    })
                }
            </div>
        </div>
    );
}

export default CampEvents;
