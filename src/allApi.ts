import {
    AuthControllerApiFactory,
    CoinControllerApiFactory,
    OrderControllerApiFactory,
    TransactionPublicControllerApiFactory,
    LaundryPublicControllerApiFactory,
    CoinPublicControllerApiFactory,
    NftControllerApiFactory, FileStatControllerApiFactory,
} from './api'
import { setAuthenticatedRequestOptions } from './state'

export const authApi = AuthControllerApiFactory(setAuthenticatedRequestOptions(false))
export const coinApi = CoinControllerApiFactory(setAuthenticatedRequestOptions(true))

export const fileStatApi = FileStatControllerApiFactory(setAuthenticatedRequestOptions(true))

export const ordersApi = OrderControllerApiFactory(setAuthenticatedRequestOptions(true))
export const transactionPublicApi = TransactionPublicControllerApiFactory(setAuthenticatedRequestOptions(false))
export const laundryPublicApi = LaundryPublicControllerApiFactory(setAuthenticatedRequestOptions(true))
export const publicCoinApi = CoinPublicControllerApiFactory(setAuthenticatedRequestOptions(false))
export const nftApi = NftControllerApiFactory(setAuthenticatedRequestOptions(true))
