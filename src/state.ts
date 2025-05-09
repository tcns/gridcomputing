import { proxy, ref, subscribe } from 'valtio'
import { CoinDto, CoinFeatures, CoinParams, GetOrdersResponse, OrderDto, TransactionDto } from './api'
import { displayError } from './utils'
import {RawAxiosRequestConfig} from "axios";

export const globalToast = proxy({
    message: '',
    type: 'success' as 'success' | 'error',
    open: false,
})

// would be great to also pull token from other tabs
export const activeToken = proxy({
    token: undefined as string | undefined | null,
    chainId: undefined as number | undefined,
})

/** Only after mounted */
export const getActiveTokenOrThrow = () => {
    if (!activeToken.token) throw new Error('No active token')
    return activeToken.token
}

export const getAuthenticatedRequestOptions = (setToken = true) : RawAxiosRequestConfig => {
    return <RawAxiosRequestConfig>{
        headers: {
            Authorization: setToken ? `Bearer ${getActiveTokenOrThrow()}` : undefined,
        },
    }
}

export const setAuthenticatedRequestOptions = (setToken = true) => {
    return {
        baseOptions: {
            transformRequest: [
                (data, headers, f) => {
                   // Object.assign(headers, getAuthenticatedRequestOptions(setToken).headers)
                    return data
                },
            ],
        },
    } as any
}

// ---

export const menuStateProxy = proxy({
    value: false,
    forceNoDisplay: false,
})

export const appGlobalMenuProxy = proxy({
    value: false,
})

export const activeCoinProxy = proxy({
    coin: null as CoinDto | null,
    selectedFeatures: null as unknown as CoinFeatures,
    selectedParams: null as unknown as CoinParams,
    buysInfo: null as GetOrdersResponse | null,
    launchTransaction: undefined as undefined | TransactionDto,
    disableInteractions: false,
    customState: {} as {
        savedCaHeader?: string
    },
})
//@ts-expect-error
window.activeCoinProxy = activeCoinProxy
subscribe(activeCoinProxy, () => {
    globalThis.coin = activeCoinProxy.coin
})
export const getActiveCoin = () => activeCoinProxy.coin!

export const newCoinDialogOpened = proxy({ value: false })

export const destructConfirmationModalOpened = proxy({
    value: null as null | {
        confirmText: string
        confirmDescription?: string
        onConfirm: () => void
        onCancel?: () => void
        confirmButton?: string | null
        confirmButtonVariant?: 'outlined' | 'contained'
    },
})

export const openRemoveConfirmDialog = async (confirmText: string, onConfirm: () => any) => {
    await new Promise<void>(resolve => {
        destructConfirmationModalOpened.value = ref({
            confirmText: 'Warning',
            confirmDescription: confirmText,
            async onConfirm() {
                try {
                    await onConfirm()
                } catch (err) {
                    displayError(err)
                }

                resolve()
            },
            onCancel() {
                resolve()
            },
        })
    })
}

// ---

export const fullscreenLoaderProxy = proxy({
    opened: false,
    text: '',
})

export const showFullScreenLoader = (text = '') => {
    fullscreenLoaderProxy.opened = true
    fullscreenLoaderProxy.text = text
}

export const hideFullScreenLoader = () => {
    fullscreenLoaderProxy.opened = false
}
