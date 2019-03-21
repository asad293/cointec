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

////Insert response from exchangables/js file builder enpoint after Send = 
const Send = [
    {
        Direction: 'SEND',
        Name: 'GBP',
        FullName: 'SEND',
        Symbol: '£',
        Dp: 2,
        Image: '/img/union-jack.svg',
        Keywords: 'british pound',
        Primary: null,
        Wallets: null,
        SeoURL: null,
        Description: '0',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 0
    }
]

////Insert response from exchangables/js file builder enpoint after Receive = 
const Receive = [
    {
        Direction: 'RECEIVE',
        Name: 'BTC',
        FullName: 'Bitcoin',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/BTC.svg',
        Keywords: 'bitcoin,btc',
        Primary: '#F7931A',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-bitcoin',
        Description: 'bitcoin',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 1
    },
    {
        Direction: 'RECEIVE',
        Name: 'NEO',
        FullName: 'NEO',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/NEO.svg',
        Keywords: 'neo',
        Primary: '#54BB01',
        Wallets: 'Exodus',
        SeoURL: '/buy-neo',
        Description: 'NEO',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 2
    },
    {
        Direction: 'RECEIVE',
        Name: 'ETH',
        FullName: 'Ethereum',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/ETH.svg',
        Keywords: 'ethereum,eth',
        Primary: '#62688F',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-ethereum',
        Description: 'Ethereum',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 3
    },
    {
        Direction: 'RECEIVE',
        Name: 'PAY',
        FullName: 'test1',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/PAY.svg',
        Keywords: 'test2',
        Primary: '#000000',
        Wallets: 'Jaxx',
        SeoURL: '/buy-pay',
        Description: 'no desc',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 4
    },
    {
        Direction: 'RECEIVE',
        Name: 'EOS',
        FullName: 'EOS',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/EOS.svg',
        Keywords: 'eos',
        Primary: '#6D6E70',
        Wallets: 'Jaxx',
        SeoURL: '/buy-eos',
        Description: 'EOS',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 5
    },
    {
        Direction: 'RECEIVE',
        Name: 'BCH',
        FullName: 'Bitcoin Cash',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/BCH.svg',
        Keywords: 'bitcoin cash,bch',
        Primary: '#4BCF51',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-bitcoin-cash',
        Description: 'bitcoin-cash',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 6
    },
    {
        Direction: 'RECEIVE',
        Name: 'XRP',
        FullName: 'Ripple',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/XRP.svg',
        Keywords: 'ripple,xrp',
        Primary: '#1276A7',
        Wallets: 'Exodus',
        SeoURL: '/buy-xrp',
        Description: 'litecoin',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 7
    },
    {
        Direction: 'RECEIVE',
        Name: 'LTC',
        FullName: 'Litecoin',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/LTC.svg',
        Keywords: 'litecoin,ltc',
        Primary: '#BEBEBE',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-litecoin',
        Description: 'litecoin',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 8
    },
    {
        Direction: 'RECEIVE',
        Name: 'ETC',
        FullName: 'Ethereum Classic',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/ETC.svg',
        Keywords: 'ethereum classic,etc',
        Primary: '#166816',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-ethereum-classic',
        Description: 'no desc',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 9
    },
    {
        Direction: 'RECEIVE',
        Name: 'DASH',
        FullName: 'Dash',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/DASH.svg',
        Keywords: 'dash,dsh',
        Primary: '#2573C2',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-dash',
        Description: 'Dash',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 10
    },
    {
        Direction: 'RECEIVE',
        Name: 'XMR',
        FullName: 'Monero',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/XMR.svg',
        Keywords: 'monero,xmr',
        Primary: '#FF6B01',
        Wallets: 'Exodus',
        SeoURL: '/buy-monero',
        Description: 'monero',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 11
    },
    {
        Direction: 'RECEIVE',
        Name: 'ZEC',
        FullName: 'Zcash',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/ZEC.svg',
        Keywords: 'zcash,zec',
        Primary: '#D6932C',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-zcash',
        Description: 'zcash',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 12
    },
    {
        Direction: 'RECEIVE',
        Name: 'OMG',
        FullName: 'OmiseGo',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/OMG.svg',
        Keywords: 'omisego,omg',
        Primary: '#1A53F0',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-omisego',
        Description: 'omisego',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 13
    },
    {
        Direction: 'RECEIVE',
        Name: 'GNT',
        FullName: 'Golem',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/GNT.svg',
        Keywords: 'golem,gnt',
        Primary: '#001D57',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-golemn',
        Description: 'golem',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 14
    },
    {
        Direction: 'RECEIVE',
        Name: 'SNT',
        FullName: 'Status',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/SNT.svg',
        Keywords: 'status,snt',
        Primary: '#5b6DEE',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-status',
        Description: 'status',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 15
    },
    {
        Direction: 'RECEIVE',
        Name: 'ZRX',
        FullName: '0x',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/ZRX.svg',
        Keywords: '0x,zrx,zero',
        Primary: '#302C2C',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-zrx',
        Description: '0x',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 16
    },
    {
        Direction: 'RECEIVE',
        Name: 'BNT',
        FullName: 'Bancor',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/BNT.svg',
        Keywords: 'bancor,bnt',
        Primary: '#0B0F2B',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-bancor',
        Description: 'Bancor',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 17
    },
    {
        Direction: 'RECEIVE',
        Name: 'REP',
        FullName: 'Augur',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/REP.svg',
        Keywords: 'augur,rep',
        Primary: '#6b3860',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-Augur',
        Description: 'Augur',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 18
    },
    {
        Direction: 'RECEIVE',
        Name: 'STORJ',
        FullName: 'Storj',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/STORJ.svg',
        Keywords: 'storj',
        Primary: '#2683FF',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-storj',
        Description: 'storj',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 19
    },
    {
        Direction: 'RECEIVE',
        Name: 'BAT',
        FullName: 'Basic Attention Token',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/BAT.svg',
        Keywords: 'basic attention token,bat',
        Primary: '#FF5000',
        Wallets: 'MEW,Exodus,MetaMask,Jaxx',
        SeoURL: '/buy-basic-attention-token',
        Description: 'bat',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 20
    },
    {
        Direction: 'RECEIVE',
        Name: 'QTUM',
        FullName: 'Qtum',
        Symbol: null,
        Dp: 8,
        Image: '/static/images/coins/QTUM.svg',
        Keywords: 'qtum,quantum',
        Primary: '#4fAAC7',
        Wallets: 'Exodus,Jaxx',
        SeoURL: '/buy-qtum',
        Description: 'qtum',
        ShowGlobal: true,
        ShowCalculator: true,
        ShowCarousel: true,
        ShowCointecVs: true,
        ShowCurrencyList: true,
        ShowCharts: true,
        ShowGlossary: true,
        ShowWalletSelector: true,
        Position: 21
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
