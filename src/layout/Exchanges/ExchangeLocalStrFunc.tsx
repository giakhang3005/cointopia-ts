export const saveToLocal = (wallet: any, history: any) => {
    const localData = {
        wallet: wallet,
        history: history,
    }

    localStorage.setItem('walletData', JSON.stringify(localData));
}

export const checkLocalData = (value: string) => {
    const localWallet = localStorage.getItem('walletData');
    const parseWallet = localWallet ? JSON.parse(localWallet) : null

    switch (value) {
        case 'wallet':
            return parseWallet === null ? null : parseWallet.wallet
        case 'history':
            return parseWallet === null ? null : parseWallet.history
        default:
            return null;
    }
}
