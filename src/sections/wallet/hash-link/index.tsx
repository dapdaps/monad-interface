export default function HashLink({ hash }: { hash: string }) {
    return (
        <svg onClick={() => {
            window.open('https://testnet.monadexplorer.com/tx/' + hash)
        }} className="cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.65217 9L13 1M13 1H6.46692M13 1V7.26087M3.6087 1H1V13H13V10.5" stroke="#727D97" stroke-width="1.5" />
        </svg>
    )
}