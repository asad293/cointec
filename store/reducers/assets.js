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

const Send = [
	{
		Direction: 'SEND',
		Name: 'GBP',
		FullName: 'Pound Sterling',
		Symbol: '£',
		Dp: 2,
		Image: '/static/images/union-jack.svg',
		Keywords: 'british pound',
		Primary: null
	},
	{
		Direction: 'SEND',
		Name: 'BTC',
		FullName: 'Bitcoin',
		Symbol: 'B',
		Dp: 8,
		Image: '/static/images/coins/BTC.svg',
		Keywords: 'bitcoin',
		Primary: null
	}
]

const Receive = [
	{
		Direction: 'RECEIVE',
		Name: 'BTC',
		FullName: 'Bitcoin',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/BTC.svg',
		Keywords: 'bitcoin,btc',
		Primary: '#F7931A'
	},
	{
		Direction: 'RECEIVE',
		Name: 'NEO',
		FullName: 'NEO',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/NEO.svg',
		Keywords: 'neo',
		Primary: '#54BB01'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ETH',
		FullName: 'Ethereum',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/ETH.svg',
		Keywords: 'ethereum,eth',
		Primary: '#62688F'
	},
	{
		Direction: 'RECEIVE',
		Name: 'EOS',
		FullName: 'EOS',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/EOS.svg',
		Keywords: 'eos',
		Primary: '#6D6E70'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BCH',
		FullName: 'Bitcoin Cash',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/BCH.svg',
		Keywords: 'bitcoin cash,bch',
		Primary: '#4BCF51'
	},
	{
		Direction: 'RECEIVE',
		Name: 'XRP',
		FullName: 'Ripple',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/XRP.svg',
		Keywords: 'ripple,xrp',
		Primary: '#1276A7'
	},
	{
		Direction: 'RECEIVE',
		Name: 'LTC',
		FullName: 'Litecoin',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/LTC.svg',
		Keywords: 'litecoin,ltc',
		Primary: '#BEBEBE'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ETC',
		FullName: 'Ethereum Classic',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/ETC.svg',
		Keywords: 'ethereum classic,etc',
		Primary: '#166816'
	},
	{
		Direction: 'RECEIVE',
		Name: 'DASH',
		FullName: 'Dash',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/DASH.svg',
		Keywords: 'dash,dsh',
		Primary: '#2573C2'
	},
	{
		Direction: 'RECEIVE',
		Name: 'XMR',
		FullName: 'Monero',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/XMR.svg',
		Keywords: 'monero,xmr',
		Primary: '#FF6B01'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ZEC',
		FullName: 'Zcash',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/ZEC.svg',
		Keywords: 'zcash,zec',
		Primary: '#D6932C'
	},
	{
		Direction: 'RECEIVE',
		Name: 'OMG',
		FullName: 'Omisecoin',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/OMG.svg',
		Keywords: 'omisecoin,omg',
		Primary: '#1A53F0'
	},
	{
		Direction: 'RECEIVE',
		Name: 'GNT',
		FullName: 'Golem',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/GNT.svg',
		Keywords: 'golem,gnt',
		Primary: '#001D57'
	},
	{
		Direction: 'RECEIVE',
		Name: 'SNT',
		FullName: 'Status',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/SNT.svg',
		Keywords: 'status,snt',
		Primary: '#5b6DEE'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ZRX',
		FullName: '0x',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/ZRX.svg',
		Keywords: '0x,zrx',
		Primary: '#302C2C'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BNT',
		FullName: 'Bancor',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/BNT.svg',
		Keywords: 'bancor,bnt',
		Primary: '#0B0F2B'
	},
	{
		Direction: 'RECEIVE',
		Name: 'REP',
		FullName: 'Augur',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/REP.svg',
		Keywords: 'augur,rep',
		Primary: '#6b3860'
	},
	{
		Direction: 'RECEIVE',
		Name: 'STORJ',
		FullName: 'STORJ',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/STORJ.svg',
		Keywords: 'storj',
		Primary: '#2683FF'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BAT',
		FullName: 'Basic Attention Token',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/BAT.svg',
		Keywords: 'basic attention token,bat',
		Primary: '#FF5000'
	},
	{
		Direction: 'RECEIVE',
		Name: 'QTUM',
		FullName: 'QTUM',
		Symbol: null,
		Dp: 0,
		Image: '/static/images/coins/QTUM.svg',
		Keywords: 'qtum',
		Primary: '#4fAAC7'
	}
]

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
