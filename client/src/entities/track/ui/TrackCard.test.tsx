import { expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ITrack } from '../model/types'
import { MemoryRouter } from 'react-router-dom'
import { TrackCard } from './TrackCard'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return { ...actual, useNavigate: () => mockNavigate }
})

const mockTrack: ITrack = {
    id: 33,
    createdAt: "2026-04-03T12:24:51.833Z",
    title: "крылья",
    coverUrl: "https://res.cloudinary.com/dgtigjrl5/image/upload/v1775219079/px5yo1ktfxpn09wowjh2.jpg",
    kind: "track",
    releaseData: "2025-08-28",
    soundcloudUrl: "https://soundcloud.com/greyrock1/krylya-2",
    artistId: 6,
    featArtistIds: [],
    avgRating: 8,
    avgCriterias: {
        criteria1: 1,
        criteria2: 2,
        criteria3: 3,
        criteria4: 4,
        criteria5: 5,
    },
    artist: {
        id: 6,
        createdAt: "2026-03-11T14:16:04.8487+03:00",
        name: "greyrock",
        avatarUrl: "https://res.cloudinary.com/dgtigjrl5/image/upload/v1773227758/images/hbbpg8l4meein1gjfyuh.jpg",
        soundcloudUrl: "https://soundcloud.com/greyrock1",
        kind: "artist",
    },
    featArtists: null,
    reviewsCount: 0,
    userReview: null,
}

const renderCard = (props = {}) => render(
    <MemoryRouter>
        <TrackCard track={mockTrack} {...props} />
    </MemoryRouter>
)

test('рендерит название трека', () => {
    renderCard()
    expect(screen.getByText('крылья')).toBeInTheDocument()
})

test('рендерит имя артиста', () => {
    renderCard()
    expect(screen.getByText('greyrock')).toBeInTheDocument()
})

test('показывает "Оценок нет" если нет рейтинга', () => {
    renderCard({ track: { ...mockTrack, avgRating: null } })
    expect(screen.getByText('Оценок нет')).toBeInTheDocument()
})

test('переходит на страницу артиста по клику', () => {
    renderCard()
    fireEvent.click(screen.getByText('greyrock'))
    expect(mockNavigate).toHaveBeenCalledWith('/artist/6')
})