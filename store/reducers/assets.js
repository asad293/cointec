import {
	FETCH_ASSETS_LIST,
	FETCH_ASSETS_LIST_START,
	FETCH_ASSETS_LIST_END
} from '../actions'

const Send = [
	{
		Direction: 'SEND',
		Name: 'GBP',
		FullName: 'Pound Sterling',
		Symbol: '£',
		Dp: 2,
		Image: '/img/union-jack.svg',
		Keywords: 'british pound',
		Primary: null
	},
	{
		Direction: 'SEND',
		Name: 'BTC',
		FullName: 'Bitcoin',
		Symbol: 'B',
		Dp: 8,
		Image: '/img/coins/BTC.svg',
		Keywords: 'bitcoin',
		Primary: null
	}
]

const Receive = [
	{
		Direction: 'RECEIVE',
		Name: 'BAT',
		FullName: 'Basic Attention Token',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/BAT.svg',
		Keywords: 'basic attention token,bat',
		Primary: '#FF5000'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BCH',
		FullName: 'Bitcoin Cash',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/BCH.svg',
		Keywords: 'bitcoin cash,bch',
		Primary: '#4BCF51'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BNT',
		FullName: 'Bancor',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/BNT.svg',
		Keywords: 'bancor,bnt',
		Primary: '#0B0F2B'
	},
	{
		Direction: 'RECEIVE',
		Name: 'BTC',
		FullName: 'Bitcoin',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/BTC.svg',
		Keywords: 'bitcoin,btc',
		Primary: '#F7931A'
	},
	{
		Direction: 'RECEIVE',
		Name: 'DASH',
		FullName: 'Dash',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/DASH.svg',
		Keywords: 'dash,dsh',
		Primary: '#2573C2'
	},
	{
		Direction: 'RECEIVE',
		Name: 'EOS',
		FullName: 'EOS',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/EOS.svg',
		Keywords: 'eos',
		Primary: '#6D6E70'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ETC',
		FullName: 'Ethereum Classic',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/ETC.svg',
		Keywords: 'ethereum classic,etc',
		Primary: '#166816'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ETH',
		FullName: 'Ethereum',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/ETH.svg',
		Keywords: 'ethereum,eth',
		Primary: '#62688F'
	},
	{
		Direction: 'RECEIVE',
		Name: 'GNT',
		FullName: 'Golem',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/GNT.svg',
		Keywords: 'golem,gnt',
		Primary: '#001D57'
	},
	{
		Direction: 'RECEIVE',
		Name: 'LTC',
		FullName: 'Litecoin',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/LTC.svg',
		Keywords: 'litecoin,ltc',
		Primary: '#BEBEBE'
	},
	{
		Direction: 'RECEIVE',
		Name: 'NEO',
		FullName: 'NEO',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/NEO.svg',
		Keywords: 'neo',
		Primary: '#54BB01'
	},
	{
		Direction: 'RECEIVE',
		Name: 'OMG',
		FullName: 'Omisecoin',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/OMG.svg',
		Keywords: 'omisecoin,omg',
		Primary: '#1A53F0'
	},
	{
		Direction: 'RECEIVE',
		Name: 'QTUM',
		FullName: 'QTUM',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/QTUM.svg',
		Keywords: 'qtum',
		Primary: '#4fAAC7'
	},
	{
		Direction: 'RECEIVE',
		Name: 'REP',
		FullName: 'Augur',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/REP.svg',
		Keywords: 'augur,rep',
		Primary: '#6b3860'
	},
	{
		Direction: 'RECEIVE',
		Name: 'SNT',
		FullName: 'Status',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/SNT.svg',
		Keywords: 'status,snt',
		Primary: '#5b6DEE'
	},
	{
		Direction: 'RECEIVE',
		Name: 'STORJ',
		FullName: 'STORJ',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/STORJ.svg',
		Keywords: 'storj',
		Primary: '#2683FF'
	},
	{
		Direction: 'RECEIVE',
		Name: 'XMR',
		FullName: 'Monero',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/XMR.svg',
		Keywords: 'monero,xmr',
		Primary: '#FF6B01'
	},
	{
		Direction: 'RECEIVE',
		Name: 'XRP',
		FullName: 'Ripple',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/XRP.svg',
		Keywords: 'ripple,xrp',
		Primary: '#1276A7'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ZEC',
		FullName: 'Zcash',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/ZEC.svg',
		Keywords: 'zcash,zec',
		Primary: '#D6932C'
	},
	{
		Direction: 'RECEIVE',
		Name: 'ZRX',
		FullName: '0x',
		Symbol: null,
		Dp: 0,
		Image: '/img/coins/ZRX.svg',
		Keywords: '0x,zrx',
		Primary: '#302C2C'
	}
]

const INITIAL_STATE = {
	Send,
	Receive,
	loading: false,
	error: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case FETCH_ASSETS_LIST:
			const Send = payload.Send.reverse()
			const Receive = payload.Receive
			return { ...state, Send, Receive, loading: false, error: null }

		case FETCH_ASSETS_LIST_START:
			return { ...state, loading: true, error: null }

		case FETCH_ASSETS_LIST_END:
			return { ...state, loading: false, error: payload }

		default:
			return state
	}
}
