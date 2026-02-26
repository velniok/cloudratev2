export { artistReducer, getArtistsThunk, updateArtistThunk, createArtistThunk, searchArtistsThunk, getOneArtistThunk, deleteArtistThunk } from './model/slice'
export { selectArtistListStatus, selectArtistList, selectArtistError } from './model/selectors'
export { ArtistCreateForm } from './ui/ArtistCreateForm'
export { ArtistDeleteModal } from './ui/ArtistDeleteModal'