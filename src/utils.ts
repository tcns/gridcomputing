import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { EthersError, ethers } from 'ethers'
import { useSnapshot } from 'valtio'
import {
  activeCoinProxy,
  activeToken,
  destructConfirmationModalOpened,
  globalToast,
} from './state'

export const displayError = (err, modal?: boolean, skipDisplay = false) => {
  let message = err.message as string | undefined
  if (err.response?.data) {
    let messageClamped = err.response.data.message
    if (messageClamped.length > 100)
      messageClamped = `${messageClamped.slice(0, 100)}...`
    message = messageClamped
    console.error(err.response.data.message)
  } else {
    console.error(err)
  }

  if ((err as EthersError).info?.error?.message)
    message = (err as EthersError).info!.error.message

  const method = err.config?.method?.toLowerCase()
  message ||= 'Unknown error'
  if (!skipDisplay) {
    if (((!method || method === 'get') && !modal) || modal === false) {
      globalToast.message = message
      globalToast.open = true
      globalToast.type = 'error'
    } else {
      // let title = err.name
      const title = 'Error'
      destructConfirmationModalOpened.value = {
        confirmText: title,
        confirmDescription: message,
        onConfirm() {},
        confirmButton: null,
      }
    }
  }

  return message
}

export const useValtio = <T extends object>(proxy: T) => useSnapshot(proxy) as T

export const openExternalLink = (link: string) => {
  window.open(link, '_blank', 'noopener,noreferrer')
}

export const getEtherscanLink = (
  address = activeCoinProxy.coin!.contractAddress!,
  chainId = activeCoinProxy.coin?.chainId,
  isTx = false,
  isAddress = false
) => {
  return `https://${chainId === 1 ? '' : 'sepolia.'}etherscan.io/${isAddress ? 'address' : isTx ? 'tx' : 'token'}/${address}`
}

export const copyPayLink = async (code: string) => {
  const textToCopy = `${location.origin}/pay/${code}`
  const url = new URL(textToCopy)
  await navigator.clipboard.writeText(url.toString())
}

export const isPreviewBuild = import.meta.env.VITE_PREVIEW_BUILD === 'true'

export const displaySuccess = (message: string) => {
  globalToast.message = message
  globalToast.open = true
  globalToast.type = 'success'
}

export enum AccountState {
  CONNECTED,
  DISCONNECTED,
  NEEDS_VERIFY,
}

const upState = (address?: string) => {
  if (address) {
    if (localStorage.getItem(address)) {
      activeToken.token = localStorage.getItem(address)
      return AccountState.CONNECTED
    }

    return AccountState.NEEDS_VERIFY
  }

  return AccountState.DISCONNECTED
}

export const useAccountState = () => {
  const { address, isConnected } = useAccount()
  const [state, setState] = useState(upState(address))

  useEffect(() => {
    setState(upState(address))
  }, [address])

  return state
}

export function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(
      `Expected 'value' to be defined, but received ${value as any}`
    )
  }
}

export const formatBytes = (bytes: number, decimals = 2)=> {
  if (bytes === 0) return '0 Bytes';

  const k = 1024; // Define the size of a kilobyte
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine the unit index

  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)); // Calculate the value
  return `${formatted} ${sizes[i]}`; // Combine the value with its unit
}

export const formatNumber = (
  value: string | number | undefined,
  digits = 2
) => {
  if (!value) return value
  try {
    const number = Number(value)
    if (isNaN(number)) return '-'
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: digits,
    }).format(number)
  } catch {
    return '-'
  }
}

export const clampAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`

export const getProvider = () => {
  //@ts-expect-error

  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}

export const formatWei = (value: number) => {
  if (!value) return value
  try {
    const bnValue = BigInt(value)
    console.log('bnValue', bnValue)
    return formatNumber(ethers.formatEther(bnValue))
  } catch {
    return '0'
  }
}

export const getSigner = async () => {
  const provider = getProvider()
  return provider.getSigner()
}

export const navigateToApp = (navigate, replace = false) => {
  const url = new URL(location.href)
  const to = url.searchParams.get('to')
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  navigate(to || '/dashboard', {
    replace,
  }) // todo use loader redirect
}

export const copyAuctionLink = async (coinId: string) => {
  const textToCopy = `https://t.me/bundltools_bot?start=coin-${coinId}`
  const url = new URL(textToCopy)
  await navigator.clipboard.writeText(url.toString())
  displaySuccess('Copied to clipboard')
}

export const loosenObject = <T extends Record<string, any>>(
  obj: T | undefined
) => obj ?? ({} as Partial<T> & { [key: string]: any })
export const safeAssign = <T extends Record<string, any>>(
  obj: T,
  override: Partial<T>
) => {
  return Object.assign(obj, override)
}

// График
export const formatChartData = (data: Array<any>, selectedDays: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return data.map((stat) => {
    const date = new Date(stat.date)
    let displayTime

    if (selectedDays === 1) {
      displayTime = `${date.getUTCHours()}.${date.getUTCMinutes().toString().padStart(2, '0')}`

      return {
        name: displayTime,
        earnings: Number(formatWei(stat.earnings)) || 0,
        earnings_original: stat.earnings, // Сохраняем оригинальное значение
        bytes: stat.bytes || 0,
        bytes_original: stat.bytes, // Сохраняем оригинальное значение
        share: stat.share || 0,
        share_original: stat.share, // Сохраняем оригинальное значение
      }
    } else {
      const day = date.getUTCDate()
      const month = months[date.getUTCMonth()]
      return {
        name: `${day} ${month}`,
        earnings: Number(formatWei(stat.earnings)) || 0,
        earnings_original: stat.earnings,
        bytes: stat.bytes || 0,
        bytes_original: stat.bytes,
        share: stat.share || 0,
        share_original: stat.share,
      }
    }
  })
}

export const normalizeData = (data, dataKey) => {
  console.log('normalizeData', data)
  const values = data.map((item) => item[dataKey])
  const max = Math.max(...values)
  const min = Math.min(...values)

  //console.log('normalizeData', data)
  return data.map((item) => ({
    ...item,
    [`${dataKey}_original`]: item[dataKey],
    [`${dataKey}`]: (item[dataKey] - min) / (max - min),
    date: item.date,
  }))
}

// Функция для форматирования и нормализации данных для графика
export const prepareChartData = (data: Array<any>, selectedDays: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const normalizedEarnings = normalizeData(data, 'earnings')
  const normalizedBytes = normalizeData(data, 'bytes')
  const normalizedShares = normalizeData(data, 'share')

  return normalizedEarnings.map((item, index) => {
    const date = new Date(item.date)
    let displayTime

    if (selectedDays === 1) {
      displayTime = `${date.getUTCHours()}.${date.getUTCMinutes().toString().padStart(2, '0')}`
    } else {
      const day = date.getUTCDate()
      const month = months[date.getUTCMonth()]
      displayTime = `${day} ${month}`
    }

    return {
      name: displayTime,
      earnings: item.earnings,
      earnings_original: (Number(item.earnings_original) / 1e18).toFixed(2),
      bytes: normalizedBytes[index].bytes,
      bytes_original: normalizedBytes[index].bytes_original,
      share: normalizedShares[index].share,
      share_original: normalizedShares[index].share_original,
    }
  })
}

export const formatTimeConnected = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  const timeParts = []

  if (days > 0) {
    timeParts.push(`${days} days`)
  }
  if (hours > 0) {
    timeParts.push(`${hours} hrs`)
  }
  if (minutes > 0 || timeParts.length === 0) {
    timeParts.push(`${minutes} mins`)
  }

  return timeParts.join(', ')
}
