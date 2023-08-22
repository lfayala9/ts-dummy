import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../../main'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
