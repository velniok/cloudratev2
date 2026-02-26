import type { ITrack } from "@/entities/track"
import { TrackHeader } from "@/widgets/track-header"
import { TrackReviews } from "@/widgets/track-reviews"

export const TrackPage = () => {

    const track: ITrack = {
        kind: 'track',
        id: 1,
        title: "овердоз",
        artistIds: ['1'],
        rating: 52,
        reviews: [
            {
                id: 1,
                nickname: "velniok",
                review: "Отличный продакшн, бас пробивает как надо. Текст немного слабоват, но для жанра вполне годно. Сведение на уровне топовых релизов недели. Слишком вторично. Слышали это уже сотню раз. Артисту нужно искать свой уникальный тембр, а не копировать западные тренды 2021 года."
            },
            {
                id: 2,
                nickname: "user123",
                review: "Отличный продакшн, бас пробивает как надо. Текст немного слабоват, но для жанра вполне годно. Сведение на уровне топовых релизов недели. Слишком вторично. Слышали это уже сотню раз. Артисту нужно искать свой уникальный тембр, а не копировать западные тренды 2021 года."
            }
        ]
    }

    return (
        <>
            <TrackHeader track={track} />
            <TrackReviews reviews={track.reviews} />
        </>
    )
}