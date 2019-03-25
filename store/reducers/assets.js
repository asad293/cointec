import {
	FETCH_ASSETS_LIST,
	FETCH_ASSETS_LIST_START,
	FETCH_ASSETS_LIST_END,
	FETCH_ASSETS_STATUS,
	FETCH_ASSETS_STATUS_START,
	FETCH_ASSETS_STATUS_END,
	FETCH_WALLETS,
	FETCH_WALLETS_START,
	FETCH_WALLETS_END,
	SET_CURRENT_ASSET
} from '../actions/assets'

import { Send, Receive } from '../../assets'

const INITIAL_STATE = {
	list: {
		Send,
		Receive
	},
	wallets: null,
	status: null,
	currentAsset: null,
	loading: false,
	error: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_ASSETS_LIST:
			const Send = payload.Send.reverse()
			const Receive = payload.Receive
			const list = { Send, Receive }
			return { ...state, list, loading: false, error: null }

		case FETCH_ASSETS_STATUS:
			return { ...state, status: payload }

		case FETCH_WALLETS:
			return { ...state, wallets: payload }

		case SET_CURRENT_ASSET:
			return { ...state, currentAsset: payload }

		case FETCH_ASSETS_LIST_START:
		case FETCH_ASSETS_STATUS_START:
		case FETCH_WALLETS_START:
			return { ...state, loading: true, error: null }

		case FETCH_ASSETS_LIST_END:
		case FETCH_ASSETS_STATUS_END:
		case FETCH_WALLETS_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
