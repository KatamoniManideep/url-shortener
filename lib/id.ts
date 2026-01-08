import crypto from 'crypto'
export function generateShortId(): string{
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bytes = crypto.getRandomValues(new Uint8Array(9));
    let num=0n;
    for (const byte of bytes) num = (num << 8n) +BigInt(byte);

    let id='';
    while(num>0n){
        id=chars[Number(num%62n)] + id;
        num/=62n;
    }
    return id.padStart(7,chars[0]);
}