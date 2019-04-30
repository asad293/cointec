////Insert response from exchangables/js file builder enpoint after Send =
const Send = [
	{
		Direction: 'SEND',
		Name: 'GBP',
		FullName: 'SEND',
		Symbol: '£',
		Dp: 2,
		Image: '/static/images/union-jack.svg',
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
		FullName: 'Bitcoin', ////In most cases should match the SeoURL to enable better search engine visibility as this value defines page title.
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/BTC.svg',
		Keywords: 'bitcoin,btc',
		Primary: '#F7931A',
		Wallets: 'Exodus,Jaxx',
		SeoURL: '/buy-bitcoin',
		Description: 'bitcoin',
		ShowGlobal: true, /////If false, ensure all other ShowValues are false. 
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: true, //// Ensure data is available before setting to true.
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
		ShowCharts: false,
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
		Image: '/static/images/coins/BNT.png',
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
	},
	{
		Direction: 'RECEIVE',
		Name: 'MANA',
		FullName: 'Decentraland',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/MANA.svg',
		Keywords: 'mana,decentraland',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-decentraland',
		Description: 'decentraland',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 22
	},
	{
		Direction: 'RECEIVE',
		Name: 'CVC',
		FullName: 'Civic',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/CVC.svg',
		Keywords: 'cvc,civic',
		Primary: '#38ab3c',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-civic',
		Description: 'civil',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: true,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 23
	},
	{
		Direction: 'RECEIVE',
		Name: 'QKC',
		FullName: 'QuarkChain Token',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/QKC.png',
		Keywords: 'qkc,quarkchain token',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-quarkchain-token',
		Description: 'quarkchain token',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 24
	},
	{
		Direction: 'RECEIVE',
		Name: 'LRC',
		FullName: 'Loopring',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/LRC.svg',
		Keywords: 'lrc,loopring',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-looping',
		Description: 'looping',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 25
	},
	{
		Direction: 'RECEIVE',
		Name: 'DGD',
		FullName: 'DigixDAO',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/DGD.png',
		Keywords: 'dgd,digixdao',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-digixdao',
		Description: 'digixdao',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 26
	},
	{
		Direction: 'RECEIVE',
		Name: 'WTC',
		FullName: 'Walton',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/WTC.png',
		Keywords: 'wtc,walton',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-walton',
		Description: 'walton',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 27
	},
	{
		Direction: 'RECEIVE',
		Name: 'POLY',
		FullName: 'Polymath',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/POLY.png',
		Keywords: 'poly,polymath',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-polymath',
		Description: 'polymath',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 28
	},
	{
		Direction: 'RECEIVE',
		Name: 'LOOM',
		FullName: 'Loom Network',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/LOOM.png',
		Keywords: 'loom,loom network',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-loom-network',
		Description: 'loom network',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 29
	},
	{
		Direction: 'RECEIVE',
		Name: 'POWR',
		FullName: 'PowerLedger',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/POWR.svg',
		Keywords: 'powr,powerledger',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-powerledger',
		Description: 'powerledger',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 30
	},
	{
		Direction: 'RECEIVE',
		Name: 'MTL',
		FullName: 'METAL',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/MTL.png',
		Keywords: 'mtl,metal',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-metal',
		Description: 'metal',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 31
	},
	{
		Direction: 'RECEIVE',
		Name: 'GVT',
		FullName: 'Genesis Vision',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/GVT.png',
		Keywords: 'gvt,genesis vision',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-genesis-vision',
		Description: 'genesis vision',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 32
	},
	{
		Direction: 'RECEIVE',
		Name: 'QNT',
		FullName: 'Quant',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/QNT.png',
		Keywords: 'qnt,quant',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-quant',
		Description: 'quant',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 33
	},
	{
		Direction: 'RECEIVE',
		Name: 'BLZ',
		FullName: 'Bluzelle',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/BLZ.svg',
		Keywords: 'blz,bluzelle',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-bluzelle',
		Description: 'bluzelle',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 34
	},
	{
		Direction: 'RECEIVE',
		Name: 'AST',
		FullName: 'AirSwap',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/AST.svg',
		Keywords: 'ast,airswap',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-airswap',
		Description: 'airswap',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 35
	},
	{
		Direction: 'RECEIVE',
		Name: 'INS',
		FullName: 'Insolar',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/INS.png',
		Keywords: 'ins,insolar',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-insolar',
		Description: 'insolar',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 36
	},
	{
		Direction: 'RECEIVE',
		Name: 'RDN',
		FullName: 'Raiden',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/RDN.svg',
		Keywords: 'rdn,raiden',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-raiden',
		Description: 'raiden',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 37
	},
	{
		Direction: 'RECEIVE',
		Name: 'TNT',
		FullName: 'Tierion',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/TNT.svg',
		Keywords: 'tnt,tierion',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-tierion',
		Description: 'tierion',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 38
	},
	{
		Direction: 'RECEIVE',
		Name: 'CND',
		FullName: 'Cindicator',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/CND.svg',
		Keywords: 'cnd,cindicator',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-cindicator',
		Description: 'cindicator',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 39
	},
	{
		Direction: 'RECEIVE',
		Name: 'DMT',
		FullName: 'DMarket',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/DMT.svg',
		Keywords: 'dmt,dmarket',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-dmarket',
		Description: 'dmarket',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 40
	},
	{
		Direction: 'RECEIVE',
		Name: 'MTH',
		FullName: 'Monetha',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/MTH.svg',
		Keywords: 'mth,monetha',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-monetha',
		Description: 'monetha',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 41
	},
	{
		Direction: 'RECEIVE',
		Name: 'REQ',
		FullName: 'Request',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/REQ.png',
		Keywords: 'req,request',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-request',
		Description: 'request',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 42
	},
	{
		Direction: 'RECEIVE',
		Name: 'REN',
		FullName: 'Republic',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/REN.png',
		Keywords: 'ren,republic protocol',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-republic',
		Description: 'republic',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 43
	},
	{
		Direction: 'RECEIVE',
		Name: 'JNT',
		FullName: 'Jibrel',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/JNT.png',
		Keywords: 'jnt,jibrel',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-jibrel',
		Description: 'jibrel',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 44
	},
	{
		Direction: 'RECEIVE',
		Name: 'EDG',
		FullName: 'Edgeless',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/EDG.svg',
		Keywords: 'edg,edgeless',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-edgeless',
		Description: 'edgeless',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 45
	},
	{
		Direction: 'RECEIVE',
		Name: 'NMR',
		FullName: 'Numeraire',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/NMR.svg',
		Keywords: 'nmr,numeraire',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-numeraire',
		Description: 'numeraire',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 46
	},
	{
		Direction: 'RECEIVE',
		Name: 'BLT',
		FullName: 'Bloom',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/BLT.png',
		Keywords: 'blt,bloom',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-bloom',
		Description: 'bloom',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 47
	},
	{
		Direction: 'RECEIVE',
		Name: 'AE',
		FullName: 'Aeternity',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/AE.svg',
		Keywords: 'ae,aeternity',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-aeternity',
		Description: 'aeternity',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 48
	},
	{
		Direction: 'RECEIVE',
		Name: 'IOST',
		FullName: 'IOSToken',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/IOST.png',
		Keywords: 'iost,iostoken',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-iostoken',
		Description: 'iostoken',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 49
	},
	{
		Direction: 'RECEIVE',
		Name: 'EDO',
		FullName: 'Eidoo Token',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/EDO.png',
		Keywords: 'edo,eidoo token',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-eidoo-token',
		Description: 'eidoo token',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 50
	},
	{
		Direction: 'RECEIVE',
		Name: 'ORBS',
		FullName: 'Orbs',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ORBS.png',
		Keywords: 'orbs,orbs',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-orbs',
		Description: 'orbs',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 51
	},
	{
		Direction: 'RECEIVE',
		Name: 'KNC',
		FullName: 'Kyber',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/KNC.png',
		Keywords: 'knc,kyber',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-kyber',
		Description: 'kyber',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 52
	},
	{
		Direction: 'RECEIVE',
		Name: 'LBA',
		FullName: 'Cred',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/LBA.png',
		Keywords: 'lba,cred',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-cred',
		Description: 'cred',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 53
	},
	{
		Direction: 'RECEIVE',
		Name: 'IOTX',
		FullName: 'IoTeX',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/IOTX.png',
		Keywords: 'iotx,iotex',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-iotex',
		Description: 'iotex',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 54
	},
	{
		Direction: 'RECEIVE',
		Name: 'VIB',
		FullName: 'Viberate',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/VIB.svg',
		Keywords: 'vib,viberate',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-viberate',
		Description: 'viberate',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 55
	},
	{
		Direction: 'RECEIVE',
		Name: 'AGI',
		FullName: 'SingularityNET',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/AGI.svg',
		Keywords: 'agi,singularitynet',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-singularitynet',
		Description: 'singularitynet',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 56
	},
	{
		Direction: 'RECEIVE',
		Name: 'SRN',
		FullName: 'Sirin Token',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/SRN.png',
		Keywords: 'srn,sirin token',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-sirin-token',
		Description: 'sirin token',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 57
	},
	{
		Direction: 'RECEIVE',
		Name: 'ADX',
		FullName: 'AdEx',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ADX.svg',
		Keywords: 'adx,adex',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-adex',
		Description: 'adex',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 58
	},
	{
		Direction: 'RECEIVE',
		Name: 'LUN',
		FullName: 'Lunyr',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/LUN.png',
		Keywords: 'lun,lunyr',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-lunyr',
		Description: 'lunyr',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 59
	},
	{
		Direction: 'RECEIVE',
		Name: 'SNGLS',
		FullName: 'SingularDTV',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/SNGLS.png',
		Keywords: 'sngls,singulardtv',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-singulardtv',
		Description: 'singulardtv',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 60
	},
	{
		Direction: 'RECEIVE',
		Name: 'QSP',
		FullName: 'Quantstamp',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/QSP.png',
		Keywords: 'qsp,quantstamp',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-quantstamp',
		Description: 'quantstamp',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 61
	},
	{
		Direction: 'RECEIVE',
		Name: 'RCN',
		FullName: 'Ripio Credit Network',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/RCN.png',
		Keywords: 'rcn,ripio credit network',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-ripio-credit-network',
		Description: 'ripio credit network',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 62
	},
	{
		Direction: 'RECEIVE',
		Name: 'HST',
		FullName: 'Decision Token',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/HST.png',
		Keywords: 'hst,decision token',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-decision-token',
		Description: 'decision token',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 63
	},
	{
		Direction: 'RECEIVE',
		Name: 'PTOY',
		FullName: 'Patientory',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/PTOY.png',
		Keywords: 'ptoy,patientory',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-patientory',
		Description: 'patientory',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 64
	},
	{
		Direction: 'RECEIVE',
		Name: 'GUP',
		FullName: 'Guppy',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/GUP.png',
		Keywords: 'gup,guppy',
		Primary: '#d8a780',
		Wallets: 'Exodus,Jaxx',
		SeoURL: '/buy-guppy',
		Description: 'guppy',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 65
	},
	{
		Direction: 'RECEIVE',
		Name: 'GNO',
		FullName: 'Gnosis',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/GNO.svg',
		Keywords: 'gno,gnosis',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-gnosis',
		Description: 'gnosis',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 66
	},
	{
		Direction: 'RECEIVE',
		Name: 'ANT',
		FullName: 'Aragon',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ANT.svg',
		Keywords: 'ant,aragon',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-aragon',
		Description: 'aragon',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 67
	},
	{
		Direction: 'RECEIVE',
		Name: 'BOXX',
		FullName: 'Blockparty',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/BOXX.png',
		Keywords: 'boxx,blockparty',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask,Jaxx',
		SeoURL: '/buy-blockparty',
		Description: 'blockparty',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 68
	},
	{
		Direction: 'RECEIVE',
		Name: 'WINGS',
		FullName: 'Wings DAO',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/WINGS.png',
		Keywords: 'wings,wings dao',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-wings-dao',
		Description: 'wings dao',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 69
	},
	{
		Direction: 'RECEIVE',
		Name: 'TUSD',
		FullName: 'TrueUSD',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/TUSD.png',
		Keywords: 'tusd,trueusd',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-trueusd',
		Description: 'trueusd',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 70
	},
	{
		Direction: 'RECEIVE',
		Name: 'USDC',
		FullName: 'USD Coin',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/USDC.png',
		Keywords: 'usdc,usd coin',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-usd-coin',
		Description: 'usd coin',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 71
	},
	{
		Direction: 'RECEIVE',
		Name: 'ENJ',
		FullName: 'Enjin',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ENJ.png',
		Keywords: 'enj,enjin',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask,Jaxx',
		SeoURL: '/buy-enjin',
		Description: 'enjin',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 72
	},
	{
		Direction: 'RECEIVE',
		Name: 'ZIL',
		FullName: 'Zilliqa',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ZIL.png',
		Keywords: 'zil,zilliqa',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-zilliqa',
		Description: 'zilliqa',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 73
	},
	{
		Direction: 'RECEIVE',
		Name: 'GTO',
		FullName: 'Gifto',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/GTO.png',
		Keywords: 'gto,gifto',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-gifto',
		Description: 'gifto',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 74
	},
	{
		Direction: 'RECEIVE',
		Name: 'ELF',
		FullName: 'aelf',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ELF.svg',
		Keywords: 'elf,aelf',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-aelf',
		Description: 'aelf',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 75
	},
	{
		Direction: 'RECEIVE',
		Name: 'MCO',
		FullName: 'Crypto.com',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/MCO.png',
		Keywords: 'mco,crypto.com',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask,Jaxx',
		SeoURL: '/buy-crypto-com',
		Description: 'crypto.com',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 76
	},
	{
		Direction: 'RECEIVE',
		Name: 'CTXC',
		FullName: 'Cortex',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/CTXC.png',
		Keywords: 'ctxc,cortex',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-cortex',
		Description: 'cortex',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 77
	},
	{
		Direction: 'RECEIVE',
		Name: 'ARN',
		FullName: 'Aeron',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/ARN.png',
		Keywords: 'arn,aeron',
		Primary: '#d8a780',
		Wallets: 'MEW,Exodus,MetaMask',
		SeoURL: '/buy-aeron',
		Description: 'aeron',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 78
	},
	{
		Direction: 'RECEIVE',
		Name: 'UPP',
		FullName: 'Sentinel Protocol',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/UPP.png',
		Keywords: 'upp,sentinel protocol',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-sentinel-protocol',
		Description: 'sentinel protocol',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 79
	},
	{
		Direction: 'RECEIVE',
		Name: 'OAX',
		FullName: 'OpenANX',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/OAX.png',
		Keywords: 'oax,openanx',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-openanx',
		Description: 'openanx',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 80
	},
	{
		Direction: 'RECEIVE',
		Name: 'DOCK',
		FullName: 'Dock',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/DOCK.png',
		Keywords: 'dock,dock',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask',
		SeoURL: '/buy-dock',
		Description: 'dock',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 81
	},
	{
		Direction: 'RECEIVE',
		Name: 'MLN',
		FullName: 'Melon',
		Symbol: null,
		Dp: 8,
		Image: '/static/images/coins/MLN.png',
		Keywords: 'mln,melon',
		Primary: '#d8a780',
		Wallets: 'MEW,MetaMask,Jaxx',
		SeoURL: '/buy-melon',
		Description: 'melon',
		ShowGlobal: true,
		ShowCalculator: true,
		ShowCarousel: true,
		ShowCointecVs: true,
		ShowCurrencyList: true,
		ShowCharts: false,
		ShowGlossary: true,
		ShowWalletSelector: true,
		Position: 82
	}
]

module.exports = { Send, Receive }
