import styles from "./page.module.css";
import {getPrints} from "@/lib/data";
import {InteractivePawTrack} from "@/components/PawTrack";
import {preSignedPrints} from "@/lib/data/s3";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const initialPrints = await getPrints();
    const wrappedPrints = await preSignedPrints(initialPrints);

    return (
        <>
            <InteractivePawTrack initialPrints={wrappedPrints}/>
            <a className={styles.top} href="#">Back To Top</a>
        </>
    );
}
