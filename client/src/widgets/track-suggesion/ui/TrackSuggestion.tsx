import { Title } from '@/shared/ui'
import styles from './TrackSuggestion.module.scss'
import { TrackSuggestionForm } from '@/features/suggestion'

export const TrackSuggestion = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ПРЕДЛОЖИТЬ ТРЕК</Title>
                <TrackSuggestionForm />
            </div>
        </div>
    )
}
