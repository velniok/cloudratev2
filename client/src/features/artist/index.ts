export { artistReducer, getArtistListThunk, updateArtistThunk, createArtistThunk, getOneArtistThunk, deleteArtistThunk } from './model/slice'
export { selectArtist, selectArtistStatus, selectArtistError, selectArtistList, selectArtistListStatus, selectArtistListError , selectArtistListPagination} from './model/selectors'
export { ArtistCreateForm } from './ui/ArtistCreateForm'
export { ArtistDeleteModal } from './ui/ArtistDeleteModal'